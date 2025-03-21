import { useEffect, useState } from "react";
import { useAdminThreads } from "../../../../hook/adminData/useAdminThreads";
import { useCheckbox } from "../../../../hook/checkbox/useCheckbox";
import styles from "./adminThreads.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAdminRecommendedThreads } from "../../../../hook/adminData/useAdminRecommendedThreads";
import { Thread } from "../../../../types/thread";

const AdminThreads = () => {
    const [allThreads, setAllThreads] = useState<Thread[]>([]);
    const { allAdminThreads, deleteThread, updateThreadTitle } = useAdminThreads();
    const { bulkDeleteRecommendedThreads, bulkAddRecommendedThreads } = useAdminRecommendedThreads();

    const [editMode, setEditMode] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>("");

    const { selectedThreads, handleCheckboxChange, handleAdd } = useCheckbox(
        bulkDeleteRecommendedThreads, // ✅ 削除用
        bulkAddRecommendedThreads // ✅ 追加用
    );

    useEffect(() => {
        setAllThreads(allAdminThreads);
    }, [allAdminThreads]);

    const handleEdit = (id: string, title: string) => {
        setEditMode(id);
        setNewTitle(title);
    };

    const handleSave = async (id: string) => {
        if (!newTitle.trim()) return;

        try {
            await updateThreadTitle(id, newTitle);
            setAllThreads((prev) =>
                prev.map((thread) =>
                    thread.id === id ? { ...thread, thread_title: newTitle } : thread
                )
            );
            setEditMode(null);
        } catch (error) {
            console.error("タイトル更新エラー:", error);
        }
    };

    return (
        <><div className={styles.threadContainer}>
            <div className={styles.threadHeader}>
                {allThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                <span className={styles.threadTitle}>スレッド名</span>
                <span className={styles.threadDate}>作成日時</span>
                <span className={styles.threadActions}>操作</span>
                <span className={styles.threadCheckbox}>おすすめ追加</span>
            </div>

            {allThreads.map((thread) => (
                <div key={thread.id || thread.thread_title} className={styles.threadRow}>
                    {thread.id && (
                        <span className={styles.threadId} title={thread.id}>
                            {thread.id.length > 15 ? `${thread.id.slice(0, 12)}...` : thread.id}
                        </span>
                    )}
                    {editMode === thread.id ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className={styles.editInput} />
                    ) : (
                        <span className={styles.threadTitle}>{thread.thread_title}</span>
                    )}
                    <span className={styles.threadDate}>{new Date(thread.created_at).toLocaleString()}</span>

                    <div className={styles.threadActions}>
                        {editMode === thread.id ? (
                            <>
                                <button className={styles.actionButton} onClick={() => handleSave(thread.id!)}>保存</button>
                                <button className={styles.cancelButton} onClick={() => setEditMode(null)}>キャンセル</button>
                            </>
                        ) : (
                            <>
                                <Link to={`/threads/${thread.id}`} className={styles.actionButton}>詳細</Link>
                                <button className={styles.actionButton} onClick={() => handleEdit(thread.id!, thread.thread_title)}>編集</button>
                                <button className={styles.deleteButton} onClick={() => thread.id && deleteThread(thread.id)}>削除</button>
                            </>
                        )}
                    </div>

                    {/* ✅ おすすめスレッド追加のチェックボックス */}
                    <input
                        type="checkbox"
                        checked={!!selectedThreads[thread.id!]}
                        onChange={() => handleCheckboxChange(thread.id)}
                        className={styles.checkbox} />
                </div>
            ))}
        </div><button onClick={handleAdd} className={styles.submitButton}>
                選択したスレッドをおすすめに追加
            </button></>
    );
};

export default AdminThreads;
