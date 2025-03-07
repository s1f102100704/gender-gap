import styles from "./threadDetail.module.css";
import PostDetail from "./postDetail/PostDetail";
import useGetThreadInfo from "../../../hook/threadDetail/useGetThreadInfo";
import YYDDMM from "./YYDDMM/YYDDMM";
import CreatePostForm from "./createPostForm/CreatePostForm";
const ThreadDetail = () => {
  const { threadTitle, dateInfo } = useGetThreadInfo();

  return (
    <div className={styles.threadDetail}>
      <div className={styles.threadInfo}>
        <div className={styles.img}>img</div>
        <div className={styles.textInfo}>
          <div>{threadTitle}</div>
          <YYDDMM dateInfo={dateInfo} />
        </div>
        <div className={styles.createCommentBtn}>コメントを投稿</div>
      </div>
      <PostDetail />
      <CreatePostForm />
    </div>
  );
};

export default ThreadDetail;
