import { useLocation, useMatch } from "react-router-dom";
import Sidebar from "../Dashboard/sideBar/SideBar";
import AdminThreads from "../Dashboard/adminThreads/AdminThreads";
import AdminRecommendedThreads from "../Dashboard/adminRecommendedThreads/AdminRecommendedThreads";
import AdminPosts from "../Dashboard/adminPosts/AdminPosts";
import AdminPostsReported from "../Dashboard/adminPostsReported/AdminPostsReported";
import ReportedPostDetail from "./adminPostsReported/reportList/ReportedPostDetail";
import { useAdminData } from "../../../hook/adminData/useAdminData";
import styles from "./dashboard.module.css";

const Dashboard = () => {
    const { admin } = useAdminData();
    const location = useLocation();
    const matchReportedDetail = useMatch("/dashboard/posts/reported/:postId");

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar admin={admin} />

            <main className={styles.mainContent}>
                {matchReportedDetail ? (
                    <ReportedPostDetail />
                ) : location.pathname === "/dashboard/threads" ? (
                    <AdminThreads />
                ) : location.pathname === "/dashboard/recommended" ? (
                    <AdminRecommendedThreads />
                ) : location.pathname === "/dashboard/posts" ? (
                    <AdminPosts />
                ) : location.pathname === "/dashboard/posts/reported" ? (
                    <AdminPostsReported />
                ) : (
                    <div>
                        <h2>管理者ダッシュボード</h2>
                        {admin ? (
                            <p>ようこそ, {admin.email} さん！</p>
                        ) : (
                            <p>データを取得中...</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
