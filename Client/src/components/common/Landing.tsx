import  { useEffect, useState } from "react";
import api from "../../axios/api";
import Icourse from "../../../../Server/interfaces/course"
function Landing() {

  const [courses , setCourse] = useState<Icourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('course')
        setCourse(response.data.courses)
      } catch (error) {
       console.log(error);
      }
    };
    fetchData();
  }, []); 
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-[#EFB9B9] rounded-full px-4 py-3 mb-4">
          <h1 className="text-center">3000 + Creative content</h1>
        </div>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Learn. Create. Excel</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your Gateway to Skillful Success
        </p>
        <p className="text-sm text-gray-600">
          Unlock Your Potential, Unleash Your Creativity, and Achieve Mastery
          with Expert Guidance
        </p>
        <button className="bg-[#0D0C22] text-white py-4 px-6 rounded-full mt-8 hover: transition duration-300">
          Explore More
        </button>
      </div>

      {/* Popular Courses */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Course Cards */}
        {/* Repeat this block for each course */}
        {courses.map((value) => (
          <div key={String(value._id)} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={value?.thumbnail}
              alt="Course"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{value?.title}</h3>
            <p className="text-sm text-gray-600">{value?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
