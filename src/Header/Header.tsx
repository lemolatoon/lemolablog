import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Button } from "../components/Button";

type HeaderContainerProps = {
  height?: string;
};
const HeaderContainer = styled.div<HeaderContainerProps>`
  background-color: #a3afe3;
  height: ${(props) => props.height ?? "50px"};
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const OsyareLine = styled.div`
  background-color: #1c285c;
  height: 5px;
  margin-top: 0;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
`;
const HeaderButtonWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
`;
const AlingnFlexEndWrapper = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

const HeaderLayout = () => {
  return (
    <HeaderContainer height="80px">
      <HeaderButtonWrapper>
        <AlingnFlexEndWrapper>
          <Link href={"login"}>
            <Button transparent={true} fontLevel={5}>
              Login
            </Button>
          </Link>
        </AlingnFlexEndWrapper>
      </HeaderButtonWrapper>
      <OsyareLine />
    </HeaderContainer>
  );
};

export const Header = () => {
  return (
    <header>
      <HeaderLayout />
    </header>
  );
};
