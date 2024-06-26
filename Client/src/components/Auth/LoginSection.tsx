import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../axios/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";

function LoginSection() {
  const token = localStorage.getItem("skillUpToken");
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    try {
      const accessToken = tokenResponse.access_token;
      const res = await api.post("/user/login", {
        googleAccessToken: accessToken,
      });
      if (!res.data.token) {
        toast(res.data.message);
        return;
      }
    
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      
      if (res.data.admin) {
        toast("Welcome back Admin, Good to see yah!");
        localStorage.setItem("skillUpToken", res.data.token);
        Navigate("/admin");
      } else {
        // await dispatch(getUser());
        toast("User logged In");
        localStorage.setItem("skillUpToken", res.data.token);
        location.href = "/";
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  useEffect(() => {
    if (token) {
      toast.error("User already logged In");
      Navigate("/");
    }
  }, [Navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/user/login", {
        email,
        password,
      });

      if (!data.token) {
        toast.error(data.message);
        return;
      }

      if (data.admin) {
        toast.success("Welcome back Admin, Good to see yah!");
        localStorage.setItem("skillUpToken", data.token);
        Navigate("/admin");
      } else {
        toast.success("user Logen In");
        localStorage.setItem("skillUpToken", data.token);
        location.href = "/";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 w-4/6 gap-4"
        >
          <div className="input-type">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            />
          </div>

          <button
            type="submit"
            className="flex justify-center text-md w-40 bg-green-500 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
          >
            Submit <span className="px-1"></span>
          </button>
          <button
            type="button"
            onClick={() => login()}
            className="flex items-center  gap-2 mt-9 bg-gradient-to-tr from-red-500 to-red-600 py-2 px-10 rounded-md"
          >
            <FaGoogle />
            Sign Up with Google
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginSection;
