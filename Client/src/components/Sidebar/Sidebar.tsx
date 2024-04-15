import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUser, selectUser } from "../../Redux/slice/authSlice";

import {
  MdDashboard,
  MdLogout,
  MdPlayLesson,
  MdAdminPanelSettings,
  MdCategory,
} from "react-icons/md";
import {
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";
import { AppDispatch } from "../../Redux/store";
import toast from "react-hot-toast";

function Sidebar() {
  const token = localStorage.getItem("skillUpToken");
  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set collapsed state accordingly
      setCollapsed(window.innerWidth <= 768); // You can adjust the width threshold
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Initialize the collapsed state on component mount
    handleResize();

    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, dispatch]);
  const logoutUser = () => {
    localStorage.removeItem("skillUpToken");
    dispatch(cleanUser());
    toast.success("Admin Logged Out!");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      toast.success("Log In to your account");
      navigate("/login");
    } else if (user && user.role !== "admin") {
      toast.error("You have no administration access");
      navigate("/");
    }
  }, [token, user, navigate]);
  
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
  <div className="px-4 py-6">
    <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
      SkillUp Admin 
    </span>

    <ul className="mt-6 space-y-1">
      <li>
        <Link to={'/admin'}
        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
        Dashboard
        </Link>
      </li>

      <li>
      <Link to={'/admin/students'}
        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        Students
        </Link>
      
      </li>

      <li>
      <Link to={'/admin/instructor'}
        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        Instructor
        </Link>
      
      </li>
      <li  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" onClick={logoutUser}>
        logout
      </li>

      
    </ul>
  </div>

  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="size-10 rounded-full object-cover"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">Eric Frusciante</strong>

          <span> eric@frusciante.com </span>
        </p>
      </div>
    </a>
  </div>
</div>
  );
}

export default Sidebar;
