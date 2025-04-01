import styles from "./threadDetail.module.css";
import PostDetail from "./postDetail/PostDetail";
import useGetThreadInfo from "../../../hook/threadDetail/useGetThreadInfo";
import YYDDMM from "./YYDDMM/YYDDMM";
import CreatePostForm from "./createPostForm/CreatePostForm";
import ThreadAndPostImage from "../../Home/contents/threadAndPostImage/ThreadAndPostImage";
import { useRef } from "react";
const ThreadDetail = () => {
  const { threadTitle, threadId, dateInfo, threadImage } = useGetThreadInfo();

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <div className={styles.threadDetail}>
      <div className={styles.threadInfo}>
        <div className={styles.img}>
          <ThreadAndPostImage imageKey={threadImage} />
        </div>
        <div className={styles.textInfo}>
          <div>{threadTitle}</div>
          <YYDDMM dateInfo={dateInfo} />
        </div>
        <button className={styles.createCommentBtn} onClick={scrollToForm}>
          コメントを投稿
        </button>
      </div>
      <PostDetail threadId={threadId} />
      <div ref={formRef}>
        <CreatePostForm threadId={threadId} />
      </div>
    </div>
  );
};

export default ThreadDetail;
