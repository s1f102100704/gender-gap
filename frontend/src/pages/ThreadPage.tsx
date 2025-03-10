import Header from "../components/Home/header/Header";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";
import styles from "./threadDetail.module.css";
import ThreadDetail from "../components/ThreadPage/threadDetail/ThreadDetail";
import AAAA from "../components/ThreadPage/threadDetail/AAAA";
const ThreadPage = () => {
  return (
    <div className={styles.body}>
      <Header />
      <KaitenSushi />
      <div className={styles.contents}>
        <ThreadDetail />
        <AAAA />
      </div>
    </div>
  );
};

export default ThreadPage;
