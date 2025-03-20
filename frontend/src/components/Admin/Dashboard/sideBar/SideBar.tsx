import React from "react";
import styles from "./sideBar.module.css";
interface AdminProps {
    admin: {
        email: string;
    } | null;
}

const SideBar: React.FC<AdminProps> = ({ admin }) => {
    return (
        <div className={styles.sidebar}>

            <h2>管理者ダッシュボード</h2>
            <div className={styles.columContainer}>
                {admin ? <p>ログイン中: {admin.email}</p> : <p>ログイン情報取得中...</p>}
            </div><div className={styles.columContainer}>
                <ul>
                    <li>
                        <a href="/dashboard" className="active">
                            ホーム
                        </a>
                    </li>
                    <li>
                        <a href="/users">
                            ユーザー管理
                        </a>
                    </li>
                    <li>
                        <a href="/settings">
                            設定
                        </a>
                    </li>
                    <li>
                        <a href="/logout">
                            ログアウト
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;