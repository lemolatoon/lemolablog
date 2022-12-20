import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import markdownToHtml from "zenn-markdown-html";
import { IconButton } from "../src/components/IconButton";
import { useDebounce } from "../src/hooks/hooks";
import { FaUpload } from "react-icons/fa";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Header } from "../src/Header/Header";

type FontFamilyKind =
  | "Ubuntu Mono"
  | "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace";
type WideTextAreaProps = {
  fontFamily: FontFamilyKind;
  bg: string;
};

const WideTextArea = styled.textarea<WideTextAreaProps>`
  margin-left: 3em;
  margin-right: 3em;
  width: 90%;
  min-height: 80vh;
  font-family: ${(props) => props.fontFamily};
  border-radius: 4;
  background-color: ${(props) => props.bg};
  border-radius: 10px;
`;

type BoxWithTextProps = {
  selected: boolean;
};
const BoxWithText = styled.div<BoxWithTextProps>`
  padding: 0;
  margin: 0;
  height: 30px;
  width: 200px;
  background-color: #808080;
  ${(props) =>
    props.selected
      ? css`
          border: solid;
        `
      : css`
          filter: brightness(0.8);
          border: none;
        `}
`;

type TabProps = {
  onMarkdownSelected: () => void;
  onRenderedSelected: () => void;
  selected: TabKind;
};
const FlexWrapeer = styled.div`
  display: flex;
`;
type TabKind = "markdown" | "rendered";
const Tab = ({
  onMarkdownSelected,
  onRenderedSelected,
  selected,
}: TabProps) => {
  return (
    <FlexWrapeer>
      <BoxWithText
        onClick={() => {
          onMarkdownSelected();
        }}
        selected={selected === "markdown"}
      >
        MarkDown
      </BoxWithText>
      <BoxWithText
        onClick={() => {
          onRenderedSelected();
        }}
        selected={selected === "rendered"}
      >
        Preview
      </BoxWithText>
    </FlexWrapeer>
  );
};

type SubmitButtonProps = {
  onSubmit: () => void;
  disabled: boolean;
};
const SubmitButton = ({ onSubmit, disabled }: SubmitButtonProps) => {
  const session = useSession();
  return (
    <>
      {session ? (
        <IconButton
          onClick={onSubmit}
          disabled={disabled}
          icon={FaUpload}
          fontLevel={4}
          transparent={true}
        >
          投稿
        </IconButton>
      ) : (
        <div>
          投稿にはまず
          <Link href="login">Login</Link>
          が必要です。
        </div>
      )}
    </>
  );
};

const JustifyCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

type EditLayoutProps = {
  onMarkdownSelected: () => void;
  onRenderedSelected: () => void;
  onMarkdownChanged: (markdown: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  selected: TabKind;
  bg: string;
  markdown: string;
  innerHtml: string;
};

type BlogDivProps = {
  bg: string;
};
const BlogDiv = styled.div<BlogDivProps>`
  background-color: ${(props) => props.bg};
  margin-left: 3em;
  margin-right: 3em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
  min-height: 80vh;
  width: 90%;
`;
const EditLayout = ({
  onMarkdownSelected,
  onRenderedSelected,
  onMarkdownChanged,
  onSubmit,
  disabled,
  selected,
  bg,
  innerHtml,
  markdown,
}: EditLayoutProps) => {
  return (
    <>
      <Tab
        onMarkdownSelected={onMarkdownSelected}
        onRenderedSelected={onRenderedSelected}
        selected={selected}
      />
      {selected === "markdown" ? (
        <WideTextArea
          fontFamily="ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace"
          bg={bg}
          value={markdown}
          onChange={(e) => onMarkdownChanged(e.target.value)}
        />
      ) : (
        <BlogDiv
          className="znc"
          bg={bg}
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        />
      )}
      <JustifyCenterWrapper>
        <SubmitButton onSubmit={onSubmit} disabled={disabled} />
      </JustifyCenterWrapper>
    </>
  );
};

const Edit = () => {
  const background = "#a3afe3";
  const [markdown, setMarkdown] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [kind, setKind] = useState<TabKind>("markdown");
  const [loading, setLoading] = useState<boolean>(false);
  const debounce = useDebounce(1000);
  useEffect(() => {
    debounce(() => setHtml(markdownToHtml(markdown)));
  }, [markdown]);
  const onMarkdownSelected = () => {
    setKind("markdown");
  };
  const onRenderedSelected = () => {
    setKind("rendered");
  };
  const onMarkdownChanged = (changedMarkdown: string) => {
    setMarkdown(changedMarkdown);
  };
  const session = useSession();
  const user = session?.user;
  const supabase = useSupabaseClient();
  // TODO: complete writing this function
  const insertBlog = async (markdown: string, html: string) => {
    try {
      setLoading(true);

      if (!user) {
        alert("Login is required for submit!");
        setLoading(false);
        return;
      }
      const inserts = {
        id: user.id,
        raw_markdown: markdown,
        converted_html: html,
        is_public: true,
        is_deleted: false,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("blogs").insert(inserts);
      if (error) throw error;
      alert("Blog published!!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = () => {
    insertBlog(markdown, html);
  };
  return (
    <>
      <Header />
      <EditLayout
        onMarkdownSelected={onMarkdownSelected}
        onRenderedSelected={onRenderedSelected}
        onMarkdownChanged={onMarkdownChanged}
        onSubmit={onSubmit}
        disabled={loading}
        selected={kind}
        bg={background}
        markdown={markdown}
        innerHtml={html}
      />
    </>
  );
};

export default Edit;
