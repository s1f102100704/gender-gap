import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_RECOMMENDED_API_URL } from "../../config";

export const useAdminRecommendedThreads = () => {
    const [allRecommendedThreads, setAllRecommendedThreads] = useState<
        { thread_title: string; id: string; created_at: number }[]
    >([]);

    const hasFetched = useRef(false);

    // 🔄 おすすめスレッドの取得
    const fetchRecommendedThreads = async () => {
        try {
            const response = await axios.get(DISCUSSION_THREAD_ADMIN_RECOMMENDED_API_URL);
            const threads = response.data.data;
            setAllRecommendedThreads(threads);
        } catch (err) {
            console.error("🔴 おすすめスレッド取得エラー:", err);
        }
    };

    // ❌ おすすめスレッドを一括削除
    const bulkDeleteRecommendedThreads = async (selectedIds: string[]) => {
        if (selectedIds.length === 0) {
            alert("選択されたスレッドがありません！");
            return;
        }

        try {
            const response = await axios.post(`${DISCUSSION_THREAD_ADMIN_RECOMMENDED_API_URL}/bulk-delete`, {
                selectedThreads: selectedIds,
            });

            console.log("✅ 削除成功:", response.data);
            alert("おすすめスレッドが削除されました！");

            // 🔄 最新のデータを取得して更新
            fetchRecommendedThreads();
        } catch (error) {
            console.error("❌ 削除エラー:", error);
            alert("削除に失敗しました。");
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchRecommendedThreads();
    }, []);

    return { allRecommendedThreads, fetchRecommendedThreads, bulkDeleteRecommendedThreads };
};
