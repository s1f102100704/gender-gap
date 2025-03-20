import { useEffect, useState } from "react";
import { useAdminRecommendedThreads } from "../../../../hook/adminData/useAdminRecommendedThreads";
import styles from "./adminRecommendedThreads.module.css";
import { Link } from "react-router-dom";

interface Thread {
    id?: string;
    thread_title: string;
    created_at: number;
}

const AdminRecommendedThreads = () => {
    const [recommendedThreads, setRecommendedThreads] = useState<Thread[]>([]);
    const { allRecommendedThreads } = useAdminRecommendedThreads();

    // ✅ チェックされたスレッドの状態を管理
    const [selectedThreads, setSelectedThreads] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (allRecommendedThreads.length > 0 && recommendedThreads.length === 0) {
            setRecommendedThreads(allRecommendedThreads);
        }
    }, [allRecommendedThreads]);

    // ✅ チェックボックスの変更を処理
    const handleCheckboxChange = (id: string | undefined) => {
        if (!id) return;
        setSelectedThreads((prev) => ({
            ...prev,
            [id]: !prev[id], // チェックの ON/OFF を切り替え
        }));
    };

    return (
        <div className={styles.threadContainer}>
            {/* ✅ ヘッダーにチェックボックスを追加 */}
            <div className={styles.threadHeader}>
                {recommendedThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                <span className={styles.threadTitle}>スレッド名</span>
                <span className={styles.threadDate}>作成日時</span>
                <span className={styles.threadCheckbox}>✔</span>
            </div>

            {/* ✅ 各行にチェックボックスを追加 */}
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
                        className={styles.checkbox}
                    />
                </div>
            ))}
        </div>
    );
};

export default AdminRecommendedThreads;
