import styles from "./header.module.css";
import maleImg from "../../../assets/male.png";
import femaleImg from "../../../assets/female.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.banner}>
          <div className={styles.title}>
            <img src={maleImg} />
            <img src={femaleImg} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
