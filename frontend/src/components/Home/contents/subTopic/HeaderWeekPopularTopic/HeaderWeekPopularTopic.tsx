import { Link } from "react-router-dom";
import styles from "./HeaderWeekPopularTopic.module.css"

const SubTitleTopic = () => {
    return (
        <div className={styles.subTopic}>
            <div className={styles.createTopic}><Link to="/make_topic">一週間の人気トピック</Link></div>
        </div>
    )
}

export default SubTitleTopic;
