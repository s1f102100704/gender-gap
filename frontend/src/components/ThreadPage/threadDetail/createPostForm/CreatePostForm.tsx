import React, { useEffect } from "react";
import usePostContextToDB from "../../../../hook/createPost/usePostContextToDB";
import usePostState from "../../../../hook/createPost/usePostState";
import styles from "./createPostForm.module.css";
import { useGenderLogin } from "../../../../hook/gender/useGenderLogin";
interface Props {
  threadId: string;
}
const CreatePostForm = (props: Props) => {
  const { getValidGender } = useGenderLogin();
  const {
    threadContext,
    setThreadContext,
  } = usePostState();
  const { threadId } = props;

  const { threadContextSubmit } = usePostContextToDB({ threadContext, gender: getValidGender() });

  const postSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await threadContextSubmit(event, threadId);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={postSubmit}>
        <h1>コメントを投稿する</h1>

        <div className={styles.textarea}>
          <textarea
            placeholder="コメントを書く"
            className={styles.wrap}
            value={threadContext}
            onChange={(e) => setThreadContext(e.target.value)}
            required
          ></textarea>
        </div>
        <div>画像を選択</div>
        <button type="submit" className={styles.submitComment}>
          <p>コメントを投稿する</p>
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;