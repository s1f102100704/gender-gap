import Header from "../Home/header/Header";
import KaitenSushi from "../Home/kaitenSushi/KaitenSushi";
import styles from "./makeTopic.module.css";
import useThreadFormToDB from "../../hook/makeTopic/useThreadFormToDB";
import usePostContextToDB from "../../hook/usePostContextToDB";
import React from "react";

const MakeTopic = () => {
  const { threadFormSubmit, loading, error, threadTitle, setThreadTitle } =
    useThreadFormToDB();
  const {
    mustSelectGender,
    setMustSelectGender,
    noSelectGender,
    threadContext,
    setThreadContext,
    gender,
    setGender,
  } = usePostContextToDB();

  const threadSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (gender == 0) {
      noSelectGender();
    } else {
      await threadFormSubmit(event, setThreadContext, threadContext, gender);
    }
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
                  <div className={styles.selectGender}>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="radio"
                        name="gender"
                        className={styles.customCheckbox}
                        value="1"
                        checked={gender === 1}
                        onChange={(e) => {
                          setGender(Number(e.target.value) as 1 | 2);
                          setMustSelectGender("");
                        }}
                      />
                      <span className={styles.checkboxUi}></span>
                      <label>男</label>
                    </label>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="radio"
                        name="gender"
                        className={styles.customCheckbox}
                        value="2"
                        checked={gender === 2}
                        onChange={(e) => {
                          setGender(Number(e.target.value) as 1 | 2);
                          setMustSelectGender("");
                        }}
                      />
                      <span className={styles.checkboxUi}></span>
                      <label>女</label>
                    </label>
                  </div>
                  {mustSelectGender && <p>{mustSelectGender}</p>}
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
