"use client";

import { useState } from "react";

import { GalleryModel } from "../models/Gallery-model";
import { useRouter } from "next/navigation";
import Painting from "./Painting";
import { PaintingService } from "../services/PaintingService";
import { PaintingModel } from "../models/Painting-model";
import paths from "../paths";

interface GalleryProps {
  gallery: GalleryModel;
  deleteGallery?: (galleryId: number) => void;
  updateGallery?: (gallery: GalleryModel) => void;
  isAdmin: boolean;
  showTitle?: boolean;
}

const Gallery = ({
  gallery,
  deleteGallery,
  updateGallery,
  isAdmin,
  showTitle,
}: GalleryProps) => {
  const [paintings, setPaintings] = useState(gallery.paintings ?? []);
  const router = useRouter();

  const handleAddPainting = () => {
    router.push(`${paths.addPainting}/${gallery.id}`);
  };

  const handleDeleteGallery = () => {
    deleteGallery?.(gallery.id);
  };

  const handleUpdateGallery = () => {
    updateGallery?.(gallery);
  };

  const handleDeletePainting = async (paintingId: number) => {
    try {
      await PaintingService.deletePainting(gallery.id, paintingId);
      setPaintings((prev) => prev.filter((p) => p.id !== paintingId));
    } catch (error) {
      console.error("Failed to delete painting:", error);
    }
  };

  const handleOpenPaintingDetails = (painting: PaintingModel) => {
    router.push(`${paths.paintingDetails}/${painting.id}`);
  };

  return (
    <>
      <div className="bg-zinc-700 h-100">
        <div className="flex justify-between items-center p-4">
          <div className="flex">
            {isAdmin || showTitle ? (
              <h1 className="text-2xl font-bold">{gallery?.title}</h1>
            ) : null}

            {isAdmin && (
              <button className="ml-4" onClick={handleUpdateGallery}>
                Edit
              </button>
            )}
          </div>
          {isAdmin && <button onClick={handleAddPainting}>Add painting</button>}
          {isAdmin && (
            <button onClick={handleDeleteGallery}>Delete Gallery</button>
          )}
        </div>
        <div className="flex p-4 items-center justify-center">
          <div className="grid grid-cols-4 gap-8">
            {paintings?.map((painting, index) => (
              <Painting
                key={painting.id ?? index}
                galleryId={gallery.id}
                painting={painting}
                onClick={() => handleOpenPaintingDetails(painting)}
                isAdmin={isAdmin}
                handleDeletePainting={handleDeletePainting}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
