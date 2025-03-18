import styles from "./home.module.css"
import Header from "../components/Home/header/Header";
import MainTopic from "../components/Home/contents/mainTopic/MainTopic";
import SubTopic from "../components/Home/contents/subTopic/Subtopic";
import KaitenSushi from "../components/Home/kaitenSushi/KaitenSushi";

const Home = () => {

    return (
        <div className={styles.body}>
            <Header />
            <KaitenSushi />
            <div className={styles.contents}>
                <MainTopic />
                <SubTopic />
            </div>
        </div>
    );
};

export default Home;
