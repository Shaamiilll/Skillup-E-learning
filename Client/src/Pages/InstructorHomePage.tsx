import { useSelector } from "react-redux";
import { selectUser } from '../Redux/slice/authSlice';
import InstructorSidebar from "../components/Sidebar/InstructorSidebar"
import InstructorDashboard from '../components/Dashboard/InstructorDashboard';

function InstructorHomePage() {
    const user = useSelector(selectUser).user;
    console.log(user)

  return (
    <div className={`${user?.verified && "min-h-screen flex flex-row"}`}>
      <InstructorSidebar />
      {user?.verified && (
        <div className="w-full ">
          <InstructorDashboard />
          {/* <Footer/> */}
        </div>
      )}
    </div>
  )
}

export default InstructorHomePage