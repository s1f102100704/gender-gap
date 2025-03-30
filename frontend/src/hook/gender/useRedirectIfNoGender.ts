import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectIfNoGender = (gender: 1 | 2 | null) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!gender) {
            navigate("/");
        }
    }, [gender, navigate]);
};