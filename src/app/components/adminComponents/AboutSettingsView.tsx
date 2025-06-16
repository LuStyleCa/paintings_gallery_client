import { useState } from "react";
import ImageSelector from "./../ImageSelector";
import { aboutPageService } from "../../services/AboutPageService";
import toast from "react-hot-toast";
import { ContentManagementModel } from "../../models/ContentManagement-model";

interface AboutSettingsViewProps {
  contentManagement: ContentManagementModel | null;
}

export default function AboutSettingsView({
  contentManagement,
}: AboutSettingsViewProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [aboutText, setAboutText] = useState("");

  const fileUrl = contentManagement?.aboutPage?.aboutPageImage?.fileUrl;

  const handleSaveAboutPageInfo = async () => {
    toast.loading("Saving...");
    try {
      await aboutPageService.saveAboutPage(aboutText, imageFile);
      toast.dismiss();
      toast.success("Saved successfully!");
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Failed to save.");
    }
  };

  const handleSetImageFile = (file: File) => {
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <ImageSelector title="Select a photo" setFile={handleSetImageFile} fileUrl={fileUrl} />
        <textarea
          className="w-full p-4 border rounded-lg resize-none"
          placeholder={contentManagement?.aboutPage?.text}
          rows={12}
          onChange={(e) => setAboutText(e.target.value)}
        />
      </div>

      <button onClick={handleSaveAboutPageInfo}>Save</button>
    </div>
  );
}
