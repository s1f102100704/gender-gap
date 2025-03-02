import { useState } from "react";

const usePostContextToDB = () = {
    const [threadContents,setThreadContents] = useState("")

    return threadContents
}

export default usePostContextToDB;