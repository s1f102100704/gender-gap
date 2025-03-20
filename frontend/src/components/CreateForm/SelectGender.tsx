import React from "react";
import styles from "./selectGender.module.css";

interface Props {
  mustSelectGender: string;
  setMustSelectGender: (value: string) => void;
  setGender: (value: 0 | 1 | 2) => void;
  gender: number;
}

const SelectGender: React.FC<Props> = (props) => {
  const { mustSelectGender, setMustSelectGender, setGender, gender } = props;
  return (
    <div>
      <div className={styles.selectGender}>
        <label className={styles.checkboxContainer}>
          <input
            type="radio"
            name="gender"
            className={styles.customCheckbox}
            value="1"
            checked={gender === 1}
            onChange={(e) => {
              setGender(Number(e.target.value) as 1 | 2);
              setMustSelectGender("");
            }}
          />
          <span className={styles.checkboxUi}></span>
          <label>男性</label>
        </label>
        <label className={styles.checkboxContainer}>
          <input
            type="radio"
            name="gender"
            className={styles.customCheckbox}
            value="2"
            checked={gender === 2}
            onChange={(e) => {
              setGender(Number(e.target.value) as 1 | 2);
              setMustSelectGender("");
            }}
          />
          <span className={styles.checkboxUi}></span>
          <label>女性</label>
        </label>
      </div>
      {mustSelectGender && <p>{mustSelectGender}</p>}
    </div>
  );
};

export default SelectGender;
