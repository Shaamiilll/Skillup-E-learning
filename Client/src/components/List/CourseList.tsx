import React, {  useEffect, useState } from "react";
// import ICourse from "../../../../Server/interfaces/course";
import { AppDispatch } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { selectcourse } from "../../Redux/slice/courseSlice";
// import { getCourses } from "../../Redux/actions/courseAction";
// import { BiStrikethrough } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import api from "../../axios/api";
import { selectUser } from "../../Redux/slice/authSlice";
import { getUser } from "../../Redux/actions/authAction";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

interface ILesson {
  title: string;
  content: string;
  duration: number | string;
}
interface IReviews {
  user: { name: string; _id: string };
  rating: number;
  feedback: string;
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
  reviews: IReviews[];
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
    reviews: [],
    thumbnail: "",
    price: 0,
    offer: 0,
    summaryVideo: "",
  });

  const token = localStorage.getItem("skillUpToken");
  const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  // const course = useSelector(selectcourse).courses;
  const user = useSelector(selectUser).user;
  const [review, setReview] = useState({
    user: user?._id,
    rating: "1",
    feedback: "",
  });

  const submitReview = async () => {
    if (token) {
      try {
        console.log(review);

        await api.patch("/course/review", {
          user: user?._id,
          feedback: review.feedback,
          rating: review.rating,
          courseId: courseDetails._id,
        });
        toast("Review submitted, updated after a while.");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Login to your account to review on course");
    }
    setReview({
      user: "",
      rating: "",
      feedback: "",
    });
  };

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
            console.log(selected);
            
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
      const stripePromise = loadStripe(
        "pk_test_51P8oGZSGNSmTI5FSaomiNowkmg63nBjv7grwEfa3PbpZdmpFhYQDVfG4lVXZxlZwoCk3NiBUe2mWVbxSudSU4b5i00JAOOcuCX"
      );
      await stripePromise;
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
                    width="1000"
                    height="562.5"
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
            <div className="my-3 flex justify-center ">
              <div className="border lg:w-[50%] px-5 py-2 rounded-xl">
                <p className="text-xl font-bold">
                  What you will learn in this Course
                </p>
                <p className="font-semibold">
                  Course By{" "}
                  {(courseDetails.instructor as { name: string }).name}
                </p>
                <p className=" mt-2 px-5">
                  {courseDetails.description.substring(0, 100)}...
                </p>
              </div>
            </div>
            <div className="mt-3 border-2 px-6 rounded-xl py-2">
              <p className="text-2xl font-medium">Course Content</p>
              <div className="my-2 max-h-[50vh] overflow-y-auto overflow-x-hidden">
                {courseDetails.lessons.map((lesson, index) => (
                  <p className="border px-10 py-2 text-lg truncate">
                    {`${index + 1}. `}
                    {lesson.title.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex w-full border justify-between ">
                <div className="flex w-full">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={review.feedback}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReview({ ...review, feedback: e.target.value })
                    }
                    className="bg-transparent py-2 px-4 w-full outline-none"
                    placeholder="Enter your feedback about this course.."
                  />
                  <div className="flex items-center px-2 gap-1">
                    <p>
                      <IoMdStar size={28} className="text-orange-500" />
                    </p>
                    <select
                      name=""
                      id=""
                      value={review.rating}
                      className="text-black px-4"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setReview({ ...review, rating: e.target.value })
                      }
                    >
                      <option value="1">1 </option>
                      <option value="2">2 </option>
                      <option value="3">3 </option>
                      <option value="4">4 </option>
                      <option value="5">5 </option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={submitReview}
                  className="bg-purple-700 px-4 hover:bg-purple-700/80"
                >
                  Review
                </button>
              </div>
              <p className="text-gray-300 text-xs">
                Update your review about this course
              </p>
            </div>
            <div className="px-3 py-2">
              <p className="text-xl font-medium">Reviews</p>
              <div className="flex h-[18vh] mt-2 w-full overflow-x-auto gap-2">
                {courseDetails.reviews?.map((review) => (
                  <div className="bg-purple-900/30 rounded-2xl px-5 py-2 w-[15rem]">
                    <div className="flex justify-between">
                      <p className="font-semibold">
                        By{" "}
                        {typeof review.user == "object"
                          ? review.user?.name
                          : review.user}
                      </p>
                      <div className="flex items-center text-orange-500">
                        {review.rating == 1 ? (
                          <IoMdStar size={18} />
                        ) : review.rating == 2 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 3 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 4 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : review.rating == 5 ? (
                          <>
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                            <IoMdStar size={18} />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm lg:text-md">
                      {review.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseList;
