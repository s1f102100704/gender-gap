import axios from "axios";

// 環境変数を使って API のベースURLを設定（デフォルトは localhost:3000）
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Axios インスタンスを作成
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
