import React from "react";
import { useLocation } from "react-router-dom";

interface threadInfo {
  thread_title: string;
  id: string;
  created_at: number;
}
interface useGetThreadInfoReturn {
  threadTitle: string;
  threadId: string;
  threadDate: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
    hours: number;
    minutes: number;
    seconds: number;
  };
}
const useGetThreadInfo = (): useGetThreadInfoReturn => {
  const location = useLocation();
  const threadInfo: threadInfo = location.state;
  const threadTitle = threadInfo.thread_title;
  const threadId = threadInfo.id;
  const threadCreatedAt = threadInfo.created_at;
  const threadCreatedAtClone = new Date(threadCreatedAt);

  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const threadDate = {
    year: threadCreatedAtClone.getFullYear(),
    month: threadCreatedAtClone.getMonth() + 1,
    day: threadCreatedAtClone.getDate(),
    dayOfWeek: daysOfWeek[threadCreatedAtClone.getDay()],
    hours: threadCreatedAtClone.getHours(),
    minutes: threadCreatedAtClone.getMinutes(),
    seconds: threadCreatedAtClone.getSeconds(),
  };
  return { threadTitle, threadId, threadDate };
};

export default useGetThreadInfo;
