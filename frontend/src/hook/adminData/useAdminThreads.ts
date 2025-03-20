import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_API_URL } from "../../config";

export const useAdminThreads = () => {
    const [allAdminThreads, setAllAdminThreads] = useState<
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
                setAllAdminThreads(threadTitle);
            } catch (err) {
                console.log("🔴 スレッド取得エラー:", err);
            }
        };
        fetchThreadsTitle();
    }, []);

    const deleteThread = async (id: string) => {
        const confirmDelete = window.confirm("本当にこのスレッドを削除しますか？");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${DISCUSSION_THREAD_ADMIN_API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAllAdminThreads(prevThreads => prevThreads.filter(thread => thread.id !== id));
                alert("スレッドが削除されました！");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "削除に失敗しました。");
            }
        } catch (err) {
            console.error("スレッド削除エラー:", err);
            alert("削除に失敗しました。");
        }
    };

    return { allAdminThreads, deleteThread };
};
