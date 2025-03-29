import { useEffect, useState } from "react";
import { GET_PRESIGNED_API_URL } from "../../../../config";

type Props ={
  imageKey:string;
}
const ThreadAndPostImage = ({imageKey}:Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const presinged_api_url = GET_PRESIGNED_API_URL

  console.log(imageUrl)
  useEffect(() => {
    const fetchImageUrl = async (key:string)=>{
      const res = await fetch(`${presinged_api_url}?key=${encodeURIComponent(key)}`);
      const json = await res.json();
      return json.data.url; // ← これがS3のpresigned GET URL
    }
    if (imageKey) {
      fetchImageUrl(imageKey).then(setImageUrl);
    }
  }, [imageKey,presinged_api_url]);
  return (
    <div>
          {imageUrl && <img src={imageUrl} alt="スレッド画像" />}
    </div>
  )
}

export default ThreadAndPostImage
