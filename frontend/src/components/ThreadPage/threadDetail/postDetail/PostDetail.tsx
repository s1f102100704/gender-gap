import axios from "axios";
import { useEffect, useState } from "react";
import { POSTS_API_URL } from "../../../../config";
import styles from "./postDetail.module.css";
import YYDDMM from "../YYDDMM/YYDDMM";
import VoteBar from "./VoteBar/VoteBar";
import PostMenu from "./postMenu/PostMenu";

interface Posts {
  id: string;
  disscussion_thread_id: string;
  gender: number;
  content: string;
  created_at: number;
  votes: { id: string; gender: number }[];
}

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

const calculateFontSize = (votesCount: number): string => {
  const baseSize = 16; // 最小フォントサイズ
  const maxSize = 32; // 最大フォントサイズ
  const scale = Math.min(votesCount / 5, 1); // 300 いいねで最大値に達するスケール
  return `${baseSize + (maxSize - baseSize) * scale}px`;
};

const calculateFontWeight = (votesCount: number): number => {
  const baseWeight = 400; // 最小フォントの太さ
  const maxWeight = 900; // 最大フォントの太さ
  const scale = Math.min(votesCount / 5, 1); // 300 いいねで最大値に達するスケール
  return baseWeight + (maxWeight - baseWeight) * scale;
};

interface Props {
  threadId: string;
}

const PostDetail = (props: Props) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const { threadId } = props;

  useEffect(() => {
    fetchPostsComments(threadId).then(setPosts);
  }, [threadId]);

  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((post, index) => {
        const votesCount = post.votes.length; // いいねの数を取得
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
                fontSize: calculateFontSize(votesCount),
                fontWeight: calculateFontWeight(votesCount),
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
