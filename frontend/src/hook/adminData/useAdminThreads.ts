import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_API_URL } from "../../config";

export const useAdminThreads = () => {
    const [allAdminThreads, setallAdminThreads] = useState<
        { thread_title: string; id: string; created_at: number }[]
    >([]);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchThreadsTitle = async () => {
            try {
                const response = await axios.get(DISCUSSION_THREAD_ADMIN_API_URL, {});
                const threadTitle = response.data.data;
                setallAdminThreads(threadTitle);
            } catch (err) {
                console.log("🔴 スレッド取得エラー:", err);
            }
        };

        fetchThreadsTitle();
    }, []);

    return { allAdminThreads };
};
