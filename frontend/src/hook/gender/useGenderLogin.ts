import { useState, useEffect } from "react";

export const useGenderLogin = () => {
    // ローカルストレージから性別を取得し、初期値を設定
    const getInitialGender = (): "male" | "female" | null => {
        const savedGender = localStorage.getItem("gender");
        return savedGender === "male" || savedGender === "female" ? savedGender : null;
    };

    const [gender, setGender] = useState<"male" | "female" | null>(getInitialGender);

    const isGenderSet = Boolean(gender);

    useEffect(() => {
        if (gender) {
            localStorage.setItem("gender", gender);
        }
    }, [gender]);

    // 性別をクリアする関数
    const clearGender = () => {
        localStorage.removeItem("gender");
        setGender(null);
    };

    return { gender, setGender, isGenderSet, clearGender };
};