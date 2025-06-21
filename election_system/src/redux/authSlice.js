// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../hooks/useInsertData";
import { useGetData, useGetDataWithCookies } from "../hooks/useGetData";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await useInsertData(`api/login/`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "حدث خطأ غير متوقع"
      );
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await useGetData("api/users/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data|| "حدث خطأ غير متوقع"
      );
    }
  }
);

// Initial State
const initialState = {
  user: null,
  allUsers: [],
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // يمكنك إضافة reducers متزامنة هنا
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
