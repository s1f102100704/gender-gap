import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_POPULAR_API_URL } from "../../../../../../../src/config";
import styles from "./popularTopic.module.css";
import { Link } from "react-router-dom";
import useCreatedAt from "../../../../../../hook/makeTopic/useCreatedAt";

const PopularTopic = () => {
  const [popularThreads, setPopularThreads] = useState<
    {
      thread_title: string;
      id: string;
      created_at: string;
      comments_count: number;
    }[]
  >([]);
  const { sinceDate } = useCreatedAt();

  const createSinceDate = (fullDate: Date) => {
    return sinceDate(fullDate);
  };

  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_THREAD_POPULAR_API_URL, {});
        setPopularThreads(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);

  return (
    <>
      {popularThreads.length > 0 ? (
        popularThreads.map((thread, index) => (
          <div key={index}>
            <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
              <div className={styles.threadConfig}>
                <div className={styles.threadImg}>img</div>
                <div>
                  <div className={styles.threadHeader}>
                    <div className={styles.countComments}>
                      {thread.comments_count}コメント
                    </div>
                    <div className={styles.dateTime}>
                      {createSinceDate(new Date(thread.created_at))}
                    </div>
                  </div>
                  <div className={styles.threadTitle}>
                    {thread.thread_title}
                  </div>
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
