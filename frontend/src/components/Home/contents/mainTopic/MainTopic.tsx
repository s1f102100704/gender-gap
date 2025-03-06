import useRecentTopic from "../../../../hook/mainTopic/useRecentSelectTopic";
import styles from "./mainTopic.module.css";
import SelectTypeTopic from "./selectTypeTOpic/SelectTypeTopic";
import DisplayTopic from "./displayTopic/DisplayTopic";
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
