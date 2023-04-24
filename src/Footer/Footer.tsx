import React from "react";
import styled from "styled-components";
import { THEME_COLOR3 } from "@/styles/colors";

const CopyRightBox = styled.div`
  height: 50px;
  margin-top: auto;
  background-color: ${THEME_COLOR3};
  display: flex;
  justify-content: center;
`;

const StyledSmall = styled.small`
  margin: auto;
  color: white;
`;

export const Footer = () => {
  return (
    <CopyRightBox>
      <StyledSmall>&copy; 2022 lemolatoon</StyledSmall>
    </CopyRightBox>
  );
};
