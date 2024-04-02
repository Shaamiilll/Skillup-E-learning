import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/slice/authSlice";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../Redux/store";
import { getUser } from "../../Redux/actions/authAction";
import ProfileMenu from "./ProfileMenu"; // Import the ProfileMenu component

function AuthSection() {
  const token = localStorage.getItem("skillUpToken");
  const dispatch: AppDispatch = useDispatch();
  
  const userDetails = useSelector(selectUser);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [userDetails, token]);


  return (
    <div>
      <div className="flex gap-3">
        {userDetails.loading ? (
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        ) : userDetails.user ? (
          <>
            <div className="border px-5 py-3 rounded-full hover:cursor-pointer hover:text-white hover:bg-[#0D0C22] backdrop-blur-sm">
              <Link
                to={"/addskill"}
                className="hover:cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                <h1>Share work</h1>
              </Link>
            </div>
            <div className="cursor-pointer">
              <ProfileMenu/>
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <div className=" px-5 py-3 bg-white text-black rounded-full hover:cursor-pointer backdrop-blur-sm">
                <h1>Log in</h1>
              </div>
            </Link>

            <Link to={"/signup"}>
              <div className=" px-5 py-3 bg-[#0D0C22] text-white rounded-full hover:cursor-pointer hover:text-white hover:bg-[#262443] backdrop-blur-sm">
                <h1>Sign up</h1>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthSection;
