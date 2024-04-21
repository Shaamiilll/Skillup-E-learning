import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../axios/api";
import { useDispatch, useSelector } from "react-redux";
import { selectcourse } from "../../Redux/slice/courseSlice";
import { AppDispatch } from "../../Redux/store";
import { getCourses } from "../../Redux/actions/courseAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface CourseData {
  title: string;
  category: string;
  description: string;
  level: string;
  language: string;
  price: string;
  thumbnail: File | null;
  summaryVideo: File | null;
  lessons: Lesson[];
}

interface Lesson {
  title: string;
  description: string;
  video: File | null;
}

function InstructorCourse() {
  const Navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector(selectcourse).courses;
  useEffect(() => {
    dispatch(getCourses({ search: "", isInstructor: false }));
  }, [dispatch]);
  const [newCourse, setNewCourse] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    category: "",
    description: "",
    level: "",
    language: "",
    price: "",
    thumbnail: null,
    summaryVideo: null,
    lessons: [],
  });

  // Function to handle adding a new lesson
  const addLesson = () => {
    setCourseData({
      ...courseData,
      lessons: [
        ...courseData.lessons,
        { title: "", description: "", video: null },
      ],
    });
  };

  // Function to handle removing a lesson
  const removeLesson = (index: number) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons.splice(index, 1);
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleThumbnailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const secureUrl = await uploadFile(file);
      if (secureUrl) {
        console.log(secureUrl);

        setCourseData({ ...courseData, thumbnail: secureUrl });
      } else {
        setCourseData({ ...courseData, thumbnail: null });
      }
    } else {
      setCourseData({ ...courseData, thumbnail: null });
    }
  };

  const handleSummaryVideoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const secureUrl = await uploadFile(file);
      if (secureUrl) {
        console.log(secureUrl);

        setCourseData({ ...courseData, summaryVideo: secureUrl });
      } else {
        setCourseData({ ...courseData, summaryVideo: null });
      }
    } else {
      setCourseData({ ...courseData, summaryVideo: null });
    }
  };

  const handleLessonTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const lessons = [...courseData.lessons];
    lessons[index] = { ...lessons[index], title: e.target.value };
    setCourseData({ ...courseData, lessons });
  };

  const handleLessonDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const lessons = [...courseData.lessons];
    lessons[index] = { ...lessons[index], description: e.target.value };
    setCourseData({ ...courseData, lessons });
  };

  const handleLessonVideoChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const lessons = [...courseData.lessons];
    const file = e.target.files && e.target.files[0];
    lessons[index] = { ...lessons[index], video: file };
    setCourseData({ ...courseData, lessons });
  };

  const [courseSections, setCourseSections] = useState<number[]>([1]); // State to manage dynamic course sections

  const uploadFile = async (file: File | null) => {
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    console.log(file?.type);

    if (file?.type == "image/png" || "image/jpeg") {
      data.append("upload_preset", "images_preset");
      data.append("cloud_name", "db2kn0rhf");

      try {
        let api = "https://api.cloudinary.com/v1_1/db2kn0rhf/image/upload";
        const res = await axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        });
        const { secure_url } = res.data;
        return secure_url;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      data.append("upload_preset", "Video_preset");
      data.append("cloud_name", "db2kn0rhf");

      try {
        let api = "https://api.cloudinary.com/v1_1/db2kn0rhf/video/upload";
        const res = await axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        });
        const { secure_url } = res.data;
        return secure_url;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  };
  const saveCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", courseData.title);
      formData.append("category", courseData.category);
      formData.append("description", courseData.description);
      formData.append("level", courseData.level);
      formData.append("language", courseData.language);
      formData.append("price", courseData.price);
      if (courseData.thumbnail) {
        formData.append("thumbnail", courseData.thumbnail);
      }
      if (courseData.summaryVideo) {
        formData.append("summaryVideo", courseData.summaryVideo);
      }

      courseData.lessons.forEach((lesson, index) => {
        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][description]`, lesson.description);
        if (lesson.video) {
          formData.append(`lessons[${index}][video]`, lesson.video);
        }
      });

      // Make POST request using axios
      console.log(courseData);

      const response = await api.post("/course/create", courseData);
      if (response.data.success) {
        
        toast.success("Uploaded file");
        setNewCourse(false)

      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const addMoreCourse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCourseSections([...courseSections, courseSections.length + 1]);
  };

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
              <form className="max-w-4xl mx-auto" onSubmit={saveCourse}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                      htmlFor="grid-first-name"
                    >
                      Course Title
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      name="title"
                      value={courseData.title}
                      onChange={handleChange}
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
                        name="category"
                        value={courseData.category}
                        onChange={handleSelectChange}
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
                      name="description"
                      placeholder="Add Your Description"
                      value={courseData.description}
                      onChange={handleTextareaChange}
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
                        name="level"
                        value={courseData.level}
                        onChange={handleSelectChange}
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
                        name="language"
                        value={courseData.language}
                        onChange={handleSelectChange}
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
                      type="number"
                      placeholder="90210"
                      name="price" // Add name attribute here
                      value={courseData.price}
                      onChange={handleChange} // Create a new handler function
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
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="file"
                    name="thumbnail"
                    placeholder="90210"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                  {/* <div onClick={handleUpload}>button</div> */}
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
                    name="summaryVideo"
                    placeholder="90210"
                    accept="video/*"
                    onChange={handleSummaryVideoChange}
                  />
                </div>

                <div className="border rounded-md border-gray-400 p-4 ">
                  <h1 className="text-start font-extrabold">Lessons</h1>
                  {courseData.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="border rounded-md border-gray-400 p-4 mb-4"
                    >
                      <div className="flex justify-between p-3">
                        <h1 className="font-semibold">Lesson {index + 1}</h1>
                        <h1 onClick={() => removeLesson(index)}>Remove</h1>
                      </div>
                      <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-start"
                          htmlFor={`grid-course-title-${index}`}
                        >
                          Course Title
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id={`grid-course-title-${index}`}
                          type="text"
                          value={lesson.title}
                          onChange={(e) => handleLessonTitleChange(e, index)}
                          placeholder="Lesson Title"
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
                            value={lesson.description}
                            onChange={(e: any) =>
                              handleLessonDescriptionChange(e, index)
                            }
                            placeholder="Lesson Description"
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
                          onChange={(e) => handleLessonVideoChange(e, index)}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="p-3">
                    <button
                      className="items-center gap-1 border px-5 py-2 focus:outline-none bg-slate-900 text-white rounded-md hover:bg-gray-200 hover:text-black"
                      onClick={addLesson}
                    >
                      Add More
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="p-4 flex items-center gap-1 border px-5 py-2 focus:outline-none bg-slate-900 text-white rounded-md hover:bg-gray-200 hover:text-black"
                  >
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
                <div key={course.title} className="bg-gray-100">
                  <section>
                    <section className="text-gray-600 body-font">
                      <div className="container px-1 py-2 mx-auto">
                        <div className="p-3 bg-white flex items-center mx-auto border-b mb-5 border-gray-200 rounded-lg sm:flex-row flex-col">
                          <div className="sm:w-32 sm:h-24 h-16 w-16 sm:mr-6 inline-flex items-center justify-center flex-shrink-0 rounded-xl">
                            <img
                              className="object-cover h-28 w-96 rounded-md"
                              src={course.thumbnail}
                            />
                          </div>
                          <div className="flex-grow sm:text-left text-center mt-4 sm:mt-0">
                            <h1 className="text-black text-xl sm:text-2xl title-font font-bold mb-2">
                              {course.title}
                            </h1>
                            <p className="leading-relaxed text-base">
                              {course.description.substring(0, 200)}...
                            </p>
                            <div className="flex justify-between mt-4">
                              <div>
                                <span className="text-purple-500 font-bold">
                                  Status:
                                </span>{" "}
                                {course.isApproved ? (
                                  <button className="text-indigo-500 inline-flex items-center">
                                    Approved
                                  </button>
                                ) : (
                                  <button className="text-indigo-500 inline-flex items-center">
                                    Approve
                                  </button>
                                )}
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
