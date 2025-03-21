import React from "react";
import styles from "./sideBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { AdminProps } from "../../../../types/user";

const SideBar: React.FC<AdminProps> = ({ admin }) => {
    const location = useLocation(); // ✅ 現在の URL を取得

    return (
        <div className={styles.sidebar}>
            <h2>管理者ダッシュボード</h2>
            <div className={styles.columContainer}>
                {admin ? <p>ログイン中: {admin.email}</p> : <p>ログイン情報取得中...</p>}
            </div>

            <div className={styles.columContainer}>
                <ul>
                    <li>
                        <Link
                            to="/dashboard"
                            className={location.pathname === "dashboard" ? styles.active : ""}
                        >
                            ホーム
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/threads"
                            className={location.pathname === "/dashboard/threads" ? styles.active : ""}
                        >
                            スレッド管理
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/recommended"
                            className={location.pathname === "/dashboard/recommended" ? styles.active : ""}
                        >
                            おすすめスレッド管理
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/posts"
                            className={location.pathname === "/dashboard/posts" ? styles.active : ""}
                        >
                            ポスト管理
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/posts/reported"
                            className={location.pathname === "/dashboard/posts/reported" ? styles.active : ""}
                        >
                            レポートポスト管理
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className={location.pathname === "/settings" ? styles.active : ""}
                        >
                            ユーザー管理
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className={location.pathname === "/logout" ? styles.active : ""}
                        >
                            ログアウト
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
