import React from "react";
import { Link } from "react-router-dom";

function AuthSection() {
  // const userDetails = {
  //   user: "Shamil",
  //   avatar: "https://imgs.search.brave.com/k70MUyUbXHkPgrZRXYNsFnIl-ziV4O4tOBhUQ8X4o1A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FlL2Vj/L2MyL2FlZWNjMjJh/NjdkYWM3OTg3YTgw/YWMwNzI0NjU4NDkz/LmpwZw",
  // };
  const userDetails = null

  return (
    <div>
      <div className="flex gap-3">
        {userDetails ? (
          <>
            <div className="border px-5 py-3 rounded-full hover:cursor-pointer hover:text-white hover:bg-[#0D0C22] backdrop-blur-sm">
              <Link
                to={"/addskill"}
                className="hover:cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                <h1>Share work</h1>
              </Link>
            </div>
            <div>
              <img
                src={userDetails.avatar}
                alt=""
                className="rounded-full h-8"
              />
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <div className="border px-5 py-3 bg-white text-black rounded-full hover:cursor-pointer hover:text-white hover:bg-[#0D0C22] backdrop-blur-sm">
                <h1>Log in</h1>
              </div>
            </Link>

            <Link to={"/signup"}>
              <div className="border px-5 py-3 bg-[#0D0C22] text-white rounded-full hover:cursor-pointer hover:text-black hover:bg-white backdrop-blur-sm">
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
