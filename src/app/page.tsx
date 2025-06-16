"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ContentManagementModel } from "./models/ContentManagement-model";
import { contentManagementService } from "./services/ContentManagementService";

export default function Home() {
  const [ContentManagement, setContentManagement] =
    useState<ContentManagementModel | null>(null);

  useEffect(() => {
    const fetchContentManagement = async () => {
      const data = await contentManagementService.getContentManagement();
      setContentManagement(data);
    };

    fetchContentManagement();
  }, []);

  const fileUrl = ContentManagement?.homepagePainting?.fileUrl;

  return (
    <div className="bg-zinc-700 py-10 px-10 min-h-screen overflow-hidden md:overflow-auto">
      <div className="flex flex-col md:flex-row mt-14 gap-8">
        {/* TEXT BLOCK */}
        <div className="w-full md:w-1/2 text-white p-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            TOON BORGHUIS
          </h1>
          <p>
            In de &quot;huid&quot; van mijn schilderijen laat ik intuitief
            vormen, kleuren en structuren &quot;te voorschijn groeien&quot;. Het
            beeldend proces is intensief en vormt de zoektocht naar mijn
            verbeelding. Hierin wil ik mijzelf ontdekken door aan het
            &quot;getijsterde&quot; oppervlak een emotionele betekenis te geven.
            In de fysieke kracht openbaart zich kwetsbaarheid, openheid en
            harmonie.
          </p>
        </div>

        {/* IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {fileUrl && (
            <div className="w-full max-w-md max-h-[70vh] p-4">
              <Image
                src={fileUrl}
                alt="Painting"
                width={800}
                height={800}
                layout="responsive"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
