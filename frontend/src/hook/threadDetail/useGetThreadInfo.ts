import { useLocation } from "react-router-dom";

interface threadInfo {
  thread_title: string;
  id: string;
  created_at: number;
}
interface useGetThreadInfoReturn {
  threadTitle: string;
  dateInfo: Date;
}
const useGetThreadInfo = (): useGetThreadInfoReturn => {
  const location = useLocation();
  const threadInfo: threadInfo = location.state;
  const threadTitle = threadInfo.thread_title;
  // const threadId = threadInfo.id;
  const threadCreatedAt = threadInfo.created_at;
  const dateInfo = new Date(threadCreatedAt);
  return { threadTitle, dateInfo };
};

export default useGetThreadInfo;
