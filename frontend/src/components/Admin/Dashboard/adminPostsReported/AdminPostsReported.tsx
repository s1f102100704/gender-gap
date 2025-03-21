import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./adminPostsReported.module.css";
import { Link } from "react-router-dom";
import { Post } from "../../../../types/post";
import { ADMIN_POSTS_REPORT_API_URL } from "../../../../config";
import { useAdminPosts } from "../../../../hook/adminData/useAdminPosts";

const AdminPostsReported = () => {
    const [reportedPosts, setReportedPosts] = useState<Post[]>([]);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [newContent, setNewContent] = useState<string>("");

    const { deletePost, updatePostContent } = useAdminPosts();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(ADMIN_POSTS_REPORT_API_URL);
                console.log(res.data.data);
                setReportedPosts(res.data.data);
            } catch (e) {
                console.error("通報投稿の取得に失敗", e);
            }
        };

        fetch();
    }, []);

    const handleSave = async (id: string) => {
        if (!newContent.trim()) return;

        try {
            await updatePostContent(id, newContent);
            setEditMode(null);

            // 保存後、一覧を更新（または該当項目だけ置き換えてもOK）
            const res = await axios.get(ADMIN_POSTS_REPORT_API_URL);
            setReportedPosts(res.data.data);
        } catch (error) {
            console.error("更新エラー:", error);
        }
    };

    return (
        <div className={styles.threadContainer}>
            <div className={styles.threadHeader}>
                <span className={styles.threadId}>ID</span>
                <span className={styles.threadContent}>内容</span>
                <span className={styles.threadDate}>作成日時</span>
                <span className={styles.threadMeta}>性別</span>
                <span className={styles.threadMeta}>スレッドID</span>
                <span className={styles.threadMeta}>通報数</span>
                <span className={styles.threadActions}>操作</span>
            </div>

            {reportedPosts.map((post) => (
                <div key={post.id} className={styles.threadRow}>
                    <span className={styles.threadId} title={post.id}>
                        {post.id.length > 15 ? `${post.id.slice(0, 12)}...` : post.id}
                    </span>

                    {editMode === post.id ? (
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className={styles.editTextarea}
                            rows={2}
                        />
                    ) : (
                        <span className={styles.threadContent}>
                            {post.content.length > 30 ? post.content.slice(0, 30) + "…" : post.content}
                        </span>
                    )}

                    <span className={styles.threadDate}>
                        {new Date(post.created_at).toLocaleString()}
                    </span>

                    <span className={styles.threadMeta}>
                        {post.gender === 1 ? "男性" : post.gender === 2 ? "女性" : "その他"}
                    </span>

                    <span className={styles.threadMeta}>
                        {post.discussion_thread_id}
                    </span>

                    <span
                        className={`${styles.threadMeta} ${post.reports_count && post.reports_count > 5 ? styles.warning : ""
                            }`}
                    >
                        {post.reports_count ?? 0}
                    </span>

                    <div className={styles.threadActions}>
                        {editMode === post.id ? (
                            <>
                                <button className={styles.actionButton} onClick={() => handleSave(post.id!)}>保存</button>
                                <button className={styles.cancelButton} onClick={() => setEditMode(null)}>キャンセル</button>
                            </>
                        ) : (
                            <>
                                <Link to={`/posts/${post.id}`} className={styles.actionButton}>詳細</Link>
                                <button className={styles.deleteButton} onClick={() => deletePost(post.id)}>
                                    削除
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPostsReported;
