import { useState } from "react";
import Header from "../Home/header/Header";
import KaitenSushi from "../Home/kaitenSushi/KaitenSushi";
import styles from "./makeTopic.module.css"
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/discussion_threads";

const MakeTopic =()=>{
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log(API_URL)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        console.log(title)
        try {
          const response = await axios.post(API_URL, { discussion_thread: { title } });
          console.log("Success:", response.data);
          setTitle("");
        } catch (err) {
          setError("送信に失敗しました。");
        } finally {
          setLoading(false);
        }
      };
    return (
        <div className={styles.body}>
            <Header/>
            <KaitenSushi/>
            <div className={styles.contents}>
                <div className={styles.main}>
                    <div className={styles.entryWrap}>
                        <div className={styles.h1}>トピックを投稿する</div>
                        <div className={styles.formFlow}>img</div>

                        <form className={styles.form} onSubmit={handleSubmit}>
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
                                        value ={title} 
                                        onChange={(e) => setTitle(e.target.value)}
                                        required/>
                                        {error && <p className="text-red-500">{error}</p>}
                                    <div className="textarea">
                                        <textarea placeholder="a" className={styles.wrap}></textarea>
                                    </div>
                                    <div>
                                        <input type="checkbox"/><label>男</label>
                                        <input type="checkbox"/><label>女</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.createTopicBtn}>
                                <button type = "submit" className={styles.btn} disabled={loading}>
                                {loading ? "送信中..." : "送信"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.a}></div>
            </div>
        </div>
    )
}

export default MakeTopic;