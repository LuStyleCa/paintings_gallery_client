"use client";

import { useEffect, useState } from "react";
import Gallery from "../../components/Gallery";
import { GalleryModel } from "../../models/Gallery-model";
import { galleryService } from "../../services/GalleryService";

export default function Galleries() {
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await galleryService.getAllGalleries();
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

  return (
    <>
      <div className="mt-14 bg-zinc-700 h-screen">
        {galleries.map((gallery, index) => (
          <Gallery
            key={gallery.id || index}
            gallery={gallery}
            isAdmin={false}
            showTitle={gallery.showTitle}
          />
        ))}
      </div>
    </>
  );
}
