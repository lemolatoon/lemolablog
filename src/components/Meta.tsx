import React from "react";

type MetaProps = {
  title: string;
};
export const Meta = ({ title }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta
        key="og:image"
        property="og:image"
        content={`https://lemolablog.vercel.app/api/og?title=${title}`}
      />
    </>
  );
};
