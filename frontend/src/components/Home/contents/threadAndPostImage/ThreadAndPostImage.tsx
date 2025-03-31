import { useEffect, useState } from "react";
import { GET_PRESIGNED_API_URL } from "../../../../config";
import styles from "./threadAndoPostImage.module.css";
import {
  getCachedImageUrl,
  setCachedImageUrl,
} from "../../../../utils/imageCache";
type Props = {
  imageKey: string;
};
const ThreadAndPostImage = ({ imageKey }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const presinged_api_url = GET_PRESIGNED_API_URL;

  useEffect(() => {
    if (!imageKey) return;
    const cached = getCachedImageUrl(imageKey);
    if (cached) {
      setImageUrl(cached);
      return;
    }
    const fetchImageUrl = async () => {
      try {
        const res = await fetch(
          `${presinged_api_url}?key=${encodeURIComponent(imageKey)}`
        );

        if (!res.ok) {
          throw new Error(`HTTPエラー: ${res.status}`);
        }

        const json = await res.json();
        const url = json.data.url;
        setImageUrl(url);

        setCachedImageUrl(imageKey, url);
        setError(null);
      } catch (err) {
        console.error("❌ presigned URL取得失敗:", err);
        setError("画像が見つかりませんでした");
      }
    };

    fetchImageUrl();
  }, [imageKey, presinged_api_url]);
  return (
    <>
      {imageUrl ? (
        <img className={styles.image} src={imageUrl} alt="スレッド画像" />
      ) : error ? (
        <div className={styles.imageError}>画像が読み込めませんでした</div>
      ) : (
        <>img</> // ロード中や画像なし時のプレースホルダー
      )}
    </>
  );
};

export default ThreadAndPostImage;
