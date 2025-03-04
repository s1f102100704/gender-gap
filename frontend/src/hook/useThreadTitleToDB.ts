import { DISCUSSION_API_URL } from "../../src/config";
import { useState } from "react";
import axios from "axios";

interface useThreadTitleToDBReturn {
  threadTitleSubmit: (event: React.FormEvent) => Promise<number | undefined>;
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
    event: React.FormEvent
  ): Promise<number | undefined> => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const thread_title = threadTitle;
    try {
      const response = await axios.post(DISCUSSION_API_URL, {
        discussion_thread: { thread_title },
      });
      console.log("Success to send thread:", response.data);
      setThreadTitle("");
      return response.data.data.id;
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
