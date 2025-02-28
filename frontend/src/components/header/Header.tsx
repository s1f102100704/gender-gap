
import styles from "./header.module.css"
import maleImg from "../../assets/male.png"
import femaleImg from "../../assets/female.png"
const Header =()=>{
    return (
        <div className={styles.header}>
            <div className={styles.banner}>
                <div className={styles.title}><img src={maleImg}/><img src ={femaleImg}/></div>
            </div>
            <div className={styles.kaiten}>
                <div className={styles.sushi}>男女論を毎日おしゃべり</div>
            </div>
        </div>

    )
}

export default Header