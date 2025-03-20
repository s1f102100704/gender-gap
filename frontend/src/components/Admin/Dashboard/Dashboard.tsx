import axios from "axios";
import { useState } from "react";
import { LOGIN_API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

const Dashbord = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.loginTitle}>Dashbord</h2>
        </div>
    );
};

export default Dashbord;
