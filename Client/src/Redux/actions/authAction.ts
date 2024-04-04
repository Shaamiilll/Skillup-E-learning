import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import axios from "axios";
import toast from "react-hot-toast";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/find");
      if (!response.data.user) {
        toast.error(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.error("Error fetching user:", error);
        localStorage.removeItem("skillUpToken");
        return rejectWithValue(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error fetching user:", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
