import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_POPULAR_API_URL } from "../../../../../../config";
import styles from "./popularTopic.module.css";
import { Link } from "react-router-dom";

const PopularTopic = () => {
  const [recentThreads, setRecentThreads] = useState<
    { thread_title: string; id: string; created_at: string; comments_count: number }[]
  >([]);

  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_THREAD_POPULAR_API_URL, {});
        console.log("Response Status:", response.status);
        console.log(response.data);
        setRecentThreads(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);

  return (
    <>
      {recentThreads.length > 0 ? (
        recentThreads.map((thread, index) => (
          <div key={index}>
            <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
              <div className={styles.threadConfig}>
                <div className={styles.threadImg}>img</div>
                <div>
                  <div className={styles.threadHeader}>
                    <div className={styles.countComments}>{thread.comments_count}コメント</div>
                    <div className={styles.dateTime}>{new Date(thread.created_at).toLocaleString()}</div>
                  </div>
                  <div className={styles.threadTitle}>{thread.thread_title}</div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PopularTopic;
