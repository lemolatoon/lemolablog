import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useFetchHtmlByPostId,
  useFetchTitleByPostId,
} from "../../src/hooks/hooks";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Preview } from "../edit";
import { Header } from "../../src/Header/Header";
import React from "react";
import styled from "styled-components";
import { THEME_COLOR4 } from "../../styles/colors";
import { Footer } from "../../src/Footer/Footer";
import { HeadsForPost } from "../../src/components/Meta";
import { GetServerSideProps } from "next";

type PaddingBlockProps = {
  height: string;
};
const PaddingBlock = styled.div<PaddingBlockProps>`
  margin: 0;
  padding: 0;
  height: ${(props) => props.height};
`;

type PostProps = {
  atServerFetchedTitle: string | null;
};
const Post = ({ atServerFetchedTitle }: PostProps) => {
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

  const bg = THEME_COLOR4;

  return (
    <>
      <HeadsForPost title={atServerFetchedTitle ?? title ?? "No Title"} />
      <Header />
      <PaddingBlock height="50px" />
      {title && html ? (
        <Preview bg={bg} title={title} innerHtml={html} />
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </>
  );
};

export const config = {
  runtime: "nodejs",
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const errProps = (): PostProps => {
    return { atServerFetchedTitle: null };
  };
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    const { id } = ctx.query;
    if (!(SUPABASE_URL && SUPABASE_ANON_KEY && typeof id === "string")) {
      return {
        props: errProps(),
      };
    }
    const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const fetchTitleByPostId = useFetchTitleByPostId();
    const title = (
      await fetchTitleByPostId(supabase, Number.parseInt(id as string, 10))
    )?.title;
    const props: PostProps = {
      atServerFetchedTitle: title ?? null,
    };
    return {
      props: props,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return {
      props: errProps(),
    };
  }
};

export default Post;
