import { Link } from "react-router-dom";
import styles from "./subTopic.module.css"
import WeekPopularTopic from "./displayTopic/WeekPopularTopic";
import HeaderWeekPopularTopic from "./HeaderWeekPopularTopic/HeaderWeekPopularTopic";
import RecommendTitleTopic from "./recommendTitleTopic/RecommendTitleTopic";
import RecommendTopic from "./recommendTopic/RecommendTopic";

const SubTopic = () => {
    return (
        <div className={styles.subTopic}>
            <Link to="/make_topic"><div className={styles.createTopic}>New Topic</div></Link>
            <div className={styles.weekTopic}>
                < HeaderWeekPopularTopic />
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