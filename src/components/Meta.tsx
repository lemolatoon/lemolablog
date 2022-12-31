import React from "react";

export const Meta = () => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const title = "test title";
  return (
    <>
      <title>{title}</title>
      <meta
        key="og:image"
        property="og:image"
        content={`${origin}/api/og?title=${title}`}
      />
    </>
  );
};
