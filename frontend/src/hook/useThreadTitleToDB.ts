import { DISCUSSION_API_URL } from "../../src/config";
import { useState } from "react";
import axios from "axios";

interface useThreadTitleToDBReturn {
  threadTitleSubmit: (
    event: React.FormEvent,
    threadContext: string,
    gender: number
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  threadTitle: string;
  setThreadTitle: (value: string) => void;
}
const useThreadTitleToDB = (): useThreadTitleToDBReturn => {
  const [threadTitle, setThreadTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadTitleSubmit = async (
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
    threadTitleSubmit,
    loading,
    error,
    threadTitle,
    setThreadTitle,
  };
};

export default useThreadTitleToDB;
