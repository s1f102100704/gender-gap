import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DISCUSSION_THREAD_ADMIN_API_URL } from "../../config";

export const useAdminThreads = () => {
  const [allAdminThreads, setAllAdminThreads] = useState<
    { thread_title: string; id: string; created_at: number }[]
  >([]);

  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("");
  const hasFetched = useRef(false);

  const fetchThreadsTitle = async () => {
    try {
      const response = await axios.get(DISCUSSION_THREAD_ADMIN_API_URL, {
        headers: {
          Accept: "application/json",
        },
      });
      const threadTitle = response.data.data;
      setAllAdminThreads(threadTitle);
    } catch (err) {
      console.log("🔴 スレッド取得エラー:", err);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchThreadsTitle();
  }, []);

  const deleteThread = async (id: string) => {
    const confirmDelete = window.confirm("本当にこのスレッドを削除しますか？");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${DISCUSSION_THREAD_ADMIN_API_URL}/${id}`
      );

      if (response.status === 200) {
        alert("スレッドが削除されました！");
        fetchThreadsTitle();
      } else {
        const errorData = response.data;
        alert(errorData.error || "削除に失敗しました。");
      }
    } catch (err) {
      console.error("スレッド削除エラー:", err);
      alert("削除に失敗しました。");
    }
  };

  const updateThreadTitle = async (id: string, newTitle: string) => {
    try {
      await axios.put(`${DISCUSSION_THREAD_ADMIN_API_URL}/${id}`, {
        thread_title: newTitle,
      });
      fetchThreadsTitle();
    } catch (err) {
      console.error("🔴 スレッドタイトル更新エラー:", err);
      throw err;
    }
  };

  const filteredAndSortedThreads = allAdminThreads
    .filter((allAdminThreads) =>
      allAdminThreads.thread_title
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "created_at") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });

  return {
    allAdminThreads,
    deleteThread,
    updateThreadTitle,
    filteredAndSortedThreads,
    searchText,
    setSearchText,
    sortKey,
    setSortKey,
  };
};
