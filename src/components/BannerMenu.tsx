import React from "react";
import styled, { css } from "styled-components";

type ChildrenWrapperProps = {
  checked: boolean;
};
const ChildrenWrapper = styled.li<ChildrenWrapperProps>`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0;
  width: 100%;
  color: white;
  background-color: #222;
  ${(props) =>
    props.checked
      ? css`
          border: 1px solid #333;
          height: 2.5em;
          padding: 0.5em;
          transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
        `
      : css`
          visibility: hidden;
          height: 0;
          margin: 0;
          padding: 0;
          border: 0;
          transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
        `}
`;

type MenuContainerProps = {
  headerHeight: string;
};
const MenuContainer = styled.ul<MenuContainerProps>`
  position: absolute;
  top: 0;
  margin-top: ${(props) => props.headerHeight};
  left: 0;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  > ${ChildrenWrapper}:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

type BannerProps = {
  isOpen: boolean;
  children: React.ReactNode[];
  headerHeight: string;
};
export const BannerMenu = ({ children, isOpen, headerHeight }: BannerProps) => {
  return (
    <MenuContainer headerHeight={headerHeight}>
      {children.map((child, idx) => {
        return (
          <ChildrenWrapper key={idx} checked={isOpen}>
            {child}
          </ChildrenWrapper>
        );
      })}
    </MenuContainer>
  );
};
