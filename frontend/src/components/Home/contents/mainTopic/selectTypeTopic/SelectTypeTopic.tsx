import styles from "./selectTypeTopic.module.css";
const SelectTypeTopic = () => {
  return (
    <div className={styles.selectTypeTopic}>
      <div className={styles.popularTopic}>人気トピック</div>
      <div className={styles.recentTopic}>新着トピック</div>
    </div>
  );
};
export default SelectTypeTopic;
