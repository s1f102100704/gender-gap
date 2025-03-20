import axios from "axios";
import { useState } from "react";
import { LOGIN_API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${LOGIN_API_URL}`, { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError("ログインに失敗しました。");
            console.error(err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.loginTitle}>管理者ログイン</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="メール"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.loginInput}
                    />
                    <button type="submit" className={styles.loginButton}>ログイン</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
