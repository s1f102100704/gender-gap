import styles from "./mainTopic.module.css";
import SelectTypeTopic from "./selectTypeTopic/SelectTypeTopic";
const MainTopic = () => {
  return (
    <div className={styles.mainTopic}>
      <SelectTypeTopic />
    </div>
  );
};

export default MainTopic;
