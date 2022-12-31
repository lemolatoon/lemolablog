import { ImageResponse } from "@vercel/og";
import { NextApiRequest } from "next";
import styled from "styled-components";
import lemolablogImage from "public/lemolablog.png";
import Image from "next/image";

export const config = {
  runtime: "experimental-edge",
};

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

const AbsoluteImage = styled(Image)`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
`;

export default function handler(req: NextApiRequest) {
  return new ImageResponse(
    (
      <div>
        <AbsoluteTitle>Test Title</AbsoluteTitle>
        <AbsoluteImage src={lemolablogImage} alt="lemolablog" height={80} />
      </div>
    )
  );
}
