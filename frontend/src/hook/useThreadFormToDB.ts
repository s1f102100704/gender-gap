import { DISCUSSION_API_URL } from "../config";
import { useState } from "react";
import axios from "axios";

interface useThreadTitleToDBReturn {
  threadFormSubmit: (
    event: React.FormEvent,
    threadContext: string,
    gender: number
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  threadTitle: string;
  setThreadTitle: (value: string) => void;
}
const useThreadFormToDB = (): useThreadTitleToDBReturn => {
  const [threadTitle, setThreadTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadFormSubmit = async (
    event: React.FormEvent,
    threadContext: string,
    gender: number
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const thread_title = threadTitle;
    const content = threadContext;
    const payload = {
      discussion_thread: { thread_title },
      post: { content: content, gender: gender },
    };
    try {
      const response = await axios.post(DISCUSSION_API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Success to send thread:", response.data);
      setThreadTitle("");
      // return response.data.data.id;
    } catch (err) {
      console.log(err);
      setError("Failed to send thread");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    threadFormSubmit,
    loading,
    error,
    threadTitle,
    setThreadTitle,
  };
};

export default useThreadFormToDB;
