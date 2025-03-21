import { useEffect, useState } from "react";
import { useAdminPosts } from "../../../../hook/adminData/useAdminPosts";
import styles from "./adminPosts.module.css";
import { Link } from "react-router-dom";
import { Post } from "../../../../types/post";

const AdminPostsList = () => {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const { allAdminPosts, deletePost, updatePostTitle } = useAdminPosts();

    const [editMode, setEditMode] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>("");

    useEffect(() => {
        setAllPosts(allAdminPosts);
    }, [allAdminPosts]);

    const handleEdit = (id: string, title: string) => {
        setEditMode(id);
        setNewTitle(title);
    };

    const handleSave = async (id: string) => {
        if (!newTitle.trim()) return;

        try {
            await updatePostTitle(id, newTitle);
            setAllPosts((prev) =>
                prev.map((post) =>
                    post.id === id ? { ...post, post_title: newTitle } : post
                )
            );
            setEditMode(null);
        } catch (error) {
            console.error("タイトル更新エラー:", error);
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
                <span className={styles.threadActions}>操作</span>
            </div>

            {allPosts.map((post) => (
                <div key={post.id} className={styles.threadRow}>
                    <span className={styles.threadId} title={post.id}>
                        {post.id.length > 15 ? `${post.id.slice(0, 12)}...` : post.id}
                    </span>
                    <span className={styles.threadContent}>
                        {post.content.length > 30 ? post.content.slice(0, 30) + "…" : post.content}
                    </span>

                    <span className={styles.threadDate}>
                        {new Date(post.created_at).toLocaleString()}
                    </span>

                    <span className={styles.threadMeta}>
                        {post.gender === 1 ? "男性" : post.gender === 2 ? "女性" : "その他"}
                    </span>

                    <span className={styles.threadMeta}>
                        {post.discussion_thread_id}
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
                                <button className={styles.actionButton} onClick={() => handleEdit(post.id!, post.post_title || "")}>編集</button>
                                <button className={styles.deleteButton} onClick={() => deletePost(post.id)}>削除</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPostsList;
