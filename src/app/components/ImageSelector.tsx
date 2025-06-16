import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageSelectorProps {
  title: string;
  setFile: (file: File) => void;
  fileUrl: string | undefined;
}

export default function ImageSelector({
  title,
  setFile,
  fileUrl,
}: ImageSelectorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>();

  useEffect(() => {
    setImageUrl(fileUrl)
  }, [fileUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-96 mx-auto text-white">
      <h2 className="text-lg font-semibold mb-4 ">{title}</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Preview"
          width={300}
          height={300}
          className="rounded-lg object-contain max-w-full max-h-full aspect-[8/6]"
        />
      )}
    </div>
  );
}
