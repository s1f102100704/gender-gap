import Header from "../Home/header/Header";
import KaitenSushi from "../Home/kaitenSushi/KaitenSushi";
import styles from "./makeTopic.module.css"

const MakeTopic =()=>{
    return (
        <div className={styles.body}>
            <Header/>
            <KaitenSushi/>

            <div className={styles.contents}>
                <div className={styles.main}>
                    <div className={styles.entryWrap}>
                        <div className={styles.h1}>トピックを投稿する</div>
                        <div className={styles.formFlow}>img</div>
                        <form className={styles.form}>
                            <div className={styles.inForm}>
                                {/* イメージ追加 */}
                                <div className={styles.image}>
                                    <div className={styles.topicImg}></div>
                                    <div className={styles.addImage}>画像を選択</div>
                                </div>
                                {/* フォーム側 */}
                                <div className={styles.other}>
                                    <input type="text" placeholder="タイトルを書く" className={styles.title}/>
                                    <div className="textarea">
                                        <textarea placeholder="a" className={styles.wrap}></textarea>
                                    </div>
                                    <div>
                                        <input type="checkbox"/><label>男</label>
                                        <input type="checkbox"/><label>女</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.createTopicBtn}><input type = "submit" className={styles.btn}/></div>
                            
                        </form>
                    </div>
                </div>
                <div className={styles.a}></div>
            </div>
        </div>
    )
}

export default MakeTopic;