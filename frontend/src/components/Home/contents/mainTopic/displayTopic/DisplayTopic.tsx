import React from "react";
import styles from "./displayTopic.module.css";
import RecentTopic from "./recentTopic/RecentTopic";
interface props {
  selectedTopic: "popular" | "recent";
}

const DisplayTopic: React.FC<props> = (props) => {
  const { selectedTopic } = props;
  return (
    <>
      <div className={styles.displayTopic}>
        {selectedTopic == "popular" ? <div>popular</div> : <RecentTopic />}
      </div>
    </>
  );
};
export default DisplayTopic;
