import { useEffect, Suspense, lazy } from "react";
import "./App.css";
import Spinner from "./components/common/Spinner";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-hot-toast";

const LandingPage = lazy(() => import('./Pages/LandingPage'))
const SignupPage = lazy(()=> import ('./Pages/SignupPage'))

function App() {
  const token = localStorage.getItem("SkillUpToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // await dispatc
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
        <div className="min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<Spinner />}><SignupPage /></Suspense>} />
              <Route path="/" element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
              <Route path="/" element={<Suspense fallback={<Spinner />}><LandingPage /></Suspense>} />
            </Routes>
          </BrowserRouter>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </>
    ); 
}

export default App;
