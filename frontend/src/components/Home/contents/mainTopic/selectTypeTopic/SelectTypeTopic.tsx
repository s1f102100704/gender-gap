import styles from "./selectTypeTopic.module.css";
interface Props {
  setWhichTopic: (params: { [key: string]: string }) => void;
}

const SelectTypeTopic: React.FC<Props> = (props) => {
  const { setWhichTopic } = props;

  return (
    <div className={styles.selectTypeTopic}>
      <div
        className={styles.popularTopic}
        onClick={() => setWhichTopic({ selectedTopic: "popular" })}
      >
        人気トピック
      </div>
      <div
        className={styles.recentTopic}
        onClick={() => setWhichTopic({ selectedTopic: "recent" })}
      >
        新着トピック
      </div>
    </div>
  );
};
export default SelectTypeTopic;
