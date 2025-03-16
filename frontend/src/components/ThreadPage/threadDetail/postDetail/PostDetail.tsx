import axios from "axios";
import { useEffect, useState } from "react";
import { POSTS_API_URL } from "../../../../config";
import styles from "./postDetail.module.css";
import YYDDMM from "../YYDDMM/YYDDMM";
import VoteBar from "./VoteBar/VoteBar";
interface Posts {
  id: string;
  disscussion_thread_id: string;
  gender: number;
  content: string;
  created_at: number;
}
const fetchPostsComments = async (threadId: string) => {
  try {
    const response = await axios.get(
      `${POSTS_API_URL}?discussion_thread_id=${threadId}`
    );
    console.log("postsData:", response.data.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

interface Props {
  threadId: string;
}
const PostDetail = (porps: Props) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const { threadId } = porps;
  useEffect(() => {
    fetchPostsComments(threadId).then(setPosts);
  }, [threadId]);
  if (!posts) return <p>Loading...</p>;
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className={styles.postConfig}>
          <div className={styles.postHeader}>
            <div>{index + 1}.&nbsp;</div>
            <div>匿名:&nbsp;{post.gender == 1 ? "男" : "女"}&nbsp;</div>
            <YYDDMM dateInfo={new Date(post.created_at)} />
          </div>
          <p>{post.content}</p>
          <VoteBar initialDownvotes={0} initialUpvotes={0} post_id={post.id}/>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
