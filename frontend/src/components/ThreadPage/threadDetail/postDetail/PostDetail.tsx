import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { POSTS_API_URL } from "../../../../config";
import styles from "./postDetail.module.css";
import YYDDMM from "../YYDDMM/YYDDMM";
import VoteBar from "./VoteBar/VoteBar";
import PostMenu from "./postMenu/PostMenu";
import { ThreadsPosts } from "../../../../types/post";
import { usePostCalculate } from "../../../../hook/threadDetail/usePostCalculate";
import ThreadAndPostImage from "../../../Home/contents/threadAndPostImage/ThreadAndPostImage";
import { Thread } from "../../../../types/thread";
import { useLocation } from "react-router-dom";
import ReplyPreview from "./replyPreview/ReplyPreview";

const fetchPostsComments = async (threadId: string) => {
  try {
    const response = await axios.get(
      `${POSTS_API_URL}?discussion_thread_id=${threadId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

interface Props {
  threadInfo: Thread;
}
const PostDetail = (props: Props) => {
  const [hoveredPost, setHoveredPost] = useState<ThreadsPosts | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const {
    positiveVotesCount,
    calculateFontSize,
    calculateFontWeight,
    getTextColor,
  } = usePostCalculate();
  const [posts, setPosts] = useState<ThreadsPosts[]>([]);

  const formatPostContent = (content: string, postIndex: number) => {
    return content.split(/(>>\d+)/g).map((part, i) => {
      const match = part.match(/^>>(\d+)$/);
      if (match) {
        const targetIndex = parseInt(match[1], 10) - 1;
        const targetPost = posts[targetIndex];
        if (!targetPost) return part;

        return (
          <span
            key={i}
            tabIndex={0}
            onFocus={() => {
              setHoveredPost(targetPost);
              setHoveredIndex(postIndex);
            }}
            onMouseEnter={() => {
              setHoveredPost(targetPost);
              setHoveredIndex(postIndex);
            }}
            onBlur={() => {
              setHoveredPost(null);
              setHoveredIndex(null);
            }}
            onMouseLeave={() => {
              setHoveredPost(null);
              setHoveredIndex(null);
            }}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const { threadInfo } = props;
  const threadId = threadInfo.id;
  useEffect(() => {
    fetchPostsComments(threadId).then(setPosts);
  }, [threadId]);

  const commentRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const fromPost = location.state?.fromPost ?? false;
  useEffect(() => {
    if (!fromPost) return; // 投稿から来た場合だけスクロール

    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [posts, fromPost]);
  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((post, index) => {
        const votesCount = positiveVotesCount(post);

        return (
          <div
            key={index}
            className={styles.postConfig}
            ref={index === posts.length - 1 ? commentRef : null}
          >
            <div className={styles.postHeader}>
              <div>{index + 1}.&nbsp;</div>
              <div>匿名:&nbsp;{post.gender === 1 ? "男" : "女"}&nbsp;</div>
              <YYDDMM dateInfo={new Date(post.created_at)} />
              <PostMenu post={post} index={index} thread={threadInfo} />
            </div>
            <p
              style={{
                fontSize: calculateFontSize(votesCount),
                fontWeight: calculateFontWeight(votesCount),
                color: getTextColor(post),
              }}
            >
              {formatPostContent(post.content, index)}
            </p>

            <div className={styles.image}>
              {post.image_key ? (
                <ThreadAndPostImage imageKey={post.image_key} />
              ) : (
                ""
              )}
            </div>
            <VoteBar post_id={post.id} />

            {hoveredPost && hoveredIndex === index && (
              <ReplyPreview post={hoveredPost} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
