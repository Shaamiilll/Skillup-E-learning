import React, { useEffect, useState } from 'react';
import api from '../../axios/api';
import toast from 'react-hot-toast';

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
}

function LearningList() {
  const [learnings , setLearnings] = useState<ILearnings[]>([]);

  const getLearnings = async () => {
    try {
      const res = await api.get("/user/learnings");
      console.log(res);
      
      setLearnings(res.data.learnings);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      window.location.href = "/";
    }
  }

  useEffect(() => {
    getLearnings()
  }, []);

  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
      <div className="bg-cover w-full flex justify-center items-center" style={{backgroundImage: 'url("/images/mybackground.jpeg")'}}>
        <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
          <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
              {learnings.map((learning: ILearnings) => (
                <article key={learning._id} className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
                  <div className="relative mb-4 rounded-2xl">
                    <img className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105" src={learning.course.thumbnail} alt=""/>
                  </div>
                  <h3 className="font-medium text-xl leading-8">{learning.course.title}</h3>
                  <p className="text-sm text-gray-500"> {learning.course.description.substring(0, 60)}...</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningList;
