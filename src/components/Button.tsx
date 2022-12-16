import styled from "styled-components";
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
    filter: blur(3px);
    scale: 1.5;
  }
`;
