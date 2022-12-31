import React from "react";
import styled from "styled-components";
import lemolablogImage from "public/lemolablog.png";
import Image from "next/image";
import { THEME_COLOR4, THEME_COLOR5 } from "../../styles/colors";

const AbsoluteTitle = styled.div`
  position: absolute;
  max-width: 80vw;
  max-height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 999;
  font-size: 40px;
`;

const AbsoluteImageWrapper = styled.div`
  position: relative;
  padding: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${THEME_COLOR5};
`;

const BackgroundDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: calc(100vw - min(10vw, 10vh));
  height: calc(100vh - min(10vw, 10vh));
  border-radius: 10px;
  background-color: ${THEME_COLOR4};
`;

export const OgpImage = () => {
  return (
    <Wrapper>
      <BackgroundDiv>
        <AbsoluteTitle>自作ブログを作った話</AbsoluteTitle>
        <AbsoluteImageWrapper>
          <Image src={lemolablogImage} alt="lemolablog" height={150} />
        </AbsoluteImageWrapper>
      </BackgroundDiv>
    </Wrapper>
  );
};
