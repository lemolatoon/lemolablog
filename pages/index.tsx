import React from "react";
import { AppContainer } from "@/components/containers";
import { Header } from "@/Header/Header";
import styled from "styled-components";
import { usePostedTitles } from "@/hooks/hooks";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Footer } from "@/Footer/Footer";

const BlogTitleLi = styled.li`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0;
  color: white;
  background-color: #222;
  border: 1px solid #333;
  height: 2.5em;
  padding: 0.5em;
  transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
`;

const BlogTitlesContainer = styled.ul`
  top: 0;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > ${BlogTitleLi}:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

type BlogTitleProps = {
  children: React.ReactNode[];
};
const BlogTitle = ({ children }: BlogTitleProps) => {
  return (
    <BlogTitlesContainer>
      {children.map((child, idx) => {
        return <BlogTitleLi key={idx}>{child}</BlogTitleLi>;
      })}
    </BlogTitlesContainer>
  );
};

export default function Home() {
  const { titles } = usePostedTitles();
  const links = titles
    ? titles.map(({ title, post_id }, idx) => {
        return (
          <Link key={idx} href={`posts/${post_id}`}>
            <Button border="none" fontLevel={5} color="white">
              {title}
            </Button>
          </Link>
        );
      })
    : [<div key={0}>loading....</div>];
  return (
    <>
      <Header />
      <AppContainer>
        <BlogTitle>{links}</BlogTitle>
      </AppContainer>
      <Footer />
    </>
  );
}
