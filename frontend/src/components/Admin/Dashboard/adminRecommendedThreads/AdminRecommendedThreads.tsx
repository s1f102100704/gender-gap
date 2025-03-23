import { useEffect, useState } from "react";
import { useAdminRecommendedThreads } from "../../../../hook/adminData/useAdminRecommendedThreads";
import { useCheckbox } from "../../../../hook/checkbox/useCheckbox";
import styles from "./adminRecommendedThreads.module.css";
import RecommendThreadsControls from "../adminRecommendedThreads/RecommendthreadsControls/RecommendThreadsControls"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { Thread } from "../../../../types/thread";
import commmonStyles from "../../../../styles/admin/mainContainer.module.css";
import Pagination from "../../../../common/pagination/Pagination";
import { usePageControls } from "../../../../hook/pageControls/usePageControls";

const AdminRecommendedThreads = () => {
    const { allRecommendedThreads, bulkDeleteRecommendedThreads, bulkAddRecommendedThreads, filteredAndSortedRecommendThreads, sortKey, searchText, setSearchText, setSortKey } = useAdminRecommendedThreads();
    const { selectedThreads, handleCheckboxChange, handleDelete
    } = useCheckbox(bulkDeleteRecommendedThreads, bulkAddRecommendedThreads);

    const [recommendedThreads, setRecommendedThreads] = useState<Thread[]>([]);

    useEffect(() => {
        setRecommendedThreads(allRecommendedThreads);
    }, [allRecommendedThreads]);

    const {
        currentPage,
        setCurrentPage,
        currentItems,
        totalPages,
    } = usePageControls(filteredAndSortedRecommendThreads, 13);


    return (
        <div className={commmonStyles.parentWrapper}>
            <div className={commmonStyles.controller}>
                <h1 className={styles.title}>スレッド一覧管理</h1>
                <div className={styles.postControls}>
                    <RecommendThreadsControls
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

                <><div className={commmonStyles.threadContainer}>
                    <div className={commmonStyles.threadHeader}>
                        {recommendedThreads.some(thread => thread.id) && <span className={styles.threadId}>ID</span>}
                        <span className={styles.threadTitle}>スレッド名</span>
                        <span className={styles.threadDate}>作成日時</span>
                        <span className={styles.threadCheckbox}>おすすめ削除
                        </span>
                    </div>

                    {currentItems.map((thread) => (
                        <div key={thread.id || thread.thread_title} className={commmonStyles.threadRow}>
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
            </div>
        </div >
    );
};

export default AdminRecommendedThreads;
