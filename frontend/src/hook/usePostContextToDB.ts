import axios from "axios";
import React, { useState } from "react";
import { POSTS_API_URL } from "../config";

interface usePostContextToDBReturn {
  mustSelectGender: string;
  setMustSelectGender: (value: string) => void;
  noSelectGender: () => void;
  threadContext: string;
  setThreadContext: (value: string) => void;
  gender: number;
  setGender: (value: 0 | 1 | 2) => void;
}

const usePostContextToDB = (): usePostContextToDBReturn => {
  const [threadContext, setThreadContext] = useState("");
  const [gender, setGender] = useState<0 | 1 | 2>(0);
  const [mustSelectGender, setMustSelectGender] = useState<string>("");

  const noSelectGender = () => {
    setMustSelectGender("どちらかを選択してください");
  };

  const threadContextSubmit = async (
    event: React.FormEvent,
    discussion_thread_id: number
  ): Promise<void> => {
    event.preventDefault();
    const content = threadContext;
    try {
      const response = await axios.post(POSTS_API_URL, {
        post: { content, discussion_thread_id, gender },
      });
      console.log("Success to post content:", response.data);
    } catch (err) {
      console.log(err);
    }
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

export default usePostContextToDB;
