import React from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { UnderlinedLink } from "../components/UnderlinedLink";
import { FaSignInAlt, FaEdit } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { IconButton } from "../components/IconButton";
import Image from "next/image";
import lemolablogImage from "public/lemolablog.png";
import Link from "next/link";

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

const HeaderContentContainer = styled.div`
  display: flex;
  margin: 0;
`;

const OsyareLine = styled.div<{ h: number }>`
  background-color: #1c285c;
  height: ${(props) => props.h - 3}px; // substract margin-bottom
  margin-top: 0;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
`;
const HeaderButtonWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
  > * {
    padding-left: 1em;
  }
`;
const AlignFlexStartWrapper = styled.div`
  margin-right: auto;
  margin-left: 5px;
`;

type headerLinkProps = {
  href: string;
  icon?: IconType;
  display?: React.ReactNode;
};
const HeaderLink = ({ href, icon, display }: headerLinkProps) => {
  const buttonProps = {
    children: display,
    fontLevel: 5,
    transparent: true,
  } as const;
  return (
    <UnderlinedLink href={href}>
      {icon ? (
        <IconButton icon={icon} {...buttonProps} />
      ) : (
        <Button {...buttonProps} />
      )}
    </UnderlinedLink>
  );
};
const HomeLink = ({ height }: { height: number }) => {
  return (
    <Link href="/">
      <Image src={lemolablogImage} alt="lemolablog" height={height} />
    </Link>
  );
};

type HeaderLayoutProps = {
  height: number; //px
};
const HeaderLayout = ({ height }: HeaderLayoutProps) => {
  const osyareLineHeight = 10;
  return (
    <HeaderContainer height={`${height}px`}>
      <HeaderContentContainer>
        <AlignFlexStartWrapper>
          <HomeLink height={height - osyareLineHeight - 5} />
        </AlignFlexStartWrapper>
        <HeaderButtonWrapper>
          <HeaderLink href="/edit" icon={FaEdit} display="Edit" />
          <HeaderLink href="/login" icon={FaSignInAlt} display="Login" />
        </HeaderButtonWrapper>
      </HeaderContentContainer>
      <OsyareLine h={osyareLineHeight} />
    </HeaderContainer>
  );
};

type HeaderProps = {
  height?: number;
};
export const Header = ({ height }: HeaderProps) => {
  return (
    <header>
      <HeaderLayout height={height ?? 80} />
    </header>
  );
};
