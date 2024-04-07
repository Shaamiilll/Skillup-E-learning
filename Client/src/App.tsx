import { useEffect, Suspense, lazy } from "react";
import Spinner from "./components/common/Spinner";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./App.css";
import { useDispatch } from "react-redux";
import { getUser } from "./Redux/actions/authAction";
import { AppDispatch } from "./Redux/store";


const LandingPage = lazy(() => import('./Pages/LandingPage'))
const SignupPage = lazy(()=> import ('./Pages/SignupPage'))
const LoginPage = lazy(()=> import('./Pages/LoginPage'))
const AdminDashboardPage = lazy(()=> import('./Pages/AdminDashboardPage'))
const AdminUserManagement = lazy(()=> import('./Pages/AdminUserManagement'))

function App() {
  const Dispatch :AppDispatch= useDispatch()
  const token = localStorage.getItem("SkillUpToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Dispatch(getUser());
      } catch (error) {
        console.error("Error fetching user data :", error);
        toast.error("Error fetching user data");
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  return (
      <>
        <div className="min-h-screen  ">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<Spinner />}><SignupPage /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<Spinner />}><LoginPage /></Suspense>} />
              <Route path="/admin" element={<Suspense fallback={<Spinner />}><AdminDashboardPage /></Suspense>} />
              <Route path="/admin/students" element={<Suspense fallback={<Spinner />}><AdminUserManagement /></Suspense>} />
            </Routes>
          </BrowserRouter>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </>
    ); 
}

export default App;
