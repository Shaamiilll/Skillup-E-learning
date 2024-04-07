import React from 'react'
import AdminUser from '../components/Tables/AdminUser'
import Sidebar from '../components/Sidebar/Sidebar'

function AdminUserManagement() {
  return (
    
    <div className="min-h-screen flex flex-row p-0">
    <div>
      <Sidebar/>
    </div>
    <div className="">
      <AdminUser/>
    </div>
  </div>
  )
}

export default AdminUserManagement