import { Client, IMessage } from "@stomp/stompjs";
import { UserModel } from "../models/User-model";

interface Comment {
  message: string;
  paintingId: number;
  userId: number;
  sender: string;
}

export function activateSTOMP(stompClient: Client) {
  stompClient.onConnect = () => {
    console.log("Connected to WebSocket");

    stompClient.subscribe("/topic/comments", (message: IMessage) => {
      const comment: Comment = JSON.parse(message.body);
      showComment(comment);
    });
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  stompClient.activate();
}

export function sendComment(stompClient: Client, message: string, user: UserModel, paintingId: number) {
  const comment: Comment = {
    message: message,
    paintingId: paintingId,
    userId: user.id,
    sender: user.username
  };

  stompClient.publish({
    destination: "/app/comment",
    body: JSON.stringify(comment),
  });
}

function showComment(comment: Comment) {
  // Implement your logic to display the comment
  console.log("Received comment:", comment);
}
