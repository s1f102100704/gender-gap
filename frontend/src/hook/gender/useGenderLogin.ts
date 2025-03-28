import { useState, useEffect } from "react";

export const useGenderLogin = () => {
    const [gender, setGender] = useState<"male" | "female" | null>(() => {
        // 初期値をローカルストレージから取得
        const savedGender = localStorage.getItem("gender");
        return savedGender === "male" || savedGender === "female" ? savedGender : null;
    });

    const isGenderSet = !!gender; // 性別が設定されているかを判定

    // 性別データをローカルストレージに保存
    useEffect(() => {
        if (gender) {
            localStorage.setItem("gender", gender);
        }
    }, [gender]);

    // 性別データを削除
    const clearGender = () => {
        localStorage.removeItem("gender");
        setGender(null);
    };

    return { gender, setGender, isGenderSet, clearGender };
};