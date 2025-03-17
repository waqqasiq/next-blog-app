import { NextApiRequest, NextApiResponse } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const strapiRes = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
    if (!strapiRes.ok) throw new Error("Failed to fetch blogs");

    const data = await strapiRes.json();
    return res.status(200).json(data.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export default handler;
