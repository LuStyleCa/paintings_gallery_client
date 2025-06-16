"use client";

import { useEffect, useState } from "react";
import { contentManagementService } from "../../services/ContentManagementService";
import { ContentManagementModel } from "../../models/ContentManagement-model";
import Image from "next/image";

export default function About() {
  const [contentManagement, setContentManagement] =
    useState<ContentManagementModel | null>(null);

  useEffect(() => {
    const fetchContentManagement = async () => {
      const data = await contentManagementService.getContentManagement();
      setContentManagement(data);
    };
    fetchContentManagement();
  }, []);

  const fileUrl = contentManagement?.aboutPage?.aboutPageImage.fileUrl;

  return (
    <div className="bg-zinc-700 min-h-screen flex flex-col md:flex-row items-center md:justify-center gap-6 p-6 text-white">
      <p className="w-full md:w-1/2 text-lg leading-relaxed p-8 mt-10">
        {contentManagement?.aboutPage?.text}
      </p>
      {fileUrl && (
        <div className="w-full max-w-xs md:max-w-sm md:p-10 md:mt-12">
          <Image
            src={fileUrl}
            alt="About Page Image"
            width={400}
            height={400}
            layout="responsive"
            objectFit="contain"
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}
