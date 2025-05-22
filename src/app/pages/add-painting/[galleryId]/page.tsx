"use client";

import { useParams, useRouter } from "next/navigation";
import { PaintingService } from "@/app/services/PaintingService";
import PaintingForm from "@/app/components/PaintingForm";
import paths from "@/app/paths";

export default function AddPainting() {
  const router = useRouter();
  const { galleryId } = useParams();

  const handleGoBack = () => {
    router.push(paths.admin);
  };

  const numericGalleryId = galleryId ? Number(galleryId) : NaN;

  const handleSavePainting = async (
    title: string,
    description: string,
    price: string,
    imageFile: File
  ) => {
    if (!imageFile) return; // Prevent upload if no image file is selected

    await PaintingService.uploadPainting(
      numericGalleryId,
      title,
      description,
      price,
      imageFile
    );
    router.push(`${paths.admin}?view=galleries`);
  };

  return (
    <>
      <PaintingForm
        mode={"add"}
        onSave={handleSavePainting}
        onCancel={handleGoBack}
        galleryId={numericGalleryId}
      />
    </>
  );
}
