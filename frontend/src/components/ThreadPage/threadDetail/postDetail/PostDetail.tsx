import axios from "axios";
import { useEffect, useState } from "react";
import { POSTS_API_URL } from "../../../../config";
import styles from "./postDetail.module.css";
import YYDDMM from "../YYDDMM/YYDDMM";
import VoteBar from "./VoteBar/VoteBar";
import PostMenu from "./postMenu/PostMenu";
import { ThreadsPosts, ThreadsProps } from "../../../../types/post";
import { usePostCalculate } from "../../../../hook/threadDetail/usePostCalculate";

const fetchPostsComments = async (threadId: string) => {
  try {
    const response = await axios.get(
      `${POSTS_API_URL}?discussion_thread_id=${threadId}`
    );

    console.log("fetchPostsComments", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const PostDetail = (props: ThreadsProps) => {
  const { positiveVotesCount, calculateFontSize, calculateFontWeight } =
    usePostCalculate(); // フックから関数を取得
  const [posts, setPosts] = useState<ThreadsPosts[]>([]);
  const { threadId } = props;

  useEffect(() => {
    fetchPostsComments(threadId).then(setPosts);
  }, [threadId]);

  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((post, index) => {
        const votesCount = positiveVotesCount(post);

        return (
          <div key={index} className={styles.postConfig}>
            <div className={styles.postHeader}>
              <div>{index + 1}.&nbsp;</div>
              <div>匿名:&nbsp;{post.gender === 1 ? "男" : "女"}&nbsp;</div>
              <YYDDMM dateInfo={new Date(post.created_at)} />
              <PostMenu postId={post.id} />
            </div>
            <p
              style={{
                fontSize: calculateFontSize(votesCount), // フォントサイズを計算
                fontWeight: calculateFontWeight(votesCount), // フォントの太さを計算
              }}
            >
              {post.content}
            </p>
            <VoteBar post_id={post.id} />
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
