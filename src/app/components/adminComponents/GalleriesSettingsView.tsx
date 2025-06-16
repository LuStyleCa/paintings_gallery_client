"use client";

import { GalleryModel } from "../../models/Gallery-model";

import ManageGalleryDialog, {
  ManageGalleryDialogRef,
} from "../../dialogs/ManageGalleryDialog";
import { useEffect, useRef, useState } from "react";
import { galleryService } from "../../services/GalleryService";
import Gallery from "../Gallery";

export default function GallerySettingsView() {
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<ManageGalleryDialogRef | null>(null);

  useEffect(() => {
    // Call to fetch all galleries when the component mounts
    const fetchGalleries = async () => {
      try {
        const data = await galleryService.getAllGalleries();
        console.log(data);
        setGalleries(data);
      } catch (err) {
        setError(err + " Failed to fetch galleries.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleCreateGallery = (galleryData: {
    title: string;
    showTitle: boolean;
  }) => {
    const createGallery = async () => {
      try {
        const data = await galleryService.createGallery(
          galleryData.title,
          galleryData.showTitle
        );
        setGalleries((prevGalleries) => [...prevGalleries, data]);
      } catch (err) {
        setError(err + " Failed to create gallery.");
      } finally {
        setLoading(false);
      }
    };
    createGallery();
  };

  const handleDeleteGallery = async (galleryId: number) => {
    try {
      await galleryService.deleteGalleryById(galleryId);
      setGalleries((prevGalleries) =>
        prevGalleries.filter((gallery) => gallery.id !== galleryId)
      );
    } catch (err) {
      setError(err + " Failed to fetch galleries.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditGallery = (gallery: GalleryModel) => {
    console.log("Editing Gallery:", gallery.id);
    dialogRef.current?.openModal(gallery.id, gallery.title, gallery.showTitle); // Open modal with galleryId
  };

  const handleChangesGallery = (galleryData: {
    id: number;
    title: string;
    showTitle: boolean;
  }) => {
    const updateGallery = async () => {
      try {
        const data = await galleryService.updateGallery(galleryData);
        console.log("Updated gallery: " + data);
        setGalleries((prevGalleries) =>
          prevGalleries.map((gallery) =>
            gallery.id === galleryData.id
              ? { ...gallery, ...galleryData }
              : gallery
          )
        );
      } catch (err) {
        setError(err + " Failed to update gallery.");
      } finally {
        setLoading(false);
      }
    };
    updateGallery();
  };

  return (
    <>
      <ManageGalleryDialog
        ref={dialogRef}
        onCreateGallery={handleCreateGallery}
        onEditGallery={handleChangesGallery}
      />

      <div className="bg-zinc-700 p-4 h-screen">
        <button onClick={() => dialogRef.current?.openModal()}>
          Add Gallery
        </button>

        <div className="bg-gray-100 w-full">
          {galleries.map((gallery, index) => (
            <Gallery
              key={gallery.id || index}
              gallery={gallery}
              deleteGallery={handleDeleteGallery}
              updateGallery={handleEditGallery}
              isAdmin={true}
              showTitle={gallery.showTitle}
            />
          ))}
        </div>
      </div>
    </>
  );
}
