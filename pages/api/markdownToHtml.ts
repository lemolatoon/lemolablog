import { NextApiRequest, NextApiResponse } from "next";
import markdownToHtml from "zenn-markdown-html";

const validateRequest = (req: NextApiRequest): { markdown: string } | null => {
  const body: Record<string, unknown> = JSON.parse(req.body);
  if ("markdown" in body && typeof body.markdown === "string") {
    return body as { markdown: string };
  }
  return null;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = validateRequest(req);
    if (!body) {
      res.status(400).json({ message: "request validation faliled." });
      return;
    } else {
      res.status(200).json({ html: markdownToHtml(body.markdown) });
      return;
    }
  }
};

export default handler;
