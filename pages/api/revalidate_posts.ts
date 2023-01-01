import { NextApiRequest, NextApiResponse } from "next";

// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("HERE IS BODY.");
    console.log(req);
    console.log(req.body);
    const body = JSON.parse(req.body);
    console.log(body);
    console.log(body);
    // Check for secret to confirm this is a valid request
    const { secret } = req.query;
    if (!secret || req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      console.error("Invalid token.");
      console.error("got:");
      console.error(secret);
      console.error("expected:");
      console.error(process.env.REVALIDATE_SECRET_TOKEN);
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(200).json({ message: "ok" });
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate("/path-to-revalidate");
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
