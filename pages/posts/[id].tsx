import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetchHtmlByPostId } from "../../src/hooks/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Preview } from "../edit";
import { Header } from "../../src/Header/Header";
import React from "react";
import styled from "styled-components";

type PaddingBlockProps = {
  height: string;
};
const PaddingBlock = styled.div<PaddingBlockProps>`
  margin: 0;
  padding: 0;
  height: ${(props) => props.height};
`;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") {
    if (router.isReady) {
      router.push("/404");
    }
    return <div>Redirecting...</div>;
  }
  const postId = Number.parseInt(id, 10);
  const fetchHtmlByPostId = useFetchHtmlByPostId();
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const data = await fetchHtmlByPostId(supabase, postId);
      if (data) {
        setHtml(data.converted_html);
        setTitle(data.title);
        return true; // success
      } else {
        return false; // failure
      }
    })().then((flag) => {
      if (!flag && router.isReady) router.push("/404");
    });
  }, [router]);

  const bg = "#a3afe3";

  return (
    <>
      <Header />
      <PaddingBlock height="50px" />
      {title && html ? (
        <Preview bg={bg} title={title} innerHtml={html} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Post;
