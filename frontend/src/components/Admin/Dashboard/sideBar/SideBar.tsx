import React, { useState } from "react";
import styles from "./sideBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { AdminProps } from "../../../../types/user";
import { useAdminData } from "../../../../hook/adminData/useAdminData";

// ✅ Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const SideBar: React.FC<AdminProps> = ({ admin }) => {
    const location = useLocation();
    const { logout } = useAdminData();

    const [openSections, setOpenSections] = useState({
        dashboard: true,
        threads: true,
        posts: true,
        users: true,
    });

    const toggleSection = (key: keyof typeof openSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.dashboardTitle}>
                <span className={styles.dashboardIcon}>🛠️</span> 管理者画面
            </h2>

            <div className={styles.loginCard}>
                {admin ? (
                    <div className={styles.adminInfo}>
                        <p className={styles.adminEmailLabel}>ログイン中</p>
                        <p className={styles.adminEmail}>{admin.email}</p>
                    </div>
                ) : (
                    <p>ログイン情報取得中...</p>
                )}
            </div>

            <ul>
                {/* ダッシュボード */}
                <div className={styles.sectionHeader} onClick={() => toggleSection("dashboard")}>
                    <p className={styles.menuLabel}>ダッシュボード</p>
                    {openSections.dashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {openSections.dashboard && (
                    <li>
                        <Link
                            to="/dashboard"
                            className={location.pathname === "/dashboard" ? styles.active : ""}
                        >
                            <DashboardIcon className={styles.icon} />
                            ホーム
                        </Link>
                    </li>
                )}

                {/* スレッド */}
                <div className={styles.sectionHeader} onClick={() => toggleSection("threads")}>
                    <p className={styles.menuLabel}>スレッド</p>
                    {openSections.threads ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {openSections.threads && (
                    <>
                        <li>
                            <Link
                                to="/dashboard/threads"
                                className={location.pathname === "/dashboard/threads" ? styles.active : ""}
                            >
                                <ForumIcon className={styles.icon} />
                                スレッド管理
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/recommended"
                                className={location.pathname === "/dashboard/recommended" ? styles.active : ""}
                            >
                                <StarIcon className={styles.icon} />
                                おすすめスレッド
                            </Link>
                        </li>
                    </>
                )}

                {/* ポスト */}
                <div className={styles.sectionHeader} onClick={() => toggleSection("posts")}>
                    <p className={styles.menuLabel}>ポスト</p>
                    {openSections.posts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {openSections.posts && (
                    <>
                        <li>
                            <Link
                                to="/dashboard/posts"
                                className={location.pathname === "/dashboard/posts" ? styles.active : ""}
                            >
                                <EditIcon className={styles.icon} />
                                ポスト管理
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/posts/reported"
                                className={location.pathname === "/dashboard/posts/reported" ? styles.active : ""}
                            >
                                <ReportIcon className={styles.icon} />
                                通報ポスト
                            </Link>
                        </li>
                    </>
                )}

                {/* ユーザー */}
                <div className={styles.sectionHeader} onClick={() => toggleSection("users")}>
                    <p className={styles.menuLabel}>ユーザー</p>
                    {openSections.users ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {openSections.users && (
                    <li>
                        <Link
                            to="/settings"
                            className={location.pathname === "/settings" ? styles.active : ""}
                        >
                            <GroupIcon className={styles.icon} />
                            ユーザー管理
                        </Link>
                    </li>
                )}

                {/* ログアウト */}
                <div className={styles.logoutWrapper}>
                    <button onClick={logout} className={styles.logoutButton}>
                        ログアウト
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default SideBar;
