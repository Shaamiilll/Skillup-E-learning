import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import axios from "axios";
import toast from "react-hot-toast";

interface GetCoursesArgs {
  search: string;
  isInstructor: boolean;
}

export const getCourses = createAsyncThunk(
  "courses/getcourses",
  async ({ search, isInstructor }: GetCoursesArgs, { rejectWithValue }) => {
    try {
      const response = await api.get(
        search
          ? `/course/${isInstructor ? "instructor" : ""}`
          : `/course/${isInstructor ? "instructor" : ""}`
      );
      if(!response.data.courses){
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.courses;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching user:", error);
        toast(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  }
);
