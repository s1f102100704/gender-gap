import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_API_URL } from "../../../../../../config";
import styles from "./recentTopic.module.css";
import { Link } from "react-router-dom";
const RecentTopic = () => {
  const [recentThreads, setRecentThreads] = useState<
    { thread_title: string; id: string }[]
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
        <div key={index}>
          <Link key={thread.id} to={`threads/${thread.id}`}>
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
