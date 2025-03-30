import { useState } from "react";
import { PRESIGNED_URL_API_URL } from "../../config";
import imageCompression from "browser-image-compression";
const usePutImageS3 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imageKey, setImageKey] = useState<string | null>(null);

  const putImage = async () => {
    if (selectedFile) {
      const compressedFile = await imageCompression(selectedFile, {
        maxSizeMB: 0.3, // 画像サイズ上限（MB）
        maxWidthOrHeight: 600, // 画像の最大幅/高さ
        useWebWorker: true,
      });

      const presignedApiUrl = `${PRESIGNED_URL_API_URL}?content_type=${encodeURIComponent(compressedFile.type)}`;
      const res = await fetch(presignedApiUrl);
      const json = await res.json();
      const { url, key } = json.data;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": compressedFile.type,
        },
        body: compressedFile,
      });
      // setImageKey(key);
      return key;
    }
    return null;
  };
  return { putImage, setSelectedFile };
};

export default usePutImageS3;
