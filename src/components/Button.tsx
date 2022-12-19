import styled, { css } from "styled-components";
import { FontLevel, fontLevel2FontSize } from "../types/style";

export type HoverButtonProps = {
  transparent?: boolean;
};

export type TransparentButtonProps = {
  transparent?: boolean;
  bg?: string;
  fontLevel: FontLevel;
};

export type ButtonProps = TransparentButtonProps & HoverButtonProps;

export const Hover = (props: HoverButtonProps) => css`
  &:hover {
    ${props.transparent
      ? css`
          filter: blur(3px);
          scale: 1.5;
        `
      : css`
          filter: brightness(0.3);
          filter: contrast(0.5);
        `}
  }
`;

const Transparent = (props: TransparentButtonProps) => css`
  border: ${props.transparent ? "none" : "solid"};
  background-color: ${props.bg ?? "inherit"};
  font-size: ${fontLevel2FontSize(props.fontLevel)};
  text-decoration: inherit;
`;

export const TransparentButton = styled.button<TransparentButtonProps>`
  ${(props) => Transparent(props)}
  text-decoration: inherit;
`;
export const HoverButton = styled.button<HoverButtonProps>`
  ${(props) => Hover(props)}
  text-decoration: inherit;
`;

export const Button = styled.button<ButtonProps>`
  ${(props) => Hover(props)}
  ${(props) => Transparent(props)}
`;
