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
    <div className="flex mt-14 p-4">
      <p className="ml-4">{contentManagement?.aboutPage?.text}</p>
      {fileUrl && <Image src={fileUrl} alt="Logo" width={300} height={300} />}
    </div>
  );
}
