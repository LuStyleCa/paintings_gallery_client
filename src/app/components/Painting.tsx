"use client";

import Image from "next/image";
import { PaintingModel } from "../models/Painting-model";
import { useRouter } from "next/navigation";
import paths from "../paths";

interface PaintingProps {
  galleryId: number;
  painting: PaintingModel;
  onClick: () => void;
  isAdmin: boolean;
  handleDeletePainting: (paintingId: number) => void;
}

export default function Painting({
  galleryId,
  painting,
  onClick,
  isAdmin,
  handleDeletePainting,
}: PaintingProps) {
  const router = useRouter();

  const deletePainting = () => {
    handleDeletePainting?.(painting.id);
  };

  const handleUpdatePainting = () => {
    router.push(`${paths.editPainting}/${galleryId}/${painting.id}`);
  };

  return (
    <div>
      <button onClick={onClick}>
        <Image
          src={painting.fileUrl}
          alt="Painting"
          width={1200}
          height={1200}
        />
      </button>
      {isAdmin && (
        <div className="flex justify-between">
          <button onClick={handleUpdatePainting}>Edit</button>
          <button onClick={deletePainting}>Delete</button>
        </div>
      )}
    </div>
  );
}
