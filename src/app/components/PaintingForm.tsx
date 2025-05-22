"use client";

import { useState } from "react";
import Image from "next/image";
import { PaintingModel } from "../models/Painting-model";

interface PaintingFormProps {
  galleryId: number;
  initialPainting?: PaintingModel;
  mode: "add" | "edit";
  onSave: (
    title: string,
    description: string,
    price: string,
    imageFile: File
  ) => void;
  onCancel: () => void;
}

export default function PaintingForm({
  initialPainting,
  mode,
  onSave,
  onCancel,
}: PaintingFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialPainting?.fileUrl || ""
  );
  const [title, setTitle] = useState<string>(initialPainting?.title || "");
  const [description, setDescription] = useState<string>(
    initialPainting?.description || ""
  );
  const [price, setPrice] = useState<string>(initialPainting?.price || "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      onSave(title, description, price, imageFile);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="mt-14 flex">
        <div className="w-1/2 p-10">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md w-96 mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              {mode === "edit" ? "Edit Painting" : "Upload Painting"}
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Preview"
                width={300}
                height={300}
                className="w-full h-auto rounded-lg mt-2"
              />
            )}
          </div>
        </div>
        <div className="w-1/2 p-10">
          <form>
            <label>Title</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>
            <textarea
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Price</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button
              type="button"
              className="bg-blue-500 text-white p-2 mt-4"
              onClick={handleSubmit}
            >
              {mode === "edit" ? "Update Painting" : "Add Painting"}
            </button>
          </form>
          <button
            className="ml-4 bg-gray-500 text-white p-2 mt-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
