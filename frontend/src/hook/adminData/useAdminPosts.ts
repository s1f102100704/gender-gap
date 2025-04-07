import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ADMIN_POSTS_REPORT_API_URL,
  DISCUSSION_THREAD_ADMIN_POSTS_API_URL,
} from "../../config";
import { AdminPost } from "../../types/post";

export const useAdminPosts = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("");
  const hasFetched = useRef(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(DISCUSSION_THREAD_ADMIN_POSTS_API_URL, {
        headers: {
          Accept: "application/json",
        },
      });
      const posts = response.data.data;
      console.log(posts);
      setPosts(posts);
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
      const response = await axios.delete(
        `${DISCUSSION_THREAD_ADMIN_POSTS_API_URL}/${id}`
      );

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
        content: newContent,
      });
      fetchPosts();
    } catch (err) {
      console.error("投稿内容の更新エラー:", err);
      throw err;
    }
  };

  const filteredAndSortedPosts = posts
    .filter((post) =>
      post.content.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "reports_count") {
        return (b.reports_count ?? 0) - (a.reports_count ?? 0);
      }

      if (sortKey === "created_at") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (sortKey === "updated_at") {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }

      return 0;
    });

  return {
    updatePostContent,
    filteredAndSortedPosts,
    deletePost,
    searchText,
    setSearchText,
    sortKey,
    setSortKey,
  };
};
