import { useState } from "react";
interface usePostStateReturn {
  threadContext: string;
  setThreadContext: (value: string) => void;
}
const usePostState = (): usePostStateReturn => {
  const [threadContext, setThreadContext] = useState("");

  return {
    threadContext,
    setThreadContext,
  };
};

export default usePostState;
