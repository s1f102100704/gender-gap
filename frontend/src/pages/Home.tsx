import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import styles from "./home.module.css"
import Header from "../components/header/Header";

const Home = () => {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        getUsers()
            .then((data) => {
                console.log("APIレスポンス:", data);
                setUsers(data);
            })
            .catch((error) => console.error("APIエラー:", error));
    }, []);

    return (
        <div className={styles.body}>
            <Header/>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => <li key={user.id}>{user.name}</li>)
                ) : (
                    <p>ユーザーを取得中...</p>
                )}
            </ul>
        </div>
    );
};

export default Home;
