import Head from "next/head";
import React from "react";

type MetaProps = {
  title: string;
};
export const HeadsForPost = ({ title }: MetaProps) => {
  const imageUrl = `https://lemolablog.vercel.app/api/og?title=${title}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta
        name="twitter:domain"
        content="https://lemolablog.vercel.app"
      ></meta>
      <meta name="twitter:image" content={imageUrl}></meta>
      <meta name="twitter:title" content="@lemolatoon1 のblog"></meta>
    </Head>
  );
};
