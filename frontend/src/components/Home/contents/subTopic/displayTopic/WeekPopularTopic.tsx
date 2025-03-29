import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_WEEK_POPULAR_API_URL } from "../../../../../config";
import styles from "./weekPopularTopic.module.css";
import { Link } from "react-router-dom";
import useCreatedAt from "../../../../../hook/makeTopic/useCreatedAt";

const WeekPopularTopic = () => {
  const [weekPopularThreads, setWeekPopularThreads] = useState<
    {
      thread_title: string;
      id: string;
      created_at: string;
      comments_count: number;
      votes_summary: {
        male_votes: number;
        female_votes: number;
      };
    }[]
  >([]);
  const { sinceDate } = useCreatedAt();

  const createSinceDate = (fullDate: Date) => {
    return sinceDate(fullDate);
  };

  // 背景色を決定する関数
  const getBackgroundColor = (votesSummary: { male_votes: number; female_votes: number }) => {
    const { male_votes, female_votes } = votesSummary;

    if (male_votes > female_votes) {
      return "rgba(0, 0, 255, 0.1)"; // 青（男性が優勢）
    } else if (female_votes > male_votes) {
      return "rgba(255, 0, 0, 0.1)"; // 赤（女性が優勢）
    } else {
      return "rgba(200, 200, 200, 0.1)";
    }
  };

  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(DISCUSSION_THREAD_WEEK_POPULAR_API_URL, {});
        console.log(response.data.data);
        setWeekPopularThreads(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadsTitle();
  }, []);

  return (
    <>
      {weekPopularThreads.length > 0 ? (
        weekPopularThreads.map((thread, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getBackgroundColor(thread.votes_summary), // 背景色を動的に設定
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
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

export default WeekPopularTopic;
