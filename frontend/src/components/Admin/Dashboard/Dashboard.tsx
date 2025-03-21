import { useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/sideBar/SideBar";
import AdminThreads from "../Dashboard/adminThreads/AdminThreads";
import AdminRecommendedThreads from "../Dashboard/adminRecommendedThreads/AdminRecommendedThreads";
import AdminPosts from "../Dashboard/adminPosts/AdminPosts";
import { useAdminData } from "../../../hook/adminData/useAdminData";
import styles from "./dashboard.module.css";

const Dashboard = () => {
    const { admin } = useAdminData();
    const location = useLocation();

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar admin={admin} />

            <main className={styles.mainContent}>
                {location.pathname === "/dashboard/threads" ? (
                    <AdminThreads />
                ) : location.pathname === "/dashboard/recommended" ? (
                    <AdminRecommendedThreads />
                ) : location.pathname === "/dashboard/posts" ? (
                    <AdminPosts />
                ) : (
                    <div>
                        <h2>管理者ダッシュボード</h2>
                        {admin ? <p>ようこそ, {admin.email} さん！</p> : <p>データを取得中...</p>}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
