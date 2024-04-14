import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import AdminInstructor from '../components/Tables/AdminInstructor'


function AdminInstructorManagement() {
  return (
    <div className="min-h-screen flex gap-32 flex-row p-0">
    <div>
      <Sidebar/>
    </div>
    <div className="">
      <AdminInstructor/>
    </div>
  </div>
  )
}

export default AdminInstructorManagement