import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_RECOMMENDED_API_URL } from "../../config";

export const useAdminRecommendedThreads = () => {
    const [allRecommendedThreads, setAllRecommendedThreads] = useState<
        { thread_title: string; id: string; created_at: number }[]
    >([]);

    const hasFetched = useRef(false);

    const fetchRecommendedThreads = async () => {
        try {
            const response = await axios.get(DISCUSSION_THREAD_ADMIN_RECOMMENDED_API_URL);
            const threads = response.data.data;
            setAllRecommendedThreads(threads);
        } catch (err) {
            console.log("🔴 おすすめスレッド取得エラー:", err);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchRecommendedThreads();
    }, []);

    return { allRecommendedThreads };
};
