import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_RECENT_API_URL } from "../../../../../../config";
import styles from "./recentTopic.module.css";
import { Link } from "react-router-dom";
const RecentTopic = () => {
  const [popularThreads, setPopularThreads] = useState<
    { thread_title: string; id: string; created_at: number }[]
  >([]);
  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_THREAD_RECENT_API_URL, {});
        const threadTitle = response.data.data;
        setPopularThreads(threadTitle);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);
  return (
    <>
      {popularThreads.map((thread, index) => (
        <div key={index}>
          <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
            <div className={styles.threadConfig}>
              <div className={styles.threadImg}>img</div>
              <div>
                <div className={styles.threadHeader}>
                  <div className={styles.countComments}>０コメント</div>
                  <div className={styles.dateTime}>３秒前</div>
                </div>
                <div className={styles.threadTitle}>{thread.thread_title}</div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default RecentTopic;
