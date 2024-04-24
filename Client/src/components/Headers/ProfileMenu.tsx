import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser, selectUser } from "../../Redux/slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem("skillUpToken")
        dispatch(cleanUser())
        toast.success("Logout Successfully")
        navigate('/')
    }
  const userDetails = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event:any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left " ref={menuRef}>
      <div>
        <button
          type="button"
          className="rounded-full flex text-sm focus:outline-none"
          onClick={handleToggleMenu}
        >
          <img
            className="h-11 w-11 rounded-full mt-1"
            src={userDetails.user?.avatar}
            alt="User"
          />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 flex flex-col items-center"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <img
              src={userDetails.user?.avatar}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-gray-700">{userDetails.user?.name}</h1>
            <hr className="w-32 border-gray-300 my-2 opacity-35" />
            <a
              href="#"
              className="block px-4 py-2 text-sm mt-2 text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </a>
            <a
              onClick={()=>{navigate('/mylearning')}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              My Learning
            </a>
            <hr className="w-32 border-gray-300 my-2 opacity-35" />

            <a onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
