"use client";

import { PaintingModel } from "../models/Painting-model";
import Comment from "./Comment";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import paths from "../paths";

interface CommentSectionProps {
  painting: PaintingModel | null;
  sentMessage: (message: string) => void;
}

export default function CommentSection({
  painting,
  sentMessage,
}: CommentSectionProps) {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleSend = () => {
    if (message.trim()) {
      sentMessage(message);
      setMessage("");
    }
  };

  const handleNavigateRegisterPage = () => {
    router.push(paths.register);
  };

  return (
    <div className=" bg-zinc-300 w-full flex flex-col justify-between h-full">
      <div className="flex-grow overflow-y-auto mb-4 p-2">
        {painting?.comments ? (
          <div className="overflow-y-auto mb-4">
            {painting?.comments
              .slice() // make a copy to avoid mutating state
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              ) // descending
              .map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
          </div>
        ) : (
          <div>
            <h1>No comments yet.</h1>
          </div>
        )}
      </div>

      {!user ? (
        <div className="bg-white rounded-md border p-2 text-sm text-zinc-700 mb-2">
          Please login to leave a comment or{" "}
          <b
            className="cursor-pointer hover:underline"
            onClick={handleNavigateRegisterPage}
          >
            register
          </b>{" "}
          here to create an account.
        </div>
      ) : (
        <div className="flex-col items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
