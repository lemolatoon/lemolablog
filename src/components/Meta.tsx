import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

type MetaProps = {
  title: string;
};
export const HeadsForPost = ({ title }: MetaProps) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const pageUrl = `${origin}${asPath}`;
  const imageUrl = `https://lemolablog.vercel.app/api/og?title=${title}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="lemolablog" />
      <meta property="og:description" content="lemolatoonのblogです。" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lemolatoon1" />
      <meta name="twitter:domain" content="https://lemolablog.vercel.app" />
      <meta name="twitter:image" content={imageUrl}></meta>
      <meta name="twitter:title" content="@lemolatoon1 のblog"></meta>
    </Head>
  );
};
