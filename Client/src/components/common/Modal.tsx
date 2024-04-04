import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../axios/api";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void; // onClose function type
  email:string
}

function Modal({ isVisible, onClose  , email}: ModalProps) {
  if (!isVisible) return null;

  const handleClose = () => {
    onClose(); // Call onClose function when the close button is clicked
  };
  const navigate =  useNavigate()
  const [otp , setOtp] = useState('')
  const handleSubmit =async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
        const {data} = await api.post('/user/otp/verify',{
            email:email,
            otp
        })
        if(!data.success){
            toast.error(data.message)
            return
        }else{
            toast.success("Welcome to SkillUp")
            navigate('/')
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
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleClose}>
          x
        </button>
        <div className="bg-white p-2 rounded-lg">
        <form onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="number"
            onChange={(e) => setOtp(e.target.value)}
            name="otp"
            placeholder="Enter your OTP Here"
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
        </div>
      </div>
    </div>
  );
}

export default Modal;
