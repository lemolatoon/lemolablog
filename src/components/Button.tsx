import styled, { css } from "styled-components";
import { FontLevel, fontLevel2FontSize } from "../types/style";

type ButtonProps = {
  transparent?: boolean;
  bg?: string;
  fontLevel: FontLevel;
};
export const Button = styled.button<ButtonProps>`
  border: ${(props) => (props.transparent ? "none" : "solid")};
  background-color: ${(props) => props.bg ?? "inherit"};
  font-size: ${(props) => fontLevel2FontSize(props.fontLevel)};
  &:hover {
    ${(props) =>
      props.transparent
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
