import Header from "../components/Home/header/Header";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";
import styles from "./replyToPost.module.css";
import { useGetPostInfo } from "../hook/threadDetail/useGetThreadInfo";
import ThreadAndPostImage from "../components/Home/contents/threadAndPostImage/ThreadAndPostImage";
import YYDDMM from "../components/ThreadPage/threadDetail/YYDDMM/YYDDMM";
import PostMenu from "../components/ThreadPage/threadDetail/postDetail/postMenu/PostMenu";
import VoteBar from "../components/ThreadPage/threadDetail/postDetail/VoteBar/VoteBar";
import { usePostCalculate } from "../hook/threadDetail/usePostCalculate";

const ReplyToPost = () => {
  const {
    positiveVotesCount,
    calculateFontSize,
    calculateFontWeight,
    getTextColor,
  } = usePostCalculate();
  const { post, postContent, postId, dateInfo, postImage, gender, index } =
    useGetPostInfo();
  const votesCount = positiveVotesCount(post);
  return (
    <div className={styles.body}>
      <Header />
      <KaitenSushi />
      <div className={styles.contents}>
        <div key={index} className={styles.postConfig}>
          <div className={styles.postHeader}>
            <div>{index + 1}.&nbsp;</div>
            <div>匿名:&nbsp;{gender === 1 ? "男" : "女"}&nbsp;</div>
            <YYDDMM dateInfo={new Date(dateInfo)} />
            <PostMenu post={post} index={index} />
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
      </div>
    </div>
  );
};

export default ReplyToPost;
