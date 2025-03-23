import { useState } from "react";
import styles from "./adminPostsReported.module.css";
import { Link } from "react-router-dom";
import { useAdminReportedPosts } from "../../../../hook/adminData/useAdminReportedPosts";
import commmonStyles from "../../../../styles/admin/mainContainer.module.css";
import ReportedPostControls from "./reportedPostControls/ReportedPostControls";
import { usePageControls } from "../../../../hook/pageControls/usePageControls";
import Pagination from "../../../../common/pagination/Pagination";

const AdminPostsReported = () => {
    const [editMode, setEditMode] = useState<string | null>(null);
    const [newContent, setNewContent] = useState<string>("");
    const {
        filteredAndSortedPosts,
        deletePost,
        searchText,
        setSearchText,
        sortKey,
        setSortKey
    } = useAdminReportedPosts();

    const {
        currentPage,
        setCurrentPage,
        currentItems,
        totalPages,
    } = usePageControls(filteredAndSortedPosts, 13);

    return (
        <div className={commmonStyles.parentWrapper}>
            <div className={commmonStyles.controller}>
                <h1 className={styles.title}>通報された投稿</h1>
                <div className={commmonStyles.postControls}>
                    <ReportedPostControls
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
                        <span className={styles.threadMeta}>通報数</span>
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
                                    rows={2} />
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
                                className={`${styles.threadMeta} ${post.reports_count && post.reports_count > 5 ? styles.warning : ""}`}
                            >
                                {post.reports_count ?? 0}
                            </span>

                            <div className={styles.threadActions}>
                                <>
                                    <Link
                                        to={`/dashboard/posts/reported/${post.id}`}
                                        className={styles.actionButton}
                                    >
                                        詳細
                                    </Link>
                                    <button className={styles.deleteButton} onClick={() => deletePost(post.id)}>
                                        削除
                                    </button>
                                </>
                            </div>
                        </div>
                    ))}
                </div></div>
        </div>
    );
};

export default AdminPostsReported;
