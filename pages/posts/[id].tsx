import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetchTitleAndHtmlByPostId } from "../../src/hooks/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Preview } from "../edit";
import { Header } from "../../src/Header/Header";
import React from "react";
import styled from "styled-components";
import { THEME_COLOR4 } from "../../styles/colors";
import { Footer } from "../../src/Footer/Footer";
import { HeadsForPost } from "../../src/components/Meta";
import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "@supabase/supabase-js";

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
  atServerFetchedHtml: string | null;
};
const Post = ({ atServerFetchedHtml, atServerFetchedTitle }: PostProps) => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") {
    if (router.isReady) {
      router.push("/404");
    }
    return <div>Redirecting...</div>;
  }
  const postId = Number.parseInt(id, 10);
  const fetchHtmlByPostId = useFetchTitleAndHtmlByPostId();
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    if (atServerFetchedTitle && atServerFetchedHtml) {
      return;
    }
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
  }, [atServerFetchedHtml, atServerFetchedTitle, router]);

  const bg = THEME_COLOR4;

  const titleBeingPassed = atServerFetchedTitle ?? title ?? "Loading Title....";
  const htmlBeingPassed = atServerFetchedHtml ?? html ?? "<h1>Loading....</h1>";
  return (
    <>
      <HeadsForPost title={titleBeingPassed} />
      <Header />
      <PaddingBlock height="50px" />

      <Preview bg={bg} title={titleBeingPassed} innerHtml={htmlBeingPassed} />
      <Footer />
    </>
  );
};

export const config = {
  runtime: "nodejs",
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const errProps = (): PostProps => {
    console.error("Returning null props");
    return {
      atServerFetchedHtml: null,
      atServerFetchedTitle: null,
    };
  };
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!(SUPABASE_URL && SUPABASE_ANON_KEY)) {
      console.error("ENV VARS not found");
      return {
        props: errProps(),
      };
    }
    if (!params) {
      console.error("id is not typeof string.");
      return {
        props: errProps(),
      };
    }
    const { id } = params;
    console.log(`running \`getStaticProps\` for \`/posts/${id}\``);
    if (typeof id !== "string") {
      console.error("id is not typeof string.");
      return {
        props: errProps(),
      };
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const fetchTitleAndHtmlByPostId = useFetchTitleAndHtmlByPostId();
    let data;
    const limit = 10;
    let count = 0;
    while (!data) {
      data = await fetchTitleAndHtmlByPostId(
        supabase,
        Number.parseInt(id as string, 10)
      );
      count++;
      if (limit < count) {
        throw new Error(`Failed to fetch blog content ${limit} times.`);
      }
    }
    const props: PostProps = {
      atServerFetchedTitle: data.title,
      atServerFetchedHtml: data.converted_html,
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
