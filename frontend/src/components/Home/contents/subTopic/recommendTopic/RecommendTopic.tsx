import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_RECOMMEND_API_URL } from "../../../../../config";
import styles from "./recommendTopic.module.css";
import { Link } from "react-router-dom";
import useCreatedAt from "../../../../../hook/makeTopic/useCreatedAt";
import { Thread } from "../../../../../types/thread";
import ThreadAndPostImage from "../../threadAndPostImage/ThreadAndPostImage";

const RecommendTopic = () => {
  const [recommendThreads, setrecommendThreads] = useState<Thread[]>([]);
  const { sinceDate } = useCreatedAt();
  const createSinceDate = (fullDate: Date) => {
    return sinceDate(fullDate);
  };
  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_RECOMMEND_API_URL, {});
        console.log("response:", response);
        setrecommendThreads(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);

  return (
    <>
      {recommendThreads.length > 0 ? (
        recommendThreads.map((thread, index) => (
          <div key={index}>
            <Link
              key={thread.id}
              to={`threads/${thread.id}`}
              state={{ thread }}
            >
              <div className={styles.threadConfig}>
                <div className={styles.threadImg}>
                  <ThreadAndPostImage imageKey={thread.image_key ?? null} />
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

export default RecommendTopic;
