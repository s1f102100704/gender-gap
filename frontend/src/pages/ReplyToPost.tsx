import Header from "../components/Home/header/Header";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";
import styles from "./replyToPost.module.css";
import {
  useGetPostInfo,
  useGetThreadState,
} from "../hook/threadDetail/useGetThreadInfo";
import ThreadAndPostImage from "../components/Home/contents/threadAndPostImage/ThreadAndPostImage";
import YYDDMM from "../components/ThreadPage/threadDetail/YYDDMM/YYDDMM";
import VoteBar from "../components/ThreadPage/threadDetail/postDetail/VoteBar/VoteBar";
import { usePostCalculate } from "../hook/threadDetail/usePostCalculate";
import { useLocation } from "react-router-dom";
import { ThreadsPosts } from "../types/post";
import { Thread } from "../types/thread";
import CreatePostForm from "../components/ThreadPage/threadDetail/createPostForm/CreatePostForm";

const ReplyToPost = () => {
  const {
    positiveVotesCount,
    calculateFontSize,
    calculateFontWeight,
    getTextColor,
  } = usePostCalculate();
  const location = useLocation();
  const { thread, post, index } = location.state as {
    thread: Thread;
    post: ThreadsPosts;
    index: number;
  };
  const { threadTitle, dateInfo, threadImage } = useGetThreadState(thread);
  const { postContent, postId, postDateInfo, postImage, gender } =
    useGetPostInfo(post);
  const votesCount = positiveVotesCount(post);
  return (
    <div className={styles.body}>
      <Header />
      <KaitenSushi />
      <div className={styles.contents}>
        <div className={styles.threadDetail}>
          <div className={styles.threadInfo}>
            <div className={styles.img}>
              <ThreadAndPostImage imageKey={threadImage} />
            </div>
            <div className={styles.textInfo}>
              <div>{threadTitle}</div>
              <YYDDMM dateInfo={dateInfo} />
            </div>
          </div>
          <div key={index} className={styles.postConfig}>
            <div className={styles.postHeader}>
              <div>{index + 1}.&nbsp;</div>
              <div>匿名:&nbsp;{gender === 1 ? "男" : "女"}&nbsp;</div>
              <YYDDMM dateInfo={new Date(postDateInfo)} />
            </div>
            <p
              style={{
                fontSize: calculateFontSize(votesCount),
                fontWeight: calculateFontWeight(votesCount),
                color: getTextColor(post),
              }}
            >
              {postContent}
            </p>

            <div className={styles.image}>
              {postImage ? <ThreadAndPostImage imageKey={postImage} /> : ""}
            </div>

            <VoteBar post_id={postId} />
          </div>
          <CreatePostForm threadId={thread.id} post={post} replyIndex={index} />
        </div>
      </div>
    </div>
  );
};

export default ReplyToPost;
