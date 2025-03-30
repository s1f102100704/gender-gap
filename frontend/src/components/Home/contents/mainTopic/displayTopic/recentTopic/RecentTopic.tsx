import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_RECENT_API_URL } from "../../../../../../config";
import styles from "./recentTopic.module.css";
import { Link } from "react-router-dom";
import useCreatedAt from "../../../../../../hook/makeTopic/useCreatedAt";
import ThreadAndPostImage from "../../../threadAndPostImage/ThreadAndPostImage";
const RecentTopic = () => {
  const [recentThreads, setRecentThreads] = useState<
    {
      thread_title: string;
      id: string;
      created_at: number;
      comments_count: number;
      image_key: string;
    }[]
  >([]);
  const { sinceDate } = useCreatedAt();
  const createSinceDate = (fullDate: Date) => {
    return sinceDate(fullDate);
  };
  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_THREAD_RECENT_API_URL, {});
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
          <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
            <div className={styles.threadConfig}>
              <div className={styles.threadImg}>
                <ThreadAndPostImage imageKey={thread.image_key} />
              </div>
              <div>
                <div className={styles.threadHeader}>
                  <div className={styles.countComments}>
                    {thread.comments_count}コメント
                  </div>
                  <div className={styles.dateTime}>
                    {" "}
                    {createSinceDate(new Date(thread.created_at))}
                  </div>
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
