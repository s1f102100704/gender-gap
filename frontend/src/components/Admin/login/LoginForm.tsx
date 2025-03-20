// src/components/LoginForm.jsx
import { useState } from "react";
// import { login } from "../api";
// import { saveToken } from "../auth";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        // try {
        //     const { token } = await login(email, password);
        //     saveToken(token);
        //     navigate("/dashboard");
        // } catch (err) {
        //     setError("ログインに失敗しました。");
        // }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.loginTitle}>管理者ログイン</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="メール" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default LoginForm;
