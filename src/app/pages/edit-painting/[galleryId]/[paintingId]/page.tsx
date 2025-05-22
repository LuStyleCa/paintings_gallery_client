
"use client";

import { useParams, useRouter } from "next/navigation";
import { PaintingService } from "@/app/services/PaintingService";
import PaintingForm from "@/app/components/PaintingForm";
import { useEffect, useState } from "react";
import { PaintingModel } from "@/app/models/Painting-model";
import paths from "@/app/paths";

export default function AddPainting() {
  const router = useRouter();
  const { galleryId, paintingId } = useParams(); // Using destructuring for both params
  const [painting, setPainting] = useState<PaintingModel | null>(null); // Set the initial state to null or an appropriate type

  const handleGoBack = () => {
    router.push(paths.admin);
  };

  const numericGalleryId = galleryId ? Number(galleryId) : NaN;
  const numericPaintingId = paintingId ? Number(paintingId) : NaN;

  // Fetch painting data when the component mounts (or when paintingId changes)
  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const data = await PaintingService.getPaintingById(numericPaintingId); // Ensure you're passing the numeric ID
        setPainting(data); // Set the painting data to state
      } catch (err) {
        console.error("Failed to fetch painting data:", err);
        // You can set an error state here to display a message if needed
      }
    };

    if (numericPaintingId) {
      fetchPainting(); // Only fetch data if the paintingId exists
    }
  }, [numericPaintingId]); // Dependency on numericPaintingId, so it reruns when the paintingId changes

  const handleSavePainting = async (
    title: string,
    description: string,
    price: string,
    imageFile: File
  ) => {
    if (!imageFile) return; // Prevent upload if no image file is selected

    await PaintingService.updatePainting(
      numericGalleryId,
      numericPaintingId,
      title,
      description,
      price,
      imageFile
    );
    handleGoBack();
  };

  return (
    <>
      {painting ? (
        <PaintingForm
          mode={"edit"}
          onSave={handleSavePainting}
          onCancel={handleGoBack}
          galleryId={numericGalleryId}
          initialPainting={painting} // Pass the painting data to the form as initial values
        />
      ) : (
        <div>Loading...</div> // Handle loading state until painting data is fetched
      )}
    </>
  );
}
