import React from "react";
import styles from "./threadDetail.module.css";
import PostDetail from "./postDetail/PostDetail";
import useGetThreadInfo from "../../../hook/threadDetail/useGetThreadInfo";
const ThreadDetail = () => {
  const { threadTitle, threadId, threadCreatedAt } = useGetThreadInfo();
  return (
    <div className={styles.threadDetail}>
      <div className={styles.threadInfo}>
        <div className={styles.img}>img</div>
        <div className={styles.textInfo}>
          <div>{threadTitle}</div>
          <div>{threadCreatedAt}</div>
        </div>
        <div></div>
      </div>
      <PostDetail />
    </div>
  );
};

export default ThreadDetail;
