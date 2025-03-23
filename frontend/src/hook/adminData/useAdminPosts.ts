import axios from "axios";
import { useEffect, useState } from "react";
import { ADMIN_POSTS_REPORT_API_URL } from "../../config";
import { Post } from "../../types/post";

export const useAdminPosts = () => {
    const [reportedPosts, setReportedPosts] = useState<Post[]>([]);
    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(ADMIN_POSTS_REPORT_API_URL);
                setReportedPosts(response.data.data);
            } catch (error) {
                console.error("通報投稿の取得に失敗", error);
            }
        };

        fetchPosts();
    }, []);

    const deletePost = async (id: string) => {
        const confirm = window.confirm("本当にこの投稿を削除しますか？");
        if (!confirm) return;

        try {
            await axios.delete(`${ADMIN_POSTS_REPORT_API_URL}/${id}`);
            alert("投稿が削除されました");
            // 再取得
            const res = await axios.get(ADMIN_POSTS_REPORT_API_URL);
            setReportedPosts(res.data.data);
        } catch (error) {
            console.error("削除エラー", error);
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
