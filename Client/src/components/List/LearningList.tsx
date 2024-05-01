import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { FaRegCirclePlay } from "react-icons/fa6";

interface ILearnings {
  _id: string;
  course: ICourse;
  progress: string[];
  certificate: boolean;
}

interface ILesson {
  _id?: string;
  title: string;
  content: string;
  duration: number | string;
}

interface ICourse {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  instructor: { name: string; _id?: string } | string;
  cover: string;
  lessons: ILesson[];
  announcements: string[];
  coupons?: string[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
  thumbnail: string;
  summaryVideo: string;
}

function LearningList() {
  const [learningsDetails, setLearningsDetails] = useState<ILearnings>();
  const [isLearningsView, setIsLearningsView] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const [learnings, setLearnings] = useState<ILearnings[]>([]);

  const getLearnings = async () => {
    try {
      const res = await api.get("/user/learnings");
      setLearnings(res.data.learnings);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getLearnings();
  }, []);

  return (
    <>
      {isLearningsView ? (
        <>
        <div className="flex justify-start px-4 pb-2">
            <button
              type="button"
              className="border flex items-center gap-1 rounded px-2 font-medium bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white"
              onClick={() => {
                setIsLearningsView(false);
                setLearningsDetails(undefined);
                setSelectedLesson(undefined);
         
              }}
            >
             Back
            </button>
          </div>
          <div className="lg:flex justify-between w-full  gap-4">
            <div className="lg:w-[70%] ">
              <div className="h-[90%] ">
                {selectedLesson ? (
                  <ReactPlayer
                    url={learningsDetails?.course.summaryVideo}
                    controls
                    playing={true}
                    light={learningsDetails?.course.thumbnail}
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "10px" }} 
                    playIcon={
                      <div className="flex flex-col items-center">
                        <FaRegCirclePlay
                          size={94}
                          className="text-green-50-700"
                        />
                        <p className="text-xl text-black-700/80 font-bold">
                          {selectedLesson?.title}
                        </p>
                      </div>
                    }
                    stopOnUnmount
                    // onProgress={(progress) => handleProgress(progress)}
                  />
                ) : (
                  <img
                    src={learningsDetails?.course.thumbnail}
                    alt=""
                    className="h-full w-full lg:rounded-xl shadow-xl shadow-purple-800/30"
                  />
                )}
              </div>
              <div className="flex gap-2 justify-center mt-5 text-sm lg:text-md">
                {/* <button
                  className={`px-4 py-1 border-2 hover:bg-white hover:text-black ${
                    !isAnnouncementView ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setIsAnnouncementView(false)}
                >
                  Overview
                </button> */}
                {/* <button
                  className={`px-4 py-1 border-2 hover:bg-white hover:text-black ${
                    isAnnouncementView ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setIsAnnouncementView(true)}
                >
                  Announcements
                </button> */}
                {/* <button
                  className={`px-4 py-1 border-2 hover:bg-white hover:text-black `}
                  onClick={() => setIsTestView(true)}
                  disabled={
                    learningsDetails?.certificate ||
                    !learningsDetails?.course.mcq.length
                  }
                >
                  Take Certificate
                </button> */}
              </div>
            </div>
            <div className="flex justify-center lg:w-[30%] px-3 lg:px-5 lg:py-5 py-2 text-start">
              <div className="border px-5 py-2 w-full ">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold my-2">
                  Course Lessons
                </p>
                <div className=" mt-5 h-[63vh]  overflow-y-auto overflow-x-hidden ">
                 
                   <div>
                   {learningsDetails?.course.lessons.map((lesson, index) => (
                     <div
                       key={lesson._id} // Add a unique key for each lesson
                       className="border px-4 py-2 line-clamp-1 w-full flex items-center gap-2 mb-2 truncate cursor-pointer"
                       onClick={() => setSelectedLesson(lesson)}
                     >
                       <p>{index + 1}</p> 
                       <p className="lg:text-lg truncate">{lesson.title}</p>
                     </div>
                   ))}
                 </div>
                 
            
                  <p className="text-xs text-gray-400 text-center">
                    These are the lessons of this course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative pt-2 lg:pt-2 min-h-screen">
            <div
              className="bg-cover w-full flex justify-center items-center"
              style={{ backgroundImage: 'url("/images/mybackground.jpeg")' }}
            >
              <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                    {learnings.map((learning: ILearnings) => (
                      <article
                        key={learning._id}
                        className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
                      >
                        <div
                          className="relative mb-4 rounded-2xl"
                          onClick={() => {
                            setLearningsDetails(learning);
                            setIsLearningsView(true);
                          }}
                        >
                          <img
                            className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                            src={learning.course.thumbnail}
                            alt=""
                          />
                        </div>
                        <h3 className="font-medium text-xl leading-8">
                          {learning.course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {" "}
                          {learning.course.description.substring(0, 60)}...
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LearningList;
