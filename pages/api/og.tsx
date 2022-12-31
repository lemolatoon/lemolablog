import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextApiRequest } from "next";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import lemolablogImage from "public/lemolablog.png";
import Image from "next/image";

export const config = {
  runtime: "experimental-edge",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AbsoluteTitle = styled.div`
  position: absolute;
  max-width: 90%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AbsoluteImage = styled(Image)`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function handler(_req: NextApiRequest) {
  return new ImageResponse(
    (
      <h1>
        {/* <AbsoluteTitle>Test Title</AbsoluteTitle>
        <AbsoluteImage src={lemolablogImage} alt="lemolablog" height={80} /> */}
        HELLO WORLD
      </h1>
    )
  );
}
