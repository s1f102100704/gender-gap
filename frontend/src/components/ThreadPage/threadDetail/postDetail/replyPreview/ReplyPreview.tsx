import styles from "./ReplyPreview.module.css";
import { ThreadsPosts } from "../../../../../types/post";
import YYDDMM from "../../YYDDMM/YYDDMM";
import ThreadAndPostImage from "../../../../Home/contents/threadAndPostImage/ThreadAndPostImage";

interface Props {
  post: ThreadsPosts;
}

const ReplyPreview = ({ post }: Props) => {
  return (
    <div className={styles.previewCard}>
      <p>匿名: {post.gender === 1 ? "男" : "女"}</p>
      <YYDDMM dateInfo={new Date(post.created_at)} />
      <p>{post.content}</p>
      {post.image_key && <ThreadAndPostImage imageKey={post.image_key} />}
    </div>
  );
};

export default ReplyPreview;
