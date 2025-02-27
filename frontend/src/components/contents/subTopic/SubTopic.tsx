import styles from "./subTopic.module.css"

const SubTopic =()=>{
    return (
        <div className={styles.subTopic}>
            <div className={styles.createTopic}>New Topic</div>
            <div className={styles.weekTopic}></div>
        </div>
    )
}

export default SubTopic;