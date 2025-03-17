import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../middleware/auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!authMiddleware(req, res)) return;

  const { slug } = req.query;

  try {
    const strapiRes = await fetch(`${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
    if (!strapiRes.ok) throw new Error("Failed to fetch blog post");

    const data = await strapiRes.json();

    if (!data.data.length) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json(data.data[0]); // Return the first matching blog post
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

export default handler;
