// import React from 'react'
import BasicHeader from "../components/Headers/BasicHeader";
import CourseList from "../components/List/CourseList";
import Footer from "../components/Footer/Footer";

function CoursesPage() {
  return (
    <div className="pl-20 pt-10 pr-20">
      <div className="">
        <BasicHeader />
      </div>
      <div className="min-h-[80vh]">
        <CourseList />
      </div>
      <Footer/>
    </div>
  );
}

export default CoursesPage;
