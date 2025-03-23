import axios from "axios";
import { useEffect, useState } from "react";
import { ADMIN_POSTS_REPORT_API_URL, DISCUSSION_THREAD_ADMIN_POSTS_API_URL } from "../../config";
import { Post } from "../../types/post";

export const useAdminReportedPosts = () => {
    const [reportedPosts, setReportedPosts] = useState<Post[]>([]);
    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState("");

    const fetchPosts = async () => {
        try {
            const response = await axios.get(ADMIN_POSTS_REPORT_API_URL);
            setReportedPosts(response.data.data);
        } catch (error) {
            console.error("通報投稿の取得に失敗", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id: string) => {
        const confirmDelete = window.confirm("本当にこの投稿を削除しますか？");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${DISCUSSION_THREAD_ADMIN_POSTS_API_URL}/${id}`);

            if (response.status === 200) {
                alert("投稿が削除されました！");
                fetchPosts();
            } else {
                const errorData = response.data;
                alert(errorData.error || "削除に失敗しました。");
            }
        } catch (err) {
            console.error("投稿削除エラー:", err);
            alert("削除に失敗しました。");
        }
    };

    const filteredAndSortedPosts = reportedPosts
        .filter((post) =>
            post.content.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            console.log("sortKey", sortKey);

            if (sortKey === "reports_count") {
                return (b.reports_count ?? 0) - (a.reports_count ?? 0);
            }

            if (sortKey === "created_at") {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }

            if (sortKey === "updated_at") {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }

            return 0;
        });


    return {
        filteredAndSortedPosts,
        deletePost,
        searchText,
        setSearchText,
        sortKey,
        setSortKey,
    };
};