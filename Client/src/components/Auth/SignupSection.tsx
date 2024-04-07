import React, { useState } from "react";
import api from "../../axios/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

function SignupSection() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/user/register", {
        name,
        email,
        password,
        confirmPassword,
        username,
      });
      if (data.success) {
        localStorage.setItem("skillUpToken", data.token);
        const response = await api.post("/user/otp", {
          email,
          isRegistration: true,
        });
        if (response) {
          setShowModal(true);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
      console.error("AxiosError:", error);
      const errorMessage =
        error.response?.data.message || "An error occurred while processing the request";
      toast.error(errorMessage);
    }
  };

  const handleOTPSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/user/otp/verify", {
        email,
        otp,
      });
      if (data.success) {
        toast.success("Welcome to SkillUp");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
      console.error("AxiosError:", error);
      const errorMessage =
        error.response?.data.message || "An error occurred while processing the request";
      toast.error(errorMessage);
    }
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    toast.success("User registered successfully");
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        </button >
      </form>

      <Modal isVisible={showModal} onClose={closeModalAndNavigate}>
        <div className="flex justify-between items-center mb-4">
          <h3>Enter OTP</h3>
          <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleOTPSubmit}>
          {/* OTP input field */}
          <button type="submit" className="btn-primary">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default SignupSection;
