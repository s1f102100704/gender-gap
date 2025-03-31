import { useLocation } from "react-router-dom";
import { Thread } from "../../types/thread";

interface useGetThreadInfoReturn {
  threadTitle: string;
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
  return { threadTitle, dateInfo, threadImage };
};

export default useGetThreadInfo;
