import React, { useEffect } from "react";
import usePostContextToDB from "../../../../hook/createPost/usePostContextToDB";
import usePostState from "../../../../hook/createPost/usePostState";
import styles from "./createPostForm.module.css";
import { useGenderLogin } from "../../../../hook/gender/useGenderLogin";
import ImgUploadForm from "../../../CreateForm/ImgUploadForm";
import usePutImageS3 from "../../../../hook/makeTopic/usePutImageS3";
import { ThreadsPosts } from "../../../../types/post";
interface Props {
  threadId: string;
  post?: ThreadsPosts;
  replyIndex?: number;
}
const CreatePostForm = (props: Props) => {
  const { getValidGender } = useGenderLogin();
  const { threadContext, setThreadContext } = usePostState();
  const { putImage, setSelectedFile } = usePutImageS3();
  const { threadId } = props;

  const { threadContextSubmit } = usePostContextToDB({
    threadContext,
    gender: getValidGender(),
  });

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
      threadId,
      imageKey,
      replyToPostId ?? undefined
    );
  };
  useEffect(() => {
    if (props.replyIndex) {
      setThreadContext(`>>${props.replyIndex} `); // 半角スペース入れておくと自然
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
        </div>
        <button type="submit" className={styles.submitComment}>
          <p>コメントを投稿する</p>
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
