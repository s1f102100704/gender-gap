import { useState } from "react";

export const useCheckbox = (bulkDeleteRecommendedThreads: (selectedIds: string[]) => void) => {
    const [selectedThreads, setSelectedThreads] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string | undefined) => {
        if (!id) return;
        setSelectedThreads((prev) => {
            const newSelectedThreads = { ...prev };
            if (newSelectedThreads[id]) {
                delete newSelectedThreads[id];
            } else {
                newSelectedThreads[id] = true;
            }
            return newSelectedThreads;
        });
    };

    // ✅ 送信処理（APIへ選択データをPOST）
    const handleSubmit = () => {
        const selectedIds = Object.keys(selectedThreads);
        bulkDeleteRecommendedThreads(selectedIds);
        setSelectedThreads({});
    };

    return { selectedThreads, handleCheckboxChange, handleSubmit };
};
