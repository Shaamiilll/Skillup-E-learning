import React, { StrictMode, useEffect, useState } from "react";
import ICourse from "../../../../Server/interfaces/course";
import { AppDispatch } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectcourse } from "../../Redux/slice/courseSlice";
import { getCourses } from "../../Redux/actions/courseAction";
import { BiStrikethrough } from "react-icons/bi";
import api from "../../axios/api";
import { selectUser } from "../../Redux/slice/authSlice";
import { getUser } from "../../Redux/actions/authAction";
import { loadStripe } from "@stripe/stripe-js";

interface ILesson {
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
  preview?: string;
  cover: string;
  lessons: ILesson[];
  instructor: { name: string; _id: string } | string;
  thumbnail: string;
  price: number;
  offer: number;
  isApproved?: boolean;
  isBlock?: boolean;
  summaryVideo: string;
}
function CourseList() {
  const [courseDetails, setCourseDetails] = useState<ICourse>({
    _id: "",
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    cover: "",
    lessons: [],
    instructor: "",
    thumbnail: "",
    price: 0,
    offer: 0,
    summaryVideo: "",
  });

  const token = localStorage.getItem("skillUpToken");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const course = useSelector(selectcourse).courses;
  const user = useSelector(selectUser).user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `search`
            ? `/course/${false ? "instructor" : ""}`
            : `/course/${true ? "instructor" : ""}`
        );
        if (id) {
          const selected = response.data.courses.find(
            (course: any) => course._id === id
          );
          if (selected) {
            setCourseDetails(selected);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function inside useEffect
  }, [id]); // Add id and isInstructor to the dependencies array

  const makepayment = async () => {
    if (token) {
      dispatch(getUser());
      const stripePromise= loadStripe(
        "pk_test_51P8oGZSGNSmTI5FSaomiNowkmg63nBjv7grwEfa3PbpZdmpFhYQDVfG4lVXZxlZwoCk3NiBUe2mWVbxSudSU4b5i00JAOOcuCX"
      );
      const stripe = await stripePromise;
      const response = await api.post("/order/checkout-session", {
        course: courseDetails,
        userId: user?._id,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    }
  };

  return (
    <>
      <div>
        <div className="min-w-screen min-h-screen  flex items overflow-hidden relative">
          <div className="w-full  rounded bg-white p-10 lg:p-10 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <video
                    className="rounded-xl"
                    width="1000" // Increased width
                    height="562.5" // Adjusted height to maintain aspect ratio (16:9)
                    controls
                    src={courseDetails.summaryVideo}
                  ></video>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {courseDetails.title}
                  </h1>
                  <p className="text-sm">
                    {courseDetails.description}
                    <a
                      href="#"
                      className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                    >
                      MORE <i className="mdi mdi-arrow-right"></i>
                    </a>
                  </p>
                </div>
                <div>
                  <div className="inline-block align-bottom mr-5">
                    <span className="text-2xl leading-none align-baseline">
                      $
                    </span>
                    <span className="font-bold text-5xl leading-none align-baseline">
                      {courseDetails.price}
                    </span>
                    <span className="text-2xl leading-none align-baseline">
                      .99
                    </span>
                  </div>
                  <div className="inline-block align-bottom">
                    <button
                      className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                      onClick={makepayment}
                    >
                      <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseList;
