import { useEffect, useState } from "react";
import { useAdminRecommendedThreads } from "../../../../hook/adminData/useAdminRecommendedThreads";
import { useCheckbox } from "../../../../hook/checkbox/useCheckbox";
import styles from "./adminRecommendedThreads.module.css";
import { Link } from "react-router-dom";

interface Thread {
    id?: string;
    thread_title: string;
    created_at: number;
}

const AdminRecommendedThreads = () => {
    const { allRecommendedThreads, bulkDeleteRecommendedThreads, bulkAddRecommendedThreads } = useAdminRecommendedThreads();
    const { selectedThreads, handleCheckboxChange, handleDelete
    } = useCheckbox(bulkDeleteRecommendedThreads, bulkAddRecommendedThreads);

    const [recommendedThreads, setRecommendedThreads] = useState<Thread[]>([]);

    useEffect(() => {
        setRecommendedThreads(allRecommendedThreads);
    }, [allRecommendedThreads]);

    return (
        <><div className={styles.threadContainer}>
            <div className={styles.threadHeader}>
                {recommendedThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                <span className={styles.threadTitle}>スレッド名</span>
                <span className={styles.threadDate}>作成日時</span>
                <span className={styles.threadCheckbox}>✔</span>
            </div>

            {recommendedThreads.map((thread) => (
                <div key={thread.id || thread.thread_title} className={styles.threadRow}>
                    {thread.id && (
                        <span className={styles.threadId} title={thread.id}>
                            {thread.id.length > 15 ? `${thread.id.slice(0, 12)}...` : thread.id}
                        </span>
                    )}
                    <Link to={`/threads/${thread.id}`} state={thread} className={styles.threadTitle}>
                        {thread.thread_title}
                    </Link>
                    <span className={styles.threadDate}>{new Date(thread.created_at).toLocaleString()}</span>
                    <input
                        type="checkbox"
                        checked={!!selectedThreads[thread.id!]}
                        onChange={() => handleCheckboxChange(thread.id)}
                        className={styles.checkbox} />
                </div>
            ))}
        </div><button onClick={handleDelete} className={styles.submitButton}>
                選択したスレッドを削除
            </button></>
    );
};

export default AdminRecommendedThreads;
