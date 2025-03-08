import { useState } from "react";
interface usePostStateReturn {
  mustSelectGender: string;
  setMustSelectGender: (value: string) => void;
  noSelectGender: () => void;
  threadContext: string;
  setThreadContext: (value: string) => void;
  gender: number;
  setGender: (value: 0 | 1 | 2) => void;
}
const usePostState = (): usePostStateReturn => {
  const [threadContext, setThreadContext] = useState("");
  const [gender, setGender] = useState<0 | 1 | 2>(0);
  const [mustSelectGender, setMustSelectGender] = useState<string>("");

  const noSelectGender = () => {
    setMustSelectGender("どちらかを選択してください");
  };

  return {
    mustSelectGender,
    setMustSelectGender,
    noSelectGender,
    threadContext,
    setThreadContext,
    gender,
    setGender,
  };
};

export default usePostState;
