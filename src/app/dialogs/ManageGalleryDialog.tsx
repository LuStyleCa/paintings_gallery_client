"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface ManageGalleryDialogRef {
  openModal: (galleryId?: number, title?: string, showTitle?: boolean) => void;
}

export interface ManageGalleryDialogProps {
  onCreateGallery: (data: { title: string; showTitle: boolean }) => void; 
  onEditGallery: (data: { id: number, title: string; showTitle: boolean }) => void; 
}

const ManageGalleryDialog = forwardRef<
  ManageGalleryDialogRef,
  ManageGalleryDialogProps
>(function CreateGalleryDialog({ onCreateGallery, onEditGallery }, ref) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [title, setTitle] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [galleryId, setGalleryId] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    openModal: (id?: number, title?: string, showTitle?: boolean) => {
      setGalleryId(id ?? null); 
      setTitle(title ?? "");
      setShowTitle(showTitle ?? true);
      dialogRef.current?.showModal();
    }
  }));

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleSetGallery = () => {
    if(galleryId !== null) {
      onEditGallery({id: galleryId, title, showTitle })
    } else {
      onCreateGallery({ title, showTitle });
    }
    closeModal();
  };

  return (
    <dialog ref={dialogRef} className="p-4 rounded-md shadow-lg w-96">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">{galleryId ? "Edit Gallery" : "Create Gallery"}</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showTitle}
            onChange={(e) => setShowTitle(e.target.checked)}
          />
          Show Title
        </label>

        <button
          onClick={handleSetGallery}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {galleryId ? "Save changes" : "Create Gallery"}
        </button>

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-gray-500 text-white p-2 rounded"
        >
          X
        </button>
      </div>
    </dialog>
  );
});

ManageGalleryDialog.displayName = "ManageGalleryDialog";

export default ManageGalleryDialog;
