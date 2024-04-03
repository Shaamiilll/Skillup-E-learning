
import Sidebar from '../components/Sidebar/Sidebar';
import AdminDashboard from "../components/Dashboard/AdminDashboard"
function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-row p-0">
      <div>
        <Sidebar />
      </div>
      <div className="">
        <AdminDashboard/>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
