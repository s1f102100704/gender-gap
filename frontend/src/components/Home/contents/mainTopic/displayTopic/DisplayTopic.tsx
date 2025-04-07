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
        <div style={{ display: selectedTopic === "popular" ? "block" : "none" }}>
          <PopularTopic />
        </div>
        <div style={{ display: selectedTopic === "recent" ? "block" : "none" }}>
          <RecentTopic />
        </div>
      </div>
    </>
  );
};
export default DisplayTopic;
