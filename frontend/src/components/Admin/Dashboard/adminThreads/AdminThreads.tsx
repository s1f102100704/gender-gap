import { useEffect, useState } from "react";
import { useAdminThreads } from "../../../../hook/adminData/useAdminThreads";
import styles from "./adminThreads.module.css";
import { Link } from "react-router-dom";

interface Thread {
    id?: string;
    thread_title: string;
    created_at: string;
    author: string;
}

const AdminThreads = () => {
    const [allThreads, setAllThreads] = useState<Thread[]>([]);
    const { allAdminThreads } = useAdminThreads();

    useEffect(() => {
        if (allAdminThreads.length > 0 && allThreads.length === 0) {
            setAllThreads(allAdminThreads);
        }
    }, [allAdminThreads]);

    return (
        <div className={styles.threadContainer}>
            {/* ✅ ヘッダーを追加 */}
            <div className={styles.threadHeader}>
                {allThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                <span className={styles.threadTitle}>スレッド名</span>
                <span className={styles.threadDate}>作成日時</span>
            </div>

            {/* ✅ スレッドリスト */}
            {allThreads.map((thread) => (
                <Link key={thread.id || thread.thread_title} to={`/threads/${thread.id}`} state={thread} className={styles.threadRow}>
                    {thread.id && (
                        <span className={styles.threadId} title={thread.id}> {/* ✅ `title` にフルIDを表示 */}
                            {thread.id.length > 15 ? `${thread.id.slice(0, 12)}...` : thread.id} {/* ✅ 省略ルール */}
                        </span>
                    )}
                    <span className={styles.threadTitle}>{thread.thread_title}</span>
                    <span className={styles.threadDate}>{new Date(thread.created_at).toLocaleString()}</span>
                </Link>
            ))}
        </div>
    );
};

export default AdminThreads;