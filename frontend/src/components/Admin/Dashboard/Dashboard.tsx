import Sidebar from "../Dashboard/sideBar/SideBar";
import { useAdminData } from "../../../hook/adminData/useAdminData";



const Dashboard = () => {

    const { admin, logout } = useAdminData();

    return (
        <div>
            <Sidebar admin={admin} />
        </div>
    );
};

export default Dashboard;