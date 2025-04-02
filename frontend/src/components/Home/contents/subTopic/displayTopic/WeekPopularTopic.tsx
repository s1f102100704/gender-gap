import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_WEEK_POPULAR_API_URL } from "../../../../../config";
import styles from "./weekPopularTopic.module.css";
import { Link } from "react-router-dom";
import useCreatedAt from "../../../../../hook/makeTopic/useCreatedAt";
import ThreadAndPostImage from "../../threadAndPostImage/ThreadAndPostImage";

const WeekPopularTopic = () => {
  const [weekPopularThreads, setWeekPopularThreads] = useState<
    {
      thread_title: string;
      id: string;
      created_at: string;
      comments_count: number;
      image_key: string;
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
  const getBackgroundColor = (votesSummary: {
    male_votes: number;
    female_votes: number;
  }) => {
    const { male_votes, female_votes } = votesSummary;

    // 差を計算
    const totalVotes = male_votes + female_votes;
    const difference = Math.abs(male_votes - female_votes);

    // 差の割合を計算（0.1 以上 1.0 以下に制限）
    const intensity =
      totalVotes > 0
        ? Math.min(Math.max(difference / totalVotes, 0.1), 1.0)
        : 0.1;

    // 色を決定（男性が優勢なら青、女性が優勢なら赤）
    if (male_votes > female_votes) {
      return `rgba(0, 0, 255, ${intensity})`; // 青（男性が優勢）
    } else if (female_votes > male_votes) {
      return `rgba(255, 0, 0, ${intensity})`; // 赤（女性が優勢）
    } else {
      return "rgba(200, 200, 200, 0.1)"; // グレー（同数の場合）
    }
  };

  // 文字色を決定する関数
  const getTextColor = (votesSummary: {
    male_votes: number;
    female_votes: number;
  }) => {
    const { male_votes, female_votes } = votesSummary;

    // 差を計算
    const totalVotes = male_votes + female_votes;
    const difference = Math.abs(male_votes - female_votes);

    // 差の割合を計算（0.1 以上 1.0 以下に制限）
    const intensity =
      totalVotes > 0
        ? Math.min(Math.max(difference / totalVotes, 0.3), 1.0)
        : 0.1;

    // 色を決定（男性が優勢なら青、女性が優勢なら赤）
    if (male_votes > female_votes) {
      return `rgba(0, 0, 255, ${intensity})`; // 青（男性が優勢）
    } else if (female_votes > male_votes) {
      return `rgba(255, 0, 0, ${intensity})`; // 赤（女性が優勢）
    } else {
      return "rgba(100, 100, 100, 1)"; // グレー（同数の場合）
    }
  };

  useEffect(() => {
    const fetchThreadsTitle = async () => {
      try {
        const response = await axios.get(
          DISCUSSION_THREAD_WEEK_POPULAR_API_URL,
          {}
        );
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
          <div key={index}>
            <Link
              key={thread.id}
              to={`threads/${thread.id}`}
              state={{ thread }}
            >
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
                      {createSinceDate(new Date(thread.created_at))}
                    </div>
                  </div>
                  <div
                    className={styles.threadTitle}
                    style={{
                      color: getTextColor(thread.votes_summary), // 文字色を動的に設定
                    }}
                  >
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

export default WeekPopularTopic;
