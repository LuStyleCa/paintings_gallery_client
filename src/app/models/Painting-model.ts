import { CommentModel } from "./Comment-model";

export interface PaintingModel {
  id: number;
  title?: string;
  description?: string;
  price?: string;
  fileUrl: string;
  comments: CommentModel[];
}
