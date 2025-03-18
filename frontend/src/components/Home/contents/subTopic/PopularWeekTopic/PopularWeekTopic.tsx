import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_THREAD_WEEK_POPULAR_API_URL } from "../../../../../config";
import styles from "./popularWeekTopic.module.css";
import { Link } from "react-router-dom";
const popularWeekTopic = () => {
    const [popularWeekThreads, setPopularWeekThreads] = useState<
        { thread_title: string; id: string; created_at: number }[]
    >([]);
    useEffect(() => {
        const fetchThreadsPopularWeekTitle = async () => {
            try {
                const response = await axios.get(DISCUSSION_THREAD_WEEK_POPULAR_API_URL, {});
                const threadTitle = response.data.data;
                setPopularWeekThreads(threadTitle);
            } catch (err) {
                console.log(err);
            }
        };
        fetchThreadsPopularWeekTitle();
    }, []);
    return (
        <>
            {popularWeekThreads.map((thread, index) => (
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

export default popularWeekTopic;
