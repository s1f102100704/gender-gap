import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ADMIN_USER_API_URL } from "../../../src/config";

interface Admin {
    email: string;
}

export const useAdminData = () => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const navigate = useNavigate();

    // ✅ トークンを取得する関数
    const getToken = () => {
        return localStorage.getItem("token");
    };

    // ✅ ログアウト処理
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin");
    };

    useEffect(() => {
        const fetchAdmin = async () => {
            const token = getToken();
            if (!token) {
                navigate("/admin");
                return;
            }

            try {
                const response = await fetch(`${LOGIN_ADMIN_USER_API_URL}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });


                const data = await response.json();
                if (data.error) {
                    logout();
                } else {
                    setAdmin(data);
                }
            } catch (err) {
                console.error("エラー:", err);
                logout();
            }
        };

        fetchAdmin();
    }, [navigate]);

    return { admin, logout };
};
