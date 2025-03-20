import axios from "axios";
import { useEffect, useState } from "react";
import { DISCUSSION_RECOMMEND_API_URL } from "../../../../../config";
import styles from "./recommendTopic.module.css";
import { Link } from "react-router-dom";

const recommendTopic = () => {
    const [recommendThreads, setrecommendThreads] = useState<
        { thread_title: string; id: string; created_at: string; comments_count: number }[]
    >([]);

    useEffect(() => {
        const fetchThreadsTitle = async () => {
            try {
                const response = await axios.get(DISCUSSION_RECOMMEND_API_URL, {});
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

export default recommendTopic;
