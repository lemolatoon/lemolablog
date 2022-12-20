import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import markdownToHtml from "zenn-markdown-html";
import { IconButton } from "../src/components/IconButton";
import { useDebounce, useToggle } from "../src/hooks/hooks";
import { FaUpload } from "react-icons/fa";
import { BiCaretDownSquare } from "react-icons/bi";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Header } from "../src/Header/Header";
import { BannerMenu } from "../src/components/BannerMenu";
import { Button } from "../src/components/Button";
import { Post } from "../src/types/supabase";

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

const TitleInput = styled(WideTextArea.withComponent("input"))`
  min-height: 30px;
  margin-bottom: 5px;
`;

type BoxWithTextProps = {
  selected: boolean;
  height: string;
};
const BoxWithText = styled.div<BoxWithTextProps>`
  padding: 0;
  margin: 0;
  height: ${(props) => props.height};
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
  height: string;
};
const FlexWrapeer = styled.div`
  display: flex;
`;
const TabWrapper = styled(FlexWrapeer)`
  margin: 0;
`;
type TabKind = "markdown" | "rendered";
const Tab = ({
  onMarkdownSelected,
  onRenderedSelected,
  selected,
  height,
}: TabProps) => {
  return (
    <TabWrapper>
      <BoxWithText
        onClick={() => {
          onMarkdownSelected();
        }}
        selected={selected === "markdown"}
        height={height}
      >
        MarkDown
      </BoxWithText>
      <BoxWithText
        onClick={() => {
          onRenderedSelected();
        }}
        selected={selected === "rendered"}
        height={height}
      >
        Preview
      </BoxWithText>
    </TabWrapper>
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
  onTitleChanged: (title: string) => void;
  onPreviousPostsToggle: () => void;
  isPreviousPostsButtonOpen: boolean;
  pastPostsButtons: React.ReactNode[];
  onSubmit: () => void;
  disabled: boolean;
  selected: TabKind;
  tabHeight: string;
  headerHeight: string;
  bg: string;
  title: string;
  markdown: string;
  innerHtml: string;
};

type MarkdownAreaProps = {
  bg: string;
  title: string;
  markdown: string;
  onTitleChanged: (title: string) => void;
  onMarkdownChanged: (markdown: string) => void;
};
const MarkdownArea = ({
  bg,
  title,
  markdown,
  onMarkdownChanged,
  onTitleChanged,
}: MarkdownAreaProps) => {
  const font =
    "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace" as const;
  return (
    <>
      <TitleInput
        bg={bg}
        fontFamily={font}
        value={title}
        onChange={(e) => onTitleChanged(e.target.value)}
      />
      <WideTextArea
        fontFamily={font}
        bg={bg}
        value={markdown}
        onChange={(e) => onMarkdownChanged(e.target.value)}
      />
    </>
  );
};

const TitleDiv = styled.div<TitleDivProps>`
  background-color: ${(props) => props.bg};
  margin-top: 0;
  margin-left: 3em;
  margin-right: 3em;
  padding-left: 1em;
  padding-right: 1em;
  margin-bottom: 1em;
  border-radius: 10px;
  min-height: 30px;
  width: 90%;
  > h1 {
    margin: 0;
    padding: 0;
  }
`;

type TitleDivProps = {
  bg: string;
};
const BlogDiv = styled(TitleDiv)`
  min-height: 80vh;
`;

type PreviewProps = {
  title: string;
  innerHtml: string;
  bg: string;
};
export const Preview = ({ title, bg, innerHtml }: PreviewProps) => {
  return (
    <>
      <TitleDiv bg={bg}>
        <h1>{title}</h1>
      </TitleDiv>
      <BlogDiv
        className="znc"
        bg={bg}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </>
  );
};

type PreviousPostsMenu = {
  onClick: () => void;
  children: React.ReactNode[];
  headerHeight: string;
  isOpen: boolean;
};
const PreviousPostsMenu = ({
  onClick,
  children,
  headerHeight,
  isOpen,
}: PreviousPostsMenu) => {
  return (
    <>
      <AlignEndWrapper>
        <IconButton icon={BiCaretDownSquare} fontLevel={2} onClick={onClick}>
          これまでの記事
        </IconButton>
      </AlignEndWrapper>
      <BannerMenu headerHeight={headerHeight} isOpen={isOpen}>
        {children}
      </BannerMenu>
    </>
  );
};
const AlignEndWrapper = styled.div`
  margin-left: auto;
  margin-right: 1em;
