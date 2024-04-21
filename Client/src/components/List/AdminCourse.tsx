import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectcourse } from "../../Redux/slice/courseSlice";
import { AppDispatch } from "../../Redux/store";
import { getCourses } from "../../Redux/actions/courseAction";
import Modal from "../common/Modal";
import toast from "react-hot-toast";
import api from "../../axios/api";

function AdminCourse() {
  const dispatch: AppDispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [CourseId, serCourseId] = useState("");
  const courses = useSelector(selectcourse).courses;
  useEffect(() => {
    dispatch(getCourses({ search: "", isInstructor: false }));
  }, [dispatch]);

  const handleApprove = (courseId: any) => {
    serCourseId(courseId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirm: boolean) => {
    if (confirm) {
      try {
        const res = await api.patch("/course/update", {
          _id: CourseId,
          isApproved: true,
        });
        if (res) {
          toast.success("Course was approved");
        }

        dispatch(getCourses({ search: "", isInstructor: false }));
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while processing the request");
      }
    }
    setShowConfirmationModal(false);
  };

  return (
    <>
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
            <div></div>
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
                              {course.isApproved?<button
                                className="text-indigo-500 inline-flex items-center"
                              >
                                Approved
                              </button>:<button
                                className="text-indigo-500 inline-flex items-center"
                                onClick={() => handleApprove(course._id)}
                              >
                                Approve
                              </button>}
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
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      >
        <h3>Confirmation</h3>
        <p>Are you sure you want to proceed?</p>
        <div className="flex justify-center mt-4">
          <button
            className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleConfirmation(true)}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleConfirmation(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AdminCourse;
