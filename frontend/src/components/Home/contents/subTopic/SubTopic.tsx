import { Link } from "react-router-dom";
import styles from "./subTopic.module.css"
import WeekPopularTopic from "./displayTopic/WeekPopularTopic";
import SubTitleTopic from "./HeaderWeekPopularTopic/HeaderWeekPopularTopic";
import RecommendTitleTopic from "./recommendTitleTopic/recommendTitleTopic";
import RecommendTopic from "./recommendTopic/RecommendTopic";

const SubTopic = () => {
    return (
        <div className={styles.subTopic}>
            <div className={styles.createTopic}><Link to="/make_topic">New Topic</Link></div>
            <div className={styles.weekTopic}>
                < SubTitleTopic />
                < WeekPopularTopic />
            </div>
            <div className={styles.recommendTopic}>
                < RecommendTitleTopic />
                < RecommendTopic />
            </div>
        </div>
    )
}

export default SubTopic;