
import styles from "./header.module.css"
import maleImg from "../../../assets/male.png"
import femaleImg from "../../../assets/female.png"
const Header =()=>{
    return (
        <div className={styles.header}>
            <div className={styles.banner}>
                <div className={styles.title}><img src={maleImg}/><img src ={femaleImg}/></div>
            </div>
            
        </div>

    )
}

export default Header