import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.API_KEY || "my-hardcoded-key-2025";

const authMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({ error: "Unauthorized: Invalid API key" });
    return false;
  }
  
  return true;
};

export default authMiddleware;
