import { useState, useEffect } from "react";
// import {} from "react-router-dom";
import { useRedirectIfNoGender } from "./useRedirectIfNoGender";

export const useGenderLogin = () => {
  // const navigate = useNavigate();

  // ローカルストレージから性別を取得し、初期値を設定
  const getInitialGender = (): 1 | 2 | null => {
    const savedGender = localStorage.getItem("gender");
    return savedGender === "1" ? 1 : savedGender === "2" ? 2 : null;
  };

  const [gender, setGender] = useState<1 | 2 | null>(getInitialGender);

  const isGenderSet = Boolean(gender);

  useRedirectIfNoGender(gender);

  // 性別が選択されたときにローカルストレージを更新
  useEffect(() => {
    if (gender) {
      localStorage.setItem("gender", gender.toString());
    }
  }, [gender]);

  // 性別をクリアする関数
  const clearGender = () => {
    localStorage.removeItem("gender");
    setGender(null);
  };

  // gender をチェック
  const getValidGender = (): 1 | 2 => {
    if (gender === null) {
      return 1;
    }
    return gender;
  };

  return { gender, setGender, isGenderSet, clearGender, getValidGender };
};
