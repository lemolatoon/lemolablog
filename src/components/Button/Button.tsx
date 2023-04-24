import styled, { css } from "styled-components";
import { FontLevel, fontLevel2FontSize } from "@/types/style";

export type HoverButtonProps = {
  color?: string;
  transparent?: boolean;
};

export type TransparentButtonProps = {
  color?: string;
  transparent?: boolean;
  bg?: string;
  fontLevel: FontLevel;
};

type BorderProps = "none" | "solid";
export type ButtonProps = {
  border?: BorderProps;
} & TransparentButtonProps &
  HoverButtonProps;

export const Hover = (props: HoverButtonProps) => css`
  color: ${props.color};
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
  color: ${props.color};
  border: ${props.transparent ? "none" : undefined};
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
  border: ${(props) => props.border};
  ${(props) => Hover(props)}
  ${(props) => Transparent(props)}
`;
