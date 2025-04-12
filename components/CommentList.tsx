import React, { useState } from "react";
import CommentCard from "./CommentCard";

interface Comment {
  id: number;
  author: string;
  text: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [showAll, setShowAll] = useState(false);

  if (comments.length === 0) return <div><h2 className="text-xl font-semibold mb-4">Comments</h2> <p className="text-gray-500">No comments yet.</p></div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-4">
        {(showAll ? comments : comments.slice(0, 3)).map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </ul>
      {comments.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          {showAll ? "Show less" : "See all comments"}
        </button>
      )}
    </div>
  );
};

export default CommentList;
