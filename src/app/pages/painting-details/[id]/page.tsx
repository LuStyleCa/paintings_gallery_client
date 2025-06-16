"use client";

import { PaintingModel } from "@/app/models/Painting-model";
import { PaintingService } from "@/app/services/PaintingService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import PaintingDialog from "@/app/dialogs/PaintingDialog";
import { sendComment } from "@/app/webSockets/CommentWebSocketService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import CommentSection from "@/app/components/CommentSection";
import { useAuth } from "@/app/AuthContext";
import paths from "@/app/paths";

export default function PaintingDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [painting, setPainting] = useState<PaintingModel | null>(null);
  const [selectedPainting, setSelectedPainting] =
    useState<PaintingModel | null>(null);

  const paintingId = id ? Number(id) : NaN;

  const { user } = useAuth();

  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const data = await PaintingService.getPaintingById(paintingId);
        setPainting(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPainting();
  }, [paintingId, id]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      client.subscribe("/topic/comments", (message) => {
        const newComment = JSON.parse(message.body);

        setPainting((prevPainting) => {
          if (!prevPainting) return null;

          const commentAlreadyExists = prevPainting.comments.some(
            (c) => c.id === newComment.id
          );

          if (commentAlreadyExists) return prevPainting;

          return {
            ...prevPainting,
            comments: [...prevPainting.comments, newComment],
          };
        });
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    setStompClient(client);

    // Cleanup function to disconnect when component unmounts
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const handleOpenPaintingDialog = (painting: PaintingModel) => {
    setSelectedPainting(painting);
  };

  const handleGoBack = () => {
    router.push(paths.galleries);
  };

  const handleSentMessage = (message: string) => {
    console.log("handling the sent message@@@@@@@@@@@");
    if (stompClient && user && painting) {
      console.log("checking the if conditionnnnnnnnnn");
      sendComment(stompClient, message, user, painting.id);
    }
  };

  return (
    <>
      <PaintingDialog
        painting={selectedPainting}
        setPainting={setSelectedPainting}
      />

      <div className="flex flex-col md:flex-row mt-14 h-[calc(100vh-3.5rem)]">
        <div className="bg-zinc-700 lg:w-1/4 p-8 w-full">
          <button onClick={handleGoBack} className="text-white">
            X
          </button>
          <div className="flex flex-col justify-center h-full space-y-2">
            <div className="flex">
              <label className="font-semibold text-white">Title:</label>
              <p className="text-white ml-4">{painting?.title ? painting.title : "-"}</p>
            </div>
            <div className="flex">
              <label className="font-semibold text-white">Description:</label>
              <p className="text-white ml-4">{painting?.description ? painting?.description : "-"}</p>
            </div>
            <div className="flex">
              <label className="font-semibold text-white">Price:</label>
              <p className="text-white ml-4">{painting?.price ? painting?.price : "-"}</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center bg-zinc-300 p-8">
          {painting && (
            <Image
              src={painting.fileUrl}
              alt="Painting"
              width={1200}
              height={1200}
              onClick={() => handleOpenPaintingDialog(painting)}
              className="object-contain aspect-[12/8]"
            />
          )}
        </div>
        <div className="bg-zinc-300 lg:w-1/4 w-full p-4 flex-col h-full">
          <CommentSection painting={painting} sentMessage={handleSentMessage} />
        </div>
      </div>
    </>
  );
}
