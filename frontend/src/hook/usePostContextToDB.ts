import axios from "axios";
import React, { useState } from "react";
import { POSTS_API_URL } from "../config";

interface usePostContextToDBReturn {
  threadContextSubmit: (
    event: React.FormEvent,
    discussion_thread_id: number
  ) => Promise<void>;
  setThreadContext: (value: string) => void;
  gender: number;
  setGender: (value: 1 | 2) => void;
}

const usePostContextToDB = (): usePostContextToDBReturn => {
  const [threadContext, setThreadContext] = useState("");
  const [gender, setGender] = useState(0);

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
    threadContextSubmit,
    setThreadContext,
    gender,
    setGender,
  };
};

export default usePostContextToDB;
