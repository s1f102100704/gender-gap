import { useEffect, useState } from "react";
import { useAdminPosts } from "../../../../hook/adminData/useAdminPosts";
import styles from "./adminPosts.module.css";
import { Link } from "react-router-dom";
import { Post } from "../../../../types/post";
import commmonStyles from "../../../../styles/admin/mainContainer.module.css";
import Pagination from "../../../../common/pagination/Pagination";
import { usePageControls } from "../../../../hook/pageControls/usePageControls";
import PostControls from "./postControls/PostControls";

const AdminPostsList = () => {
    const [allPosts, setAllPostsPosts] = useState<Post[]>([]);
    const [newContent, setNewContent] = useState<string>("");
    const [editMode, setEditMode] = useState<string | null>(null);

    const handleEdit = (id: string, content: string) => {
        setEditMode(id);
        setNewContent(content);
    };

    const {
        filteredAndSortedPosts,
        updatePostContent,
        searchText,
        setSearchText,
        sortKey,
        setSortKey,
        deletePost
    } = useAdminPosts();

    const {
        currentPage,
        setCurrentPage,
        currentItems,
        totalPages,
    } = usePageControls(filteredAndSortedPosts, 13);

    useEffect(() => {
        setAllPostsPosts(allPosts);
    }, [allPosts]);

    const handleSave = async (id: string) => {
        if (!newContent.trim()) return;

        try {
            await updatePostContent(id, newContent);
            setEditMode(null);
        } catch (error) {
            console.error("更新エラー:", error);
        }
    };

    return (
        <div className={commmonStyles.parentWrapper}>
            <div className={commmonStyles.controller}>
                <h1 className={styles.title}>投稿一覧管理</h1>
                <div className={styles.postControls}>
                    <PostControls
                        searchText={searchText}
                        setSearchText={setSearchText}
                        sortKey={sortKey}
                        setSortKey={setSortKey} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />

                </div>
                <div className={commmonStyles.threadContainer}>

                    <div className={commmonStyles.threadHeader}>
                        <span className={styles.threadId}>ID</span>
                        <span className={styles.threadContent}>内容</span>
                        <span className={styles.threadDate}>作成日時</span>
                        <span className={styles.threadMeta}>性別</span>
                        <span className={styles.threadMeta}>スレッドID</span>
                        <span className={styles.threadActions}>操作</span>
                    </div>

                    {currentItems.map((post) => (
                        <div key={post.id} className={commmonStyles.threadRow}>
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

                            <div className={styles.threadActions}>
                                {editMode === post.id ? (
                                    <>
                                        <button className={styles.actionButton} onClick={() => handleSave(post.id!)}>保存</button>
                                        <button className={styles.cancelButton} onClick={() => setEditMode(null)}>キャンセル</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to={`/posts/${post.id}`} className={styles.actionButton}>詳細</Link>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => handleEdit(post.id!, post.content)}
                                        >
                                            編集
                                        </button>

                                        <button className={styles.deleteButton} onClick={() => deletePost(post.id)}>削除</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminPostsList;
