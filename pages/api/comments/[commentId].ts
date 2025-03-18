import { NextApiRequest, NextApiResponse } from "next";
import { find, findKey } from 'lodash';
import authMiddleware from "../../../middleware/auth";
import { commentsStore } from "../comments";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!authMiddleware(req, res)) return;

    const { method, query, body } = req;
    const commentId = query.commentId ? parseInt(query.commentId as string, 10) : null;

    if (!commentId) {
        return res.status(400).json({ error: "commentId are required" });
    }

    const blogId = findKey(commentsStore, (comments) => {
        return find(comments, {
            id: commentId
        })
    })

    if (!blogId) {
        return res.status(404).json({
            error: 'comment not found'
        });
    }

    switch (method) {
        case "PUT":
            return editComment(res, blogId, commentId, body);

        case "DELETE":
            return deleteComment(res, blogId, commentId);

        default:
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
};

const editComment = (res: NextApiResponse, blogId: string, commentId: number, body: any) => {
    if (!body.text || !body.author) {
        return res.status(400).json({ error: "Missing required properties: text and author" });
    }

    const comments = commentsStore[blogId] || [];
    const commentIndex = comments.findIndex((c) => c.id === commentId);

    comments[commentIndex].text = body.text;
    comments[commentIndex].author = body.author;

    return res.status(200).json(comments[commentIndex]);
};

const deleteComment = (res: NextApiResponse, blogId: string, commentId: number) => {
    commentsStore[blogId] = commentsStore[blogId]?.filter((c) => c.id !== commentId) || [];
    return res.status(200).json({ success: true, message: "Comment deleted" });
};

export default handler;
