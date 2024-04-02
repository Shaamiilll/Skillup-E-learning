import mongoose from "mongoose";
import Iuser from "../interfaces/user";

const userSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "googleAuth",
  },
  avatar: {
    type: String,
    default:
      "https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png",
  },
  role: {
    type: String,
    default: "student",
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
