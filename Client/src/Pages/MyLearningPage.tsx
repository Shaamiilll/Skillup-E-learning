import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BasicHeader from "../components/Headers/BasicHeader";
import Footer from "../components/Footer/Footer";
import LearningList from "../components/List/LearningList";

function MyLearningPage() {
  const token = localStorage.getItem("skillUpToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Login to access");
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div className="pl-20 pt-10 pr-20">
      <div className="">
        <BasicHeader />
      </div>
      <div className="min-h-[80vh]">
        <LearningList />
      </div>
      <Footer />
    </div>
  );
}

export default MyLearningPage;
