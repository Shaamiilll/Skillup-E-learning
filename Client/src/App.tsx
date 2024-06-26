import { useEffect, Suspense, lazy } from "react";
import Spinner from "./components/common/Spinner";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./App.css";
import { useDispatch } from "react-redux";
import { getUser } from "./Redux/actions/authAction";
import { AppDispatch } from "./Redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";



const LandingPage = lazy(() => import('./Pages/LandingPage'))
const SignupPage = lazy(()=> import ('./Pages/SignupPage'))
const LoginPage = lazy(()=> import('./Pages/LoginPage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const AdminDashboardPage = lazy(()=> import('./Pages/AdminDashboardPage'))
const AdminUserManagement = lazy(()=> import('./Pages/AdminUserManagement'))
const AdminInstructorManagement = lazy(()=> import('./Pages/AdminInstructorManagement'))
const InstructorHomePage = lazy(()=> import('./Pages/InstructorHomePage'))
const InstructorCoursePage = lazy(()=> import('./Pages/InstructorCoursePage'))
const AdminCoursePage = lazy(()=> import('./Pages/AdminCoursePage'))
const CoursePage = lazy(()=> import('./Pages/CoursePage'))
const MyLearningPage = lazy(() => import('./Pages/MyLearningPage'));
const PurchaseConfirmPage = lazy(() => import('./Pages/PurchaseConfirmPage'));

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
          <GoogleOAuthProvider clientId="368073935489-sl89s1t7g5lp5rbe3t3550u9j7me8i27.apps.googleusercontent.com">
            <Routes>
              <Route path="/" element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<Spinner />}><SignupPage /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<Spinner />}><LoginPage /></Suspense>} />
              <Route path="/admin" element={<Suspense fallback={<Spinner />}><AdminDashboardPage /></Suspense>} />
              <Route path="/admin/students" element={<Suspense fallback={<Spinner />}><AdminUserManagement /></Suspense>} />
              <Route path="/admin/instructor" element={<Suspense fallback={<Spinner />}><AdminInstructorManagement /></Suspense>} />
              <Route path="/instructor" element={<Suspense fallback={<Spinner />}><InstructorHomePage /></Suspense>} />
              <Route path="/instructor/courses" element={<Suspense fallback={<Spinner />}><InstructorCoursePage /></Suspense>} />
              <Route path="/admin/courses" element={<Suspense fallback={<Spinner />}><AdminCoursePage /></Suspense>} />
              <Route path="/course" element={<Suspense fallback={<Spinner />}><CoursePage /></Suspense>} />
              <Route path="/mylearning" element={<Suspense fallback={<Spinner />}><MyLearningPage /></Suspense>} />
              <Route path="/purchase" element={<Suspense fallback={<Spinner />}><PurchaseConfirmPage/></Suspense>} />
              <Route path="/profile" element={<Suspense fallback={<Spinner />}><ProfilePage/></Suspense>} />
             
            </Routes>
            </GoogleOAuthProvider>
          </BrowserRouter>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </>
    ); 
}

export default App;
