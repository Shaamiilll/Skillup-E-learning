import mongoose from "mongoose";
import ICourse from "../interfaces/course";

const CourseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type:String
  },
  language: {
    type: String,
    default: "English",
  },
  level: {
    type: String,
  },
  lessons: [
    {
      content: String,
      title: String,
      Discription: String,
      video:String,
      description:String
    },
  ],
  preview: {
    type: String,
  },
  cover: {
    type: String,
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  thumbnail:{
    type:String
  },
  summaryVideo:{
    type:String,
  },
  enrollers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      user: { type: mongoose.Types.ObjectId, ref: "User" },
      rating: Number,
      feedback: String,
    },
  ],
});

const CourseModel = mongoose.model("Course", CourseSchema);


export default CourseModel;
