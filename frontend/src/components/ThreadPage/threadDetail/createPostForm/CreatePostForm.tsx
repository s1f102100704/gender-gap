import React from "react";
import styles from "./createPostForm.module.css";
const CreatePostForm = () => {
  return (
    <div>
      <form className={styles.form}>
        <h1>コメントを投稿する</h1>
        <textarea
          placeholder="コメントを書く"
          className={styles.textarea}
        ></textarea>
        <div>画像を選択</div>
        <div className={styles.submitComment}>
          <p>コメントを投稿する</p>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
