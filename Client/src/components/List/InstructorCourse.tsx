import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function InstructorCourse() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [newCourse, setNewCourse] = useState(false);
  const [courseSections, setCourseSections] = useState<number[]>([1]); // State to manage dynamic course sections

  const addMoreCourse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCourseSections([...courseSections, courseSections.length + 1]);
  };
  const courses = [
    {
      id: 1,
      name: "Data Science Fundamentals",
      description:
        "This course provides a comprehensive introduction to the field of data science, covering essential concepts, techniques, and tools used in data analysis and interpretation. Students will learn fundamental programming languages such as Python and R, along with libraries like Pandas, NumPy, and Matplotlib for data manipulation, visualization, and analysis. Additionally, the course explores statistical methods, machine learning algorithms, and data mining techniques to extract meaningful insights from data. Practical exercises and real-world case studies help students develop hands-on experience in data science workflows, including data cleaning, exploratory data analysis, model building, and evaluation. By the end of the course, students will have the foundational knowledge and skills to pursue further studies or careers in data science.",
      price: "$499",
      status: "PENDING",
    },
  ];

  return (
    <>
      {newCourse ? (
        <div className="p-10">
          <div className="shadow-lg p-4 rounded-md bg-gray-100 items-start">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Add Course</h1>
              <div className="flex gap-2">
                <button
                  className="p-4 flex items-center gap-1 border px-5 py-2 focus:outline-none rounded-md hover:bg-slate-900 hover:text-white"
                  onClick={() => {
                    setNewCourse(false);
                  }}
                >
                  Cancel
                </button>
                <button className="p-4 flex items-center gap-1 border px-5 py-2 focus:outline-none rounded-md hover:bg-slate-900 hover:text-white">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="p-8">
              <form className="max-w-4xl mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-first-name"
                    >
                      Course Title
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    {/* <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p> */}
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-state"
                    >
                      Course Category
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        {["Data Science", "Web developement", "Finance"].map(
                          (stateOption, index) => (
                            <option key={index} value={stateOption}>
                              {stateOption}
                            </option>
                          )
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-password"
                    >
                      Course Description
                    </label>
                    <textarea
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      placeholder="Add Your Description"
                    />
                    <p className="text-gray-600 text-xs italic text-start">
                      Make it as long and as crazy as you'd like
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-state"
                    >
                      Course Level
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        {["Beginner", "Intermediate", "Advanced"].map(
                          (stateOption, index) => (
                            <option key={index} value={stateOption}>
                              {stateOption}
                            </option>
                          )
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-state"
                    >
                      Language
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        {[
                          "English",
                          "Malayalam",
                          "Hindi",
                          "Spanish",
                          "Arabic",
                        ].map((stateOption, index) => (
                          <option key={index} value={stateOption}>
                            {stateOption}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-zip"
                    >
                      Price
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 pb-2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                    htmlFor="grid-zip"
                  >
                    thumbnail
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="file"
                    placeholder="90210"
                    accept="image/*"
                  />
                </div>
                <div className="w-full md:w-1/3 pb-2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                    htmlFor="grid-zip"
                  >
                    Summary Video
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="file"
                    placeholder="90210"
                    accept="video/*"
                  />
                </div>

                <div className="border rounded-md border-gray-400 p-4 ">
                  <h1 className="text-start font-extrabold">Lessons</h1>
                  {courseSections.map((section) => (
                    <div
                      key={section}
                      className="border rounded-md border-gray-400 p-4 mb-4"
                    >
                      <h1 className="text-start font-semibold">Lesson {section}</h1>
                      <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                          htmlFor={`grid-course-title-${section}`}
                        >
                          Course Title
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id={`grid-course-title-${section}`}
                          type="text"
                          placeholder="Jane"
                        />
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                            htmlFor="grid-password"
                          >
                            Course Description
                          </label>
                          <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            placeholder="Add Your Description"
                          />
                          <p className="text-gray-600 text-xs italic text-start">
                            Make it as long and as crazy as you'd like
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 pb-2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                    htmlFor="grid-zip"
                  >
                  Lesson Video
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="file"
                    placeholder="90210"
                    accept="video/*"
                  />
                </div>

                    </div>
                  ))}
                  <div className="p-3">
                    <button
                      className="items-center gap-1 border px-5 py-2 focus:outline-none bg-slate-900 text-white rounded-md hover:bg-gray-200 hover:text-black"
                      onClick={addMoreCourse}
                    >
                      Add More
                    </button>
                  </div>
                </div>

                <div>
                  <button className="p-4 flex items-center gap-1 border px-5 py-2 focus:outline-none bg-slate-900 text-white rounded-md hover:bg-gray-200 hover:text-black">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10">
          <div className="shadow-lg p-4 rounded-md bg-gray-100">
            <div className="flex justify-between rounded-md">
              <div>
                <h1 className="font-bold text-xl">Your Courses</h1>
                <input
                  type="text"
                  name="name"
                  placeholder="Search your course"
                  className="border px-5 py-2 focus:outline-none rounded-md"
                />
              </div>
              <div>
                <button
                  className="p-4 flex items-center gap-1 border px-5 py-2 focus:outline-none rounded-md hover:bg-slate-900 hover:text-white"
                  onClick={() => {
                    setNewCourse(true);
                  }}
                >
                  CREATE <FaPlus size={14} />
                </button>
              </div>
            </div>

            <div>
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-100">
                  <section>
                    <section className="text-gray-600 body-font">
                      <div className="container px-1 py-2 mx-auto">
                        <div className="p-3 bg-white flex items-center mx-auto border-b mb-5 border-gray-200 rounded-lg sm:flex-row flex-col">
                          <div className="sm:w-32 sm:h-24 h-16 w-16 sm:mr-6 inline-flex items-center justify-center flex-shrink-0 rounded-xl">
                            <img
                              className="object-cover h-32 w-96 rounded-md"
                              src="https://cdn.dribbble.com/userupload/13812893/file/original-f60490f0b5f72496a42481f24f3aa299.png?resize=1504x1128"
                            />
                          </div>
                          <div className="flex-grow sm:text-left text-center mt-4 sm:mt-0">
                            <h1 className="text-black text-xl sm:text-2xl title-font font-bold mb-2">
                              {course.name}
                            </h1>
                            <p className="leading-relaxed text-base">
                              {course.description.substring(0, 200)}...
                            </p>
                            <div className="flex justify-between mt-4">
                              <div>
                                <span className="text-purple-500 font-bold">
                                  Status:
                                </span>{" "}
                                <span className="text-purple-500">
                                  {course.status}
                                </span>
                              </div>
                              <div>
                                <span className="text-purple-500 font-bold">
                                  Price:
                                </span>{" "}
                                <span className="text-purple-500">
                                  {course.price}
                                </span>
                              </div>
                              <div>
                                <button className="text-indigo-500 inline-flex items-center">
                                  Detail/edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstructorCourse;
