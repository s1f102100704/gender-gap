import React, { useEffect } from "react";
import usePostContextToDB from "../../../../hook/createPost/usePostContextToDB";
import usePostState from "../../../../hook/createPost/usePostState";
import styles from "./createPostForm.module.css";
import { useGenderLogin } from "../../../../hook/gender/useGenderLogin";
import ImgUploadForm from "../../../CreateForm/ImgUploadForm";
import usePutImageS3 from "../../../../hook/makeTopic/usePutImageS3";
import { ThreadsPosts } from "../../../../types/post";
import { Thread } from "../../../../types/thread";
import { useNavigate } from "react-router-dom";
interface Props {
  thread: Thread;
  post?: ThreadsPosts;
  replyIndex?: number;
}
const CreatePostForm = (props: Props) => {
  const { getValidGender } = useGenderLogin();
  const { threadContext, setThreadContext } = usePostState();
  const { putImage, setSelectedFile } = usePutImageS3();
  const { thread } = props;

  const { threadContextSubmit } = usePostContextToDB({
    threadContext,
    gender: getValidGender(),
  });

  const navigate = useNavigate();

  const postSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const imageKey = await putImage();

    const match = threadContext.match(/>>(\d+)/);
    let replyToPostId: string | null = null;

    if (
      match &&
      props.replyIndex &&
      props.post?.id &&
      parseInt(match[1], 10) === props.replyIndex
    ) {
      replyToPostId = props.post.id;
    }

    await threadContextSubmit(
      event,
      thread.id,
      imageKey,
      replyToPostId ?? undefined
    );

    if (replyToPostId) {
      navigate(`/threads/${thread.id}`, { state: thread });
    } else {
      navigate(0);
    }

    setThreadContext("");
  };
  useEffect(() => {
    if (props.replyIndex) {
      setThreadContext(`>>${props.replyIndex} `);
    }
  }, [props.replyIndex, setThreadContext]);
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
        <div>
          <ImgUploadForm onFileSelect={(file) => setSelectedFile(file)} />
        </div>{" "}
        <button type="submit" className={styles.submitComment}>
          <p>コメントを投稿する</p>
        </button>{" "}
      </form>
    </div>
  );
};

export default CreatePostForm;
