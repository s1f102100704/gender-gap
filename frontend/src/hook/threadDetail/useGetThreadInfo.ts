import { useLocation } from "react-router-dom";
import { Thread } from "../../types/thread";
import { ThreadsPosts } from "../../types/post";

interface useGetThreadInfoReturn {
  threadInfo: Thread;
  threadTitle: string;
  // threadId: string;
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
  // const threadId: string = threadInfo.id;
  return { threadInfo, threadTitle, dateInfo, threadImage };
};

interface useGetThreadStateReturn {
  threadTitle: string;
  dateInfo: Date;
  threadImage: string;
}

export const useGetThreadState = (thread: Thread): useGetThreadStateReturn => {
  const threadTitle = thread.thread_title;
  const threadImage = thread.image_key;
  const threadCreatedAt = thread.created_at;
  const dateInfo = new Date(threadCreatedAt);
  return { threadTitle, dateInfo, threadImage };
};

interface useGetPostInfoReturn {
  postContent: string;
  postId: string;
  postDateInfo: Date;
  postImage: string | null;
  gender: number;
}
export const useGetPostInfo = (post: ThreadsPosts): useGetPostInfoReturn => {
  const postContent = post.content;
  const postId = post.id;
  const postImage = post.image_key;
  const gender = post.gender;
  const postCreatedAt = post.created_at;
  const postDateInfo = new Date(postCreatedAt);

  return { postContent, postId, postDateInfo, postImage, gender };
};
export default useGetThreadInfo;
