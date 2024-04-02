import axios from "axios";
import React, { useReducer, useState } from "react";
import api from "../../axios/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignupSection() {
  const naviagte = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const { data } = await api.post("/user/register", {
            name,
            email,
            password,
            confirmPassword,
            username
        });
        if (data.success === true) {
            toast.success('Login Succesfull. Welcome!');
            localStorage.setItem("skillUpToken", data.token)
            naviagte('/')
        } else {
            toast.error(data.message);
        }
    } catch (error:any) {
        // Handle Axios errors
        console.error("AxiosError:", error);
        if (error.response) {
            // If the error has a response from the server
            const errorMessage = error.response.data.message || "An error occurred while processing the request";
            toast.error(errorMessage);
        } else {
            // If the error does not have a response (e.g., network error)
            toast.error("An error occurred while processing the request");
        }
    }
};

  return (
    <>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 w-4/6 gap-4">
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
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
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            name="confirmPassword"
            placeholder="Confirmpassword"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center text-md w-40 bg-green-500 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
        >
          Submit <span className="px-1"></span>
        </button>
      </form>
    </>
  );
}

export default SignupSection;
