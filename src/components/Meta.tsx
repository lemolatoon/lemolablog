import Head from "next/head";
import React from "react";

type MetaProps = {
  title: string;
};
export const HeadsForPost = ({ title }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        property="og:image"
        content={`https://lemolablog.vercel.app/api/og?title=${title}`}
      />
    </Head>
  );
};
