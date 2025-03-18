import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/auth";

// in-memory comments storage
export const commentsStore: { [blogId: string]: { id: number; text: string; author: string }[] } = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!authMiddleware(req, res)) return;

    const { method, query, body } = req;
    const blogId = query.blogId as string; // associate comments with a blog post

    switch (method) {
        case "GET":
            return getComments(res, blogId);

        case "POST":
            return addComment(res, blogId, body);

        default:
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
};

const getComments = (res: NextApiResponse, blogId: string) => {
    if (!blogId) return res.status(400).json({ error: "blogId is required" });
    return res.status(200).json(commentsStore[blogId] || []);
};

const addComment = (res: NextApiResponse, blogId: string, body: any) => {
    if (!blogId || !body.text || !body.author) {
        return res.status(400).json({ error: "blogId, text, and author are required" });
    }

    const newComment = { id: Date.now(), text: body.text, author: body.author };

    if (!commentsStore[blogId]) {
        commentsStore[blogId] = [];
    }
    commentsStore[blogId].push(newComment);

    return res.status(201).json(newComment);
};


export default handler;
