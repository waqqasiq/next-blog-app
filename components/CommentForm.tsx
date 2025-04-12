import React, { useState } from "react";

interface CommentFormProps {
  blogId: number;
  onAddComment: (newComment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ blogId, onAddComment }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/comments?blogId=${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "my-hardcoded-key-2025",
        },
        body: JSON.stringify({ text, author }),
      });

      const newComment = await res.json();
      onAddComment(newComment);
      setText("");
      setAuthor("");
    } catch (error) {
      console.error("Error posting comment", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
      <input
        type="text"
        placeholder="Your name"
        className="w-full border px-4 py-2 rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your comment..."
        className="w-full border px-4 py-2 rounded h-28 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
