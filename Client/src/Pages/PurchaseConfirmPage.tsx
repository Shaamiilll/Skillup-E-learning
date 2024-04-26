import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

interface Purchase {
  userId: string | null;
  courseId: string | null;
  price: string | null;
}

const PurchaseConfirmPage = React.memo(() =>{
  const token = localStorage.getItem("skillUpToken");
  const navigate = useNavigate();

  const createPurchase = async (purchase: Purchase) => {
    try {
      

      await api.post("/order/create", purchase);
      toast.success("Course purchased successfully");
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const query = new URLSearchParams(window.location.search);
  let userId: string | null = query.get("userId");
  let courseId: string | null = query.get("courseId");
  let price: string | null = query.get("price");

  if (!query || !userId || !courseId || !price) {
    navigate("/");
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  
    if (!query || !userId || !courseId || !price) {
      navigate("/");
      return;
    }
  
    createPurchase({ userId, courseId, price });
  }, []); 
  
  return (
    <div className="h-screen flex justify-center items-center">
    <div className="border px-4 py-1">
      <p className="font-bold text-xl text-green-600 text-start">
        Order Successful
      </p>
      <p className="font-medium text-md">
        Purchased your course successfully, check MyLearning!
      </p>
      <div className="my-5">
        <button
          onClick={async () => {
            navigate("/");
          }}
          className="border-2 rounded-lg px-2 py-1"
        >
          Save & Go Back
        </button>
      </div>
    </div>
  </div>
    
  );
})

export default PurchaseConfirmPage;
