import styles from "./home.module.css";
import Header from "../components/Home/header/Header";
import MainTopic from "../components/Home/contents/mainTopic/MainTopic";
import SubTopic from "../components/Home/contents/subTopic/SubTopic";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";
import GenderComponent from "../components/Gender/Login/GenderLogin";
import GenderDelete from "../components/Gender/delete/GenderDelete";
import { useGenderLogin } from "../hook/gender/useGenderLogin";

const Home = () => {
  const { isGenderSet } = useGenderLogin();
  if (!isGenderSet) {
    // genderがローカルストレージにない場合に表示するコンポーネント
    return (
      <div className={styles.body}>
        <Header />
        <div className={styles.contents}>
          <GenderComponent />
        </div>
      </div>
    );
  }

  // genderが存在する場合の通常の表示
  return (
    <div className={styles.body}>
      <Header />
      <KaitenSushi />
      <div className={styles.contents}>
        <MainTopic />
        <SubTopic />
        <GenderDelete />
      </div>
    </div>
  );
};

export default Home;
