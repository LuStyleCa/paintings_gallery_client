  "use client";

import { useEffect, useState } from "react";
import { ContentManagementModel } from "../../models/ContentManagement-model";
import { contentManagementService } from "../../services/ContentManagementService";

export default function Contact() {
  const [contentManagement, setContentManagement] =
      useState<ContentManagementModel | null>(null);
  
    useEffect(() => {
      const fetchContentManagement = async () => {
        const data = await contentManagementService.getContentManagement();
        setContentManagement(data);
      };
      fetchContentManagement();
    }, []);
    
  return (
    <div className="h-screen flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p>📧 Email: {contentManagement?.contactPage?.email}</p>
        <p>📞 Phone: {contentManagement?.contactPage?.phoneNumber}</p>
        <p>📍 Location: {contentManagement?.contactPage?.location}</p>
      </div>
    </div>
  );
}
