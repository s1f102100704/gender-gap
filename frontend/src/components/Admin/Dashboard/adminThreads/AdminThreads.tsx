import { useEffect, useState } from "react";
import { useAdminThreads } from "../../../../hook/adminData/useAdminThreads";
import styles from "./adminThreads.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Thread {
    id?: string;
    thread_title: string;
    created_at: number;
}

const AdminThreads = () => {
    const [allThreads, setAllThreads] = useState<Thread[]>([]);
    const { allAdminThreads, deleteThread } = useAdminThreads();
    const navigate = useNavigate();

    useEffect(() => {
        if (allAdminThreads.length > 0 && allThreads.length === 0) {
            setAllThreads(allAdminThreads);
        }
    }, [allAdminThreads]);

    return (
        <div className={styles.threadContainer}>
            <div className={styles.threadHeader}>
                {allThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                <span className={styles.threadTitle}>スレッド名</span>
                <span className={styles.threadDate}>作成日時</span>
                <span className={styles.threadActions}>操作</span>
            </div>

            {allThreads.map((thread) => (
                <div key={thread.id || thread.thread_title} className={styles.threadRow}>
                    {thread.id && (
                        <span className={styles.threadId} title={thread.id}>
                            {thread.id.length > 15 ? `${thread.id.slice(0, 12)}...` : thread.id}
                        </span>
                    )}
                    <span className={styles.threadTitle}>{thread.thread_title}</span>
                    <span className={styles.threadDate}>{new Date(thread.created_at).toLocaleString()}</span>

                    <div className={styles.threadActions}>
                        <Link to={`/threads/${thread.id}`} className={styles.actionButton}>詳細</Link>
                        <button className={styles.actionButton} onClick={() => navigate(`/dashboard/threads/${thread.id}/edit`)}>編集</button>
                        <button className={styles.deleteButton} onClick={() => thread.id && deleteThread(thread.id)}>削除</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminThreads;
