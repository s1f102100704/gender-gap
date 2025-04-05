import styles from "./kaitenSushi.module.css";
import icon from "../../../assets/icon.svg"

const KaitenSushi = () => {
  return (
    <div className={styles.kaitenzushi}>
      <div className={styles.kaiten}>
        <div className={styles.spin}>
        <ul className={styles.sushi}>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a1ディスカッションスレッド1</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a2ディスカッションスレッド2</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a3ディスカaaaaaッションスレッド3</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a4ディスカッションスレッド4</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a5ディスカッションスレッド5</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a4ディスカッションスレッド6</div></a></li>
        </ul>
        <ul className={styles.sushi}>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a1ディスカッションスレッド1</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a1ディスカッションスレッド1</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a2ディスカッションスレッド2</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a3ディスカaaaaaッションスレッド3</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a4ディスカッションスレッド4</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a5ディスカッションスレッド5</div></a></li>
          <li><a href=""><div className={styles.conter}><img src={icon}></img>a4ディスカッションスレッド6</div></a></li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default KaitenSushi;
