
import Sidebar from '../components/Sidebar/Sidebar';
import AdminCourse from '../components/List/AdminCourse';

function AdminCoursePage() {
    return (
        <div className="min-h-screen flex flex-row">
          <div>
            <Sidebar />
          </div>
          <div className="w-full  ">
            <AdminCourse />
          </div>
        </div>
      );
}

export default AdminCoursePage