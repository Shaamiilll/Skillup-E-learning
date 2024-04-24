import axios from "axios";
import  { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

function PurchaseConfirmPage() {
  const token = localStorage.getItem("skillUpToken");
  const navigate = useNavigate();

  const createPurchase = async (purchase: {
    userId: string | null;
    courseId: string | null;
    price: string | null;
  }) => {
    try {
      await api.post("/order/create", purchase);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data?.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  let userId: string | null;
  let courseId: string | null;
  let price: string | null;
  const query = new URLSearchParams(window.localStorage.search);
  if (!query) {
    navigate("/");
  }

  if (query.get("success")) {
    userId = query.get("userId");
    courseId = query.get("courseId");
    price = query.get("price");
    toast.success("Course purchased successfully");
  }

  if (query.get("canceled")) {
    toast.error("Course purchase canceled, Try Later!");
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (!query) {
      navigate("/");
    }
  }, [token, navigate, query]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border px-4 py-1">
        <p className="font-bold text-xl text-green-600 text-start">
          Order SuccessFull
        </p>
        <p className="font-medium text-md">
          Purchased your course successfully, check MyLearning!
        </p>
        <div className="my-5">
          <button
            onClick={async () => {
              
              await createPurchase({ userId, courseId, price });
              navigate("/");
            }}
            className="border-2 rounded-lg px-2 py-1 "
          >
            Save & Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseConfirmPage;
