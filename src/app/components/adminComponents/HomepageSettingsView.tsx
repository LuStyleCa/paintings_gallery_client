import { useState } from "react";
import { homepageService } from "../../services/HomepageService";
import ImageSelector from "../ImageSelector";
import toast from "react-hot-toast";
import { ContentManagementModel } from "../../models/ContentManagement-model";

interface HomepageSettingsViewProps {
  contentManagement: ContentManagementModel | null;
}

export default function HomepageSettingsView({
  contentManagement,
}: HomepageSettingsViewProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileUrl = contentManagement?.homepagePainting?.fileUrl;

  const handleSavePainting = async () => {
    toast.loading("Saving...");
    if (imageFile) {
      try {
        await homepageService.uploadHomepagePainting(imageFile);
        toast.dismiss();
        toast.success("Saved successfully!");
      } catch (err) {
        toast.dismiss();
        toast.error("Failed to save.");
        console.log(err);
      }
    }
  };

  const handleSetImage = (file: File) => {
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="flex p-2 bg-zinc-700">
      <div className="w-1/2 md:p-10">
        <ImageSelector
          title={"Select homepage painting"}
          setFile={handleSetImage}
          fileUrl={fileUrl}
        />
        <button onClick={handleSavePainting}>Save</button>
      </div>
      {/* <div className="ml-8"></div> */}
    </div>
  );
}
