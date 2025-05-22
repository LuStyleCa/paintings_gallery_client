"use client";

import { CommentModel } from "../models/Comment-model";

interface CommentProps {
  comment: CommentModel;
}

export default function Comment({ comment }: CommentProps) {
  const getTimeAgo = (timestamp: string): string => {
    const time = new Date(timestamp).getTime();
    const now = Date.now();
    const diff = Math.floor((now - time) / 1000); // in seconds
  
    const units = [
      { label: "year", seconds: 31557600 },
      { label: "month", seconds: 2629744 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
  
    for (const unit of units) {
      const value = Math.floor(diff / unit.seconds);
      if (value >= 1) {
        return value === 1 ? `1 ${unit.label} ago` : `${value} ${unit.label}s ago`;
      }
    }
  
    return "Now";
  };
  

  return (
    <div className="bg-white p-2 rounded-lg shadow-md mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-900">
          {comment.sender}
        </span>
        <span className="text-xs text-gray-500">
          {getTimeAgo(comment.timestamp)}
        </span>
      </div>
      <p className="text-gray-700 text-sm">{comment.message}</p>
    </div>
  );
}