`;
const EditLayout = ({
  onMarkdownSelected,
  onRenderedSelected,
  onMarkdownChanged,
  onTitleChanged,
  onPreviousPostsToggle,
  isPreviousPostsButtonOpen,
  pastPostsButtons,
  onSubmit,
  headerHeight,
  tabHeight,
  disabled,
  selected,
  bg,
  title,
  innerHtml,
  markdown,
}: EditLayoutProps) => {
  return (
    <>
      <FlexWrapeer>
        <Tab
          onMarkdownSelected={onMarkdownSelected}
          onRenderedSelected={onRenderedSelected}
          selected={selected}
          height={tabHeight}
        />
        <PreviousPostsMenu
          onClick={onPreviousPostsToggle}
          isOpen={isPreviousPostsButtonOpen}
          headerHeight={`calc(${headerHeight} + ${tabHeight})`}
        >
          {pastPostsButtons}
        </PreviousPostsMenu>
      </FlexWrapeer>
      {selected === "markdown" ? (
        <MarkdownArea
          bg={bg}
          title={title}
          markdown={markdown}
          onMarkdownChanged={onMarkdownChanged}
          onTitleChanged={onTitleChanged}
        />
      ) : (
        <Preview title={title} bg={bg} innerHtml={innerHtml} />
      )}
      <JustifyCenterWrapper>
        <SubmitButton onSubmit={onSubmit} disabled={disabled} />
      </JustifyCenterWrapper>
    </>
  );
};

const Edit = () => {
  const background = "#a3afe3";
  const [title, setTitle] = useState<string>("");
  const [pastTitles, setPastTitles] = useState<
    Pick<Post, "title" | "post_id">[] | null
  >(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [kind, setKind] = useState<TabKind>("markdown");
  const [postId, setPostId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onToggle, onClose } = useToggle();
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
  const onTitleChanged = (changedTitle: string) => {
    setTitle(changedTitle);
  };
  const onMarkdownChanged = (changedMarkdown: string) => {
    setMarkdown(changedMarkdown);
  };
  const session = useSession();
  const user = session?.user;
  const supabase = useSupabaseClient();
  const insertBlog = async (
    postId: number | undefined,
    title: string,
    markdown: string,
    html: string
  ) => {
    try {
      setLoading(true);

      if (!user) {
        alert("Login is required for submit!");
        setLoading(false);
        return;
      }
      const inserts = {
        id: user.id,
        post_id: postId,
        title: title,
        raw_markdown: markdown,
        converted_html: html,
        is_public: true,
        is_deleted: false,
        updated_at: new Date().toISOString(),
      };
      let error;

      if (postId) {
        error = (
          await supabase.from("blogs").update(inserts).eq("post_id", postId)
        ).error;
      } else {
        error = (await supabase.from("blogs").insert(inserts)).error;
      }
      if (error) throw error;
      alert("Blog published!!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
      fetchBlogTitles();
    }
  };
  const onSubmit = () => {
    insertBlog(postId, title, markdown, html);
  };

  // fetch blog data
  const fetchBlogTitles = async () => {
    setLoading(true);

    try {
      if (!user) {
        alert("Login is required for fetch past blogs!");
        setLoading(false);
        return;
      }
      console.log(user.id);
      const { data, error, status } = await supabase
        .from("blogs")
        .select(`title, post_id`)
        .eq("id", user.id);

      if (error && status !== 406) {
        throw error;
      }

      console.log(data);
      if (data) {
        setPastTitles(data);
      }
    } catch (err) {
      alert("error fetching past blogs data!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogByPostId = async (post_id: number) => {
    setLoading(true);

    try {
      if (!user) {
        alert("Login is required for fetch past blogs!");
        setLoading(false);
        return;
      }
      const { data, error, status } = await supabase
        .from("blogs")
        .select(`raw_markdown, converted_html`)
        .eq("id", user.id)
        .eq("post_id", post_id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data as Pick<Post, "raw_markdown" | "converted_html">;
      }
    } catch (err) {
      alert("error fetching past blogs data!");
    } finally {
      setLoading(false);
    }
  };

  const setBlogComponents = (
    title: string,
    markdown: string,
    html: string,
    postId: number | undefined
  ) => {
    setTitle(title);
    setMarkdown(markdown);
    setHtml(html);
    setPostId(postId);
  };
  const resetBlogComponents = () => setBlogComponents("", "", "", undefined);

  useEffect(() => {
    fetchBlogTitles();
  }, [user, supabase]);

  const pastPostsButtons = [
    <Button
      key={0}
      transparent={false}
      fontLevel={3}
      onClick={() => {
        resetBlogComponents();
        onClose();
      }}
      color="white"
    >
      Reset
    </Button>,
    ...(pastTitles
      ? pastTitles.map(({ title, post_id }, idx) => {
          const onClick = async () => {
            const blogInfos = await fetchBlogByPostId(post_id);
            if (blogInfos)
              setBlogComponents(
                title,
                blogInfos.raw_markdown,
                blogInfos.converted_html,
                post_id
              );
            onClose();
          };
          return (
            <Button
              key={idx + 1}
              transparent={false}
              fontLevel={3}
              onClick={onClick}
              color="white"
            >
              {title}
            </Button>
          );
        })
      : []),
  ];
  const headerHeight = 80;
  const tabHeight = "30px";
  return (
    <>
      <Header height={headerHeight} />
      <EditLayout
        onMarkdownSelected={onMarkdownSelected}
        onRenderedSelected={onRenderedSelected}
        onTitleChanged={onTitleChanged}
        onMarkdownChanged={onMarkdownChanged}
        onPreviousPostsToggle={onToggle}
        isPreviousPostsButtonOpen={isOpen}
        pastPostsButtons={pastPostsButtons}
        onSubmit={onSubmit}
        tabHeight={tabHeight}
        headerHeight={`${headerHeight}px`}
        disabled={loading}
        selected={kind}
        bg={background}
        title={title}
        markdown={markdown}
        innerHtml={html}
      />
    </>
  );
};

export default Edit;
