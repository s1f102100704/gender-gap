import { useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/sideBar/SideBar";
import AdminThreads from "../Dashboard/adminThreads/AdminThreads";
import { useAdminData } from "../../../hook/adminData/useAdminData";
import styles from "./dashboard.module.css"; // ✅ CSS を追加

const Dashboard = () => {
    const { admin } = useAdminData();
    const location = useLocation(); // ✅ 現在のURLを取得

    return (
        <div className={styles.dashboardContainer}> {/* ✅ Sidebar と Main を並べるコンテナ */}
            <Sidebar admin={admin} />

            <main className={styles.mainContent}> {/* ✅ メインコンテンツ */}
                {location.pathname === "/dashboard/threads" ? (
                    <AdminThreads />
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