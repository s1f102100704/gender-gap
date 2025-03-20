import { useState } from "react";

export const useCheckbox = (
    bulkDeleteRecommendedThreads: (selectedIds: string[]) => Promise<void>, // 🔥 `Promise<void>` を追加
    bulkAddRecommendedThreads: (selectedIds: string[]) => Promise<void> // 🔥 `Promise<void>` を追加
) => {
    const [selectedThreads, setSelectedThreads] = useState<{ [key: string]: boolean }>({});

    // ✅ チェックボックスの変更処理
    const handleCheckboxChange = (id: string | undefined) => {
        if (!id) return;
        setSelectedThreads((prev) => {
            const newSelectedThreads = { ...prev };
            if (newSelectedThreads[id]) {
                delete newSelectedThreads[id]; // すでにチェック済みなら削除
            } else {
                newSelectedThreads[id] = true; // チェックを追加
            }
            return newSelectedThreads;
        });
    };

    // ✅ 追加処理
    const handleAdd = async () => {
        const selectedIds = Object.keys(selectedThreads);
        if (selectedIds.length === 0) {
            alert("追加するスレッドを選択してください！");
            return;
        }

        try {
            await bulkAddRecommendedThreads(selectedIds); // 🔥 `await` で非同期処理
            setSelectedThreads({});
            alert("おすすめスレッドが追加されました！");
        } catch (error) {
            console.error("❌ 追加エラー:", error);
            alert("追加に失敗しました。");
        }
    };

    // ✅ 削除処理
    const handleDelete = async () => {
        const selectedIds = Object.keys(selectedThreads);
        if (selectedIds.length === 0) {
            alert("削除するスレッドを選択してください！");
            return;
        }

        try {
            await bulkDeleteRecommendedThreads(selectedIds); // 🔥 `await` で非同期処理
            setSelectedThreads({});
            alert("おすすめスレッドが削除されました！");
        } catch (error) {
            console.error("❌ 削除エラー:", error);
            alert("削除に失敗しました。");
        }
    };

    return { selectedThreads, handleCheckboxChange, handleAdd, handleDelete };
};
