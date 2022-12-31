import React from "react";
import { ImageResponse } from "@vercel/og";
import { THEME_COLOR4, THEME_COLOR5 } from "../../styles/colors";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const contentWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  height: "90%",
  "border-radius": "10px",
  "background-color": THEME_COLOR4,
  "font-size": "128px",
} as const;

const WrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  "background-color": THEME_COLOR5,
};

const ImageWrapper = {
  display: "flex",
  position: "absolute",
  left: "10%",
  bottom: "10%",
} as const;

export default function handler(req: NextRequest) {
  const errRes = () =>
    new Response("Failed to generate the image", { status: 500 });
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    if (!title) {
      return errRes();
    }
    return new ImageResponse(
      (
        <div style={WrapperStyle}>
          <div style={contentWrapper}>
            <div style={ImageWrapper}>
              <img
                src="https://udhwwfieuzvojpiubbie.supabase.co/storage/v1/object/public/lemolablog-images/lemolablog.png"
                height={150}
              />
            </div>
            Title HERE
          </div>
        </div>
      )
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return errRes();
  }
}
