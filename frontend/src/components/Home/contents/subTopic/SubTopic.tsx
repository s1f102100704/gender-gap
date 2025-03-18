import { Link } from "react-router-dom";
import styles from "./subTopic.module.css"
import WeekPopularTopic from "./displayTopic/weekPopularTopic";

const SubTopic = () => {
    return (
        <div className={styles.subTopic}>
            <div className={styles.createTopic}><Link to="/make_topic">New Topic</Link></div>
            <div className={styles.weekTopic}>< WeekPopularTopic /></div>
        </div>
    )
}

export default SubTopic;