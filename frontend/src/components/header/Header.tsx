
import styles from "./header.module.css"
const Header =()=>{
    return (
        <div className={styles.header}>
            <div className={styles.banner}>
                <div className={styles.title}>男女論.com</div>
            </div>
            <div className={styles.sushi}>
                男女論を毎日おしゃべり♪
            </div>
        </div>

    )
}

export default Header