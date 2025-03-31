import axios from "axios";
import { POSTS_API_URL } from "../../config";

interface usePostContextToDBReturn {
  threadContextSubmit: (
    event: React.FormEvent,
    discussion_thread_id: string,
    image_key?: string | null
  ) => Promise<void>;
}
interface Props {
  threadContext: string;
  gender: number;
}
const usePostContextToDB = (props: Props): usePostContextToDBReturn => {
  const { threadContext, gender } = props;
  const threadContextSubmit = async (
    event: React.FormEvent,
    discussion_thread_id: string,
    image_key?: string | null
  ): Promise<void> => {
    event.preventDefault();
    const content = threadContext;
    console.log("image_key 1:", image_key);
    try {
      const response = await axios.post(POSTS_API_URL, {
        post: { content, discussion_thread_id, gender, image_key },
      });
      console.log("Success to post content:", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    threadContextSubmit,
  };
};

export default usePostContextToDB;
