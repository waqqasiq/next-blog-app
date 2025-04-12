// components/CommentCard.tsx
import React from "react";

interface CommentCardProps {
  author: string;
  text: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(date);

  const get = (type: string) => parts.find(p => p.type === type)?.value || "";

  return `${get("month")} ${get("day")}, ${get("year")}, ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
};

const CommentCard: React.FC<CommentCardProps> = ({ author, text, createdAt }) => {
  return (
    <li className="border p-4 rounded-md shadow-sm">
      <p className="text-gray-800">{text}</p>
      <p className="text-sm text-gray-500 mt-2">
        — {author} · {formatDate(createdAt)}
      </p>
    </li>
  );
};

export default CommentCard;
