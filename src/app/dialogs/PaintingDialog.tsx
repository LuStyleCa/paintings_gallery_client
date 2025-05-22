"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { PaintingModel } from "../models/Painting-model";

interface PaintingDialogProps {
  painting: PaintingModel | null;
  setPainting: (painting: PaintingModel | null) => void;
}

const PaintingDialog: React.FC<PaintingDialogProps> = ({
  painting,
  setPainting,
}: PaintingDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    setPainting(null);
  }, [setPainting]);

  useEffect(() => {
    if (painting) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") closeModal();
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [painting, closeModal]);

  return (
    <dialog ref={dialogRef} className="backdrop:bg-zinc-300">
      <div className="max-w-[80vw] max-h-[80vh] bg-zinc-300">
        {painting && (
          <Image
            src={painting.fileUrl}
            alt="Painting"
            width={1200}
            height={1200}
            className="rounded-lg object-contain max-w-full max-h-full aspect-[5/2]"
          />
        )}
      </div>
      <button
        onClick={closeModal}
        className="absolute -top-2.5 right-2  text-zinc-700 p-2 rounded"
      >
        X
      </button>
    </dialog>
  );
};

export default PaintingDialog;
