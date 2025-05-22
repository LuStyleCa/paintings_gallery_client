import { PaintingModel } from "./Painting-model";

export interface GalleryModel {
  id: number;
  title?: string;
  showTitle?: boolean;
  paintings?: PaintingModel[];
}
