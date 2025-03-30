import { useState } from "react";
import { PRESIGNED_URL_API_URL } from "../../config";
import imageCompression from "browser-image-compression";
const usePutImageS3 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  let image_key = null;

  const putImage = async () => {
    if (selectedFile) {
      console.log("🖼️ 元のファイルサイズ:", selectedFile.size / 1024, "KB");
      const compressedFile = await imageCompression(selectedFile, {
        maxSizeMB: 0.3, // 画像サイズ上限（MB）
        maxWidthOrHeight: 600, // 画像の最大幅/高さ
        useWebWorker: true,
      });
      console.log(
        "🗜️ 圧縮後のファイルサイズ:",
        compressedFile.size / 1024,
        "KB"
      );
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

      image_key = key;
    }
  };
  return { putImage, image_key, setSelectedFile };
};

export default usePutImageS3;
