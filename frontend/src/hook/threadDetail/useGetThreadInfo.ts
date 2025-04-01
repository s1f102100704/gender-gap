import { useLocation } from "react-router-dom";
import { Thread } from "../../types/thread";
import { ThreadsPosts } from "../../types/post";

interface useGetThreadInfoReturn {
  threadTitle: string;
  threadId: string;
  dateInfo: Date;
  threadImage: string;
}
const useGetThreadInfo = (): useGetThreadInfoReturn => {
  const location = useLocation();
  const threadInfo: Thread = location.state;
  const threadTitle = threadInfo.thread_title;
  const threadImage = threadInfo.image_key;
  const threadCreatedAt = threadInfo.created_at;
  const dateInfo = new Date(threadCreatedAt);
  const threadId: string = threadInfo.id;
  return { threadTitle, threadId, dateInfo, threadImage };
};

interface useGetPostInfoReturn {
  post: ThreadsPosts;
  postContent: string;
  postId: string;
  dateInfo: Date;
  postImage: string | null;
  gender: number;
  index: number;
}
export const useGetPostInfo = (): useGetPostInfoReturn => {
  const location = useLocation();
  console.log(location);
  const { post, index } = location.state as {
    post: ThreadsPosts;
    index: number;
  };
  console.log(post);
  const postContent = post.content;
  const postId = post.id;
  const postImage = post.image_key;
  const gender = post.gender;
  const postCreatedAt = post.created_at;
  const dateInfo = new Date(postCreatedAt);

  return { post, postContent, postId, dateInfo, postImage, gender, index };
};
export default useGetThreadInfo;
