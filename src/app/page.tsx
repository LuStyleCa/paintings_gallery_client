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
    <div className="bg-zinc-700 p-10 h-screen">
      <div className="flex mt-14 p-10">
        <div className="w-1/2 text-white">
          <h1 className="text-white text-6xl font-bold mb-4">TOON BORGHUIS</h1>
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
        <div className="w-1/2 flex justify-center">
          {fileUrl && (
            <Image src={fileUrl} alt="Logo" width={325} height={325} />
          )}
        </div>
      </div>
    </div>
  );
}
