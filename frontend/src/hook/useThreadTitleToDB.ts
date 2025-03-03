import {DISCUSSION_API_URL } from "../../src/config"
import { useState } from "react";
import axios from "axios";

interface useThreadTitleToDBReturn {
    threadTitleSubmit: (event: React.FormEvent) => Promise<number | undefined>;
    loading:boolean;
    error:string |null;
    threadTitle:string;
    discussionThreadId:number | undefined;
    setThreadTitle: (value: string) => void;
}
const useThreadTitleToDB =():useThreadTitleToDBReturn=>{
    const [threadTitle, setThreadTitle] = useState("");
    const [discussionThreadId,setDiscussionThreadId] =useState<number>()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const threadTitleSubmit = async (event: React.FormEvent):Promise<number | undefined>=> {
        event.preventDefault();
        setLoading(true);
        setError(null);
		    const thread_title = threadTitle
        try {
          const response = await axios.post(DISCUSSION_API_URL, { discussion_thread: { thread_title } });
          setDiscussionThreadId(response.data.data.id)
          console.log("Success to send thread:",response.data.data.id);
          setThreadTitle("");
          return response.data.data.id;  
        } catch (err) {
        	console.log(err)
        	setError("Failed to send thread");
          return undefined;
        } finally {
          setLoading(false);
        }
      };

      return {threadTitleSubmit,loading, error, threadTitle, setThreadTitle,discussionThreadId}
}

export default useThreadTitleToDB