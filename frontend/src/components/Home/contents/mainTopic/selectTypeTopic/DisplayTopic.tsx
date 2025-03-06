import React from "react";
import styles from "./displayTopic.module.css";
interface props {
  selectedTopic: "popular" | "recent";
}

const DisplayTopic: React.FC<props> = (props) => {
  const { selectedTopic } = props;
  return (
    <>
      <div className={styles.displayTopic}>
        {selectedTopic == "popular" ? (
          <div>popular</div>
        ) : (
          <div>人気のトピック</div>
        )}
      </div>
    </>
  );
};
export default DisplayTopic;
