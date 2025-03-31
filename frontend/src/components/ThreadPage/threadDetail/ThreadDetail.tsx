import styles from "./threadDetail.module.css";
import PostDetail from "./postDetail/PostDetail";
import useGetThreadInfo from "../../../hook/threadDetail/useGetThreadInfo";
import YYDDMM from "./YYDDMM/YYDDMM";
import CreatePostForm from "./createPostForm/CreatePostForm";
import { useLocation } from "react-router-dom";
import ThreadAndPostImage from "../../Home/contents/threadAndPostImage/ThreadAndPostImage";
const ThreadDetail = () => {
  const location = useLocation();

  const threadInfo = location.state;
  const threadId = threadInfo.id;

  const { threadTitle, dateInfo, threadImage } = useGetThreadInfo();

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
        <div className={styles.createCommentBtn}>コメントを投稿</div>
      </div>
      <PostDetail threadId={threadId} />
      <CreatePostForm threadId={threadId} />
    </div>
  );
};

export default ThreadDetail;
