import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

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
        <div>
            <h1>ユーザー一覧</h1>
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
