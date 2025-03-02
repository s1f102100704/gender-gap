import {DISCUSSION_API_URL } from "../../src/config"
import { useState } from "react";
import axios from "axios";

interface useThreadTitleToDBReturn {
    threadFormSubmit: (event: React.FormEvent) => Promise<void>;
    loading:boolean;
    error:string |null;
    threadTitle:string;
    setThreadTitle: (value: string) => void;
}
const useThreadTitleToDB =():useThreadTitleToDBReturn=>{
    const [threadTitle, setThreadTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const threadFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
		const thread_title = threadTitle
        try {
          const response = await axios.post(DISCUSSION_API_URL, { discussion_thread: { thread_title } });
          console.log("Success to send thread:", response.data);
          setThreadTitle("");
        } catch (err) {
        	console.log(err)
        	setError("Failed to send thread");
        } finally {
          setLoading(false);
        }
      };

      return {threadFormSubmit,loading, error, threadTitle, setThreadTitle}
}

export default useThreadTitleToDB