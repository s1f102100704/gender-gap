import useRecentTopic from "../../../../hook/mainTopic/useRecentSelectTopic";
import styles from "./mainTopic.module.css";
import SelectTypeTopic from "./selectTypeTopic/SelectTypeTopic";
import DisplayTopic from "./selectTypeTopic/DisplayTopic";
const MainTopic = () => {
  const { selectedTopic, setWhichTopic } = useRecentTopic();
  return (
    <div className={styles.mainTopic}>
      <SelectTypeTopic setWhichTopic={setWhichTopic} />
      <DisplayTopic selectedTopic={selectedTopic} />
    </div>
  );
};

export default MainTopic;
