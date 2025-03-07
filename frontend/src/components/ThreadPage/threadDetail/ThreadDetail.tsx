import React from "react";
import styles from "./threadDetail.module.css";
import PostDetail from "./postDetail/PostDetail";
import useGetThreadInfo from "../../../hook/threadDetail/useGetThreadInfo";
const ThreadDetail = () => {
  const { threadTitle, threadId, threadDate } = useGetThreadInfo();

  return (
    <div className={styles.threadDetail}>
      <div className={styles.threadInfo}>
        <div className={styles.img}>img</div>
        <div className={styles.textInfo}>
          <div>{threadTitle}</div>
          <div>
            {`${threadDate.year}/${String(threadDate.month).padStart(
              2,
              "0"
            )}/${String(threadDate.day).padStart(2, "0")}`}
            ({threadDate.dayOfWeek})
            {`${String(threadDate.hours).padStart(2, "0")}:${String(
              threadDate.minutes
            ).padStart(2, "0")}:${String(threadDate.seconds).padStart(2, "0")}`}
          </div>
        </div>
        <div></div>
      </div>
      <PostDetail />
    </div>
  );
};

export default ThreadDetail;
