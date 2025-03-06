import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_API_URL } from "../../../../../../config";

const RecentTopic = () => {
  const [recentThreads, setRecentThreads] = useState<
    { thread_title: string }[]
  >([]);
  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_API_URL, {});
        const threadTitle = response.data.data;
        setRecentThreads(threadTitle);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);
  return (
    <>
      {recentThreads.map((thread, index) => (
        <div key={index}>{thread.thread_title}</div>
      ))}
    </>
  );
};

export default RecentTopic;
