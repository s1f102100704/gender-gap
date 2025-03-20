import styles from "./admin.module.css";
import Login from "../../components/Admin/login/LoginForm";
const Admin = () => {
    return (
        <div className={styles.body}>
            <Login />
        </div>
    );
};

export default Admin;
