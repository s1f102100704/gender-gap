import Header from "../components/Home/header/Header";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";
import styles from "./makeTopic.module.css";
import useThreadFormToDB from "../hook/makeTopic/useThreadFormToDB";
import React from "react";
import usePostState from "../hook/createPost/usePostState";
import { useGenderLogin } from "../hook/gender/useGenderLogin";

const MakeTopic = () => {
  const { threadFormSubmit, loading, error, threadTitle, setThreadTitle } =
    useThreadFormToDB();
  const { getValidGender } = useGenderLogin();
  const {
    threadContext,
    setThreadContext,
  } = usePostState();

  const threadSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await threadFormSubmit(event, setThreadContext, threadContext, getValidGender());
    setThreadTitle("");
  };
  return (
    <div className={styles.body}>
      <Header />
      <KaitenSushi />
      <div className={styles.contents}>
        <div className={styles.main}>
          <div className={styles.entryWrap}>
            <div className={styles.h1}>トピックを投稿する</div>
            <div className={styles.formFlow}>img</div>

            <form className={styles.form} onSubmit={threadSubmit}>
              <div className={styles.inForm}>
                {/* イメージ追加 */}
                <div className={styles.image}>
                  <div className={styles.topicImg}></div>
                  <div className={styles.addImage}>画像を選択</div>
                </div>
                {/* フォーム側 */}
                <div className={styles.other}>
                  <input
                    type="text"
                    placeholder="タイトルを書く"
                    className={styles.threadTitle}
                    value={threadTitle}
                    onChange={(e) => setThreadTitle(e.target.value)}
                    required
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="textarea">
                    <textarea
                      placeholder="a"
                      className={styles.wrap}
                      value={threadContext}
                      onChange={(e) => setThreadContext(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={styles.createTopicBtn}>
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? "送信中..." : "送信"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.a}></div>
      </div>
    </div>
  );
};

export default MakeTopic;
