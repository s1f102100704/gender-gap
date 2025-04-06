import styles from "./kaitenSushi.module.css";
import icon from '@assets/icon.svg';
import axios from "axios";
import { useEffect, useState } from "react";
import { Thread } from "../../../types/thread";
import { Link } from "react-router-dom";
import { DISCUSSION_THREAD_WEEK_POPULAR_API_URL } from "../../../config";

const KaitenSushi = () => {
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

  useEffect(() => {
      const fetchThreadsTitle = async () => {
        try {
          const response = await axios.get(
            DISCUSSION_THREAD_WEEK_POPULAR_API_URL,
            {}
          );
          console.log(response.data.data);
          //上から順に取得しているので、最初の6件を取得
          const threads = response.data.data.slice(0, 6);
          setWeekPopularThreads(threads);
        } catch (err) {
          console.log(err);
        }
      };
      fetchThreadsTitle();
    }, []);
  

  
  return (
    <div className={styles.kaitenzushi}>
      <div className={styles.kaiten}>
        <div className={styles.spin}>
        <ul className={styles.sushi}>
          {weekPopularThreads.map((thread, index) => (
            <li key={index}>
              <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
                <div className={styles.conter}>
                <img src={icon}></img>
                  {thread.thread_title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.sushi}>
          {weekPopularThreads.map((thread, index) => (
            <li key={index}>
              <Link key={thread.id} to={`threads/${thread.id}`} state={thread}>
                <div className={styles.conter}>
                <img src={icon}></img>
                  {thread.thread_title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default KaitenSushi;
