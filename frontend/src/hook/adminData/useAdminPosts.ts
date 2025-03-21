import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_POSTS_API_URL } from "../../config";
import { Post } from "../../types/post";

export const useAdminPosts = () => {
    const [allAdminPosts, setAllAdminPosts] = useState<Post[]>([]);
    const hasFetched = useRef(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(DISCUSSION_THREAD_ADMIN_POSTS_API_URL);
            const posts = response.data.data;
            console.log(posts);
            setAllAdminPosts(posts);
        } catch (err) {
            console.log("🔴 投稿取得エラー:", err);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
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

    const updatePostContent = async (id: string, newContent: string) => {
        try {
            await axios.put(`${DISCUSSION_THREAD_ADMIN_POSTS_API_URL}/${id}`, {
                postContent: newContent,
            });
            fetchPosts();
        } catch (err) {
            console.error("投稿内容の更新エラー:", err);
            throw err;
        }
    };

    return { allAdminPosts, deletePost, updatePostContent };
};