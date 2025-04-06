import styles from "./displayTopic.module.css";
import RecentTopic from "./recentTopic/RecentTopic";
import PopularTopic from "./popularTopic/PopularTopic";
interface props {
  selectedTopic: "popular" | "recent";
}

const DisplayTopic: React.FC<props> = (props) => {
  const { selectedTopic } = props;
  return (
    <>
      <div className={styles.displayTopic}>
        {selectedTopic == "popular" ? <PopularTopic /> : <RecentTopic />}
      </div>
    </>
  );
};
export default DisplayTopic;
