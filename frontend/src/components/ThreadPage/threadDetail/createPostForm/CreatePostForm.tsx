import React from "react";
import usePostContextToDB from "../../../../hook/createPost/usePostContextToDB";
import usePostState from "../../../../hook/createPost/usePostState";
import SelectGender from "../../../CreateForm/SelectGender";
import styles from "./createPostForm.module.css";
interface Props {
  threadId: string;
}
const CreatePostForm = (props: Props) => {
  const {
    mustSelectGender,
    setMustSelectGender,
    noSelectGender,
    threadContext,
    setThreadContext,
    gender,
    setGender,
  } = usePostState();
  const { threadId } = props;
  const { threadContextSubmit } = usePostContextToDB({ threadContext, gender });
  const postSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (gender == 0) {
      noSelectGender();
    } else {
      threadContextSubmit(event, threadId);
    }
  };
  return (
    <div>
      <form className={styles.form} onSubmit={postSubmit}>
        <h1>コメントを投稿する</h1>
        <textarea
          placeholder="コメントを書く"
          className={styles.textarea}
          value={threadContext}
          onChange={(e) => setThreadContext(e.target.value)}
          required
        ></textarea>
        <div>画像を選択</div>
        <SelectGender
          setMustSelectGender={setMustSelectGender}
          mustSelectGender={mustSelectGender}
          setGender={setGender}
          gender={gender}
        />
        <button type="submit" className={styles.submitComment}>
          <p>コメントを投稿する</p>
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
