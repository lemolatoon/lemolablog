import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseWebhookPayload, Post } from "../../src/types/supabase";

const validateRequestAndExtractPostId = (
  _body: unknown
): Exclude<DatabaseWebhookPayload<Post>["record"], null>["post_id"] | null => {
  try {
    if (typeof _body !== "string") {
      return null;
    }
    const body = JSON.parse(_body);
    if (!body || typeof body !== "object") {
      return null;
    }
    if (!("record" in body)) {
      return null;
    }
    const record = body.record;
    if (!record || typeof record !== "object" || !("post_id" in record)) {
      return null;
    }
    const post_id = record.post_id;
    if (!post_id || typeof post_id !== "number") {
      return null;
    }

    return post_id;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }

    return null;
  }
};

// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check for secret to confirm this is a valid request
    const { secret } = req.query;
    if (!secret || req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      console.error("Invalid token.");
      return res.status(401).json({ message: "Invalid token" });
    }

    const post_id = validateRequestAndExtractPostId(req.body as unknown);
    if (!post_id) {
      return res.status(400).json({ message: "body validation failed." });
    }

    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate(`/posts/${post_id}`);
      console.log(`/posts/${post_id} will revalidate.`);
      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send("Error revalidating");
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    console.error("moro morro failed");
  }
}
