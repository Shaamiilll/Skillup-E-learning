import React from 'react'
import InstructorSideBar from '../components/Sidebar/InstructorSidebar'
import InstructorCourse from '../components/List/InstructorCourse'

function InstructorCoursePage() {
  return (
    <div className="min-h-screen flex flex-row">
      <InstructorSideBar />
      <div className="w-full bg-slate-150">
        <div className="">
          <InstructorCourse />
        </div>
      </div>
    </div>
  )
}

export default InstructorCoursePage