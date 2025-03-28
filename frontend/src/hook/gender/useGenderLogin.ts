import { useState, useEffect } from "react";

export const useGenderLogin = () => {
    const [gender, setGender] = useState<"male" | "female" | null>(() => {
        const savedGender = localStorage.getItem("gender");
        return savedGender === "male" || savedGender === "female" ? savedGender : null;
    });

    const isGenderSet = !!gender;

    useEffect(() => {
        if (gender) {
            localStorage.setItem("gender", gender);
        }
    }, [gender]);

    const clearGender = () => {
        localStorage.removeItem("gender");
        setGender(null);
        window.location.reload();
    };

    return { gender, setGender, isGenderSet, clearGender };
};