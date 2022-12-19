import React, { useState } from "react";
import styled, { css } from "styled-components";

type FontFamilyKind = "Ubuntu Mono";
type WideTextAreaProps = {
  fontFamily: FontFamilyKind;
};

const WideTextArea = styled.textarea<WideTextAreaProps>`
  padding-left: 3em;
  padding-right: 3em;
  width: 90%;
  min-height: 100%;
  font-family: ${(props) => props.fontFamily};
  border-radius: 4;
`;

type BoxWithTextProps = {
  selected: boolean;
};
const BoxWithText = styled.div<BoxWithTextProps>`
  padding: 0;
  margin: 0;
  height: 30px;
  width: 200px;
  background-color: gray;
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
};
const FlexWrapeer = styled.div`
  display: flex;
`;
type TabKind = "markdown" | "rendered";
const Tab = ({ onMarkdownSelected, onRenderedSelected }: TabProps) => {
  const [kind, setKind] = useState<TabKind>("markdown");
  return (
    <FlexWrapeer>
      <BoxWithText
        onClick={() => {
          onMarkdownSelected();
          setKind("markdown");
        }}
        selected={kind === "markdown"}
      >
        MarkDown
      </BoxWithText>
      <BoxWithText
        onClick={() => {
          onRenderedSelected();
          setKind("rendered");
        }}
        selected={kind === "rendered"}
      >
        Preview
      </BoxWithText>
    </FlexWrapeer>
  );
};

type EditLayoutProps = {
  onMarkdownSelected: () => void;
  onRenderedSelected: () => void;
};
const EditLayout = ({
  onMarkdownSelected,
  onRenderedSelected,
}: EditLayoutProps) => {
  return (
    <Tab
      onMarkdownSelected={onMarkdownSelected}
      onRenderedSelected={onRenderedSelected}
    ></Tab>
  );
};

const Edit = () => {
  const onMarkdownSelected = () => {};
  const onRenderedSelected = () => {};
  return (
    <EditLayout
      onMarkdownSelected={onMarkdownSelected}
      onRenderedSelected={onRenderedSelected}
    ></EditLayout>
  );
};

export default Edit;