import BasicHeader from '../components/Headers/BasicHeader'
import Footer from '../components/Footer/Footer'
import ProfileTab from '../components/Profile/ProfileTab'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function ProfilePage() {
    const token = localStorage.getItem("skillUpToken");
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        toast.error("Logging to access");
        navigate("/login");
      }
    }, [token]);
  return (
    <div className="pl-20 pt-10 pr-20">
      <div className="">
        <BasicHeader />
      </div>
      <div className="min-h-[80vh]">
        <ProfileTab />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage