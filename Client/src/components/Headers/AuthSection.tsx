import React from 'react'
import { Link } from 'react-router-dom'

function AuthSection() {
  const userDetails=null
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
            <div className="border px-5 py-3 bg-white text-black rounded-full hover:cursor-pointer hover:text-white hover:bg-[#0D0C22] backdrop-blur-sm">
              <Link
                to={"/login"}
                className="hover:cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                <h1>Log in</h1>
              </Link>
            </div>
            <div className="border px-5 py-3 bg-[#0D0C22] text-white rounded-full hover:cursor-pointer hover:text-black hover:bg-white backdrop-blur-sm">
              <Link
                to={"/signup"}
                className="hover:cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                <h1>Sign up</h1>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthSection