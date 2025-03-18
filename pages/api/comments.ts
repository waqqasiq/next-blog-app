import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/auth";

// in-memory comments storage
let commentsStore: { [blogId: string]: { id: number; text: string; author: string }[] } = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!authMiddleware(req, res)) return;

    const { method, query, body } = req;
    const blogId = query.blogId as string; // associate comments with a blog post

    switch (method) {
        case "GET": 
            return getComments(res, blogId);

        case "POST":
            return addComment(res, blogId, body);

        case "PUT": 
            return editComment(res, blogId, body);

        case "DELETE":
            return deleteComment(res, blogId, body);

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

const editComment = (res: NextApiResponse, blogId: string, body: any) => {
    if (!blogId || !body.id || !body.text) {
        return res.status(400).json({ error: "blogId, comment id, and new text are required" });
    }

    const comments = commentsStore[blogId] || [];
    const commentIndex = comments.findIndex((c) => c.id === body.id);

    if (commentIndex === -1) {
        return res.status(404).json({ error: "Comment not found" });
    }

    comments[commentIndex].text = body.text;
    return res.status(200).json(comments[commentIndex]);
};

const deleteComment = (res: NextApiResponse, blogId: string, body: any) => {
    if (!blogId || !body.id) {
        return res.status(400).json({ error: "blogId and comment id are required" });
    }

    const comments = commentsStore[blogId] || [];
    commentsStore[blogId] = comments.filter((c) => c.id !== body.id);

    return res.status(200).json({ success: true, message: "Comment deleted" });
};

export default handler;
