// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData, useInsertDataWithImage } from "../hooks/useInsertData";
import { useGetDataToken } from "../hooks/useGetData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const res = await useInsertDataWithImage("/api/register", formData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add Coordinator
export const addCoordinator = createAsyncThunk(
  "auth/addCoordinator",
  async (formData, thunkAPI) => {
    try {
      const response = await useInsertDataWithImage(
        "/api/coordinator/",
        formData
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في إضافة المنسق"
      );
    }
  }
);

// Get All Coordinators
export const getAllCoordinators = createAsyncThunk(
  "auth/getAllCoordinators",
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("api/coordinator/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "حدث خطأ غير متوقع"
      );
    }
  }
);

// Get One Coordinator
export const getCoordinator = createAsyncThunk(
  "auth/getCoordinator",
  async (userId, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/coordinator/${userId}/`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في جلب بيانات المنسق"
      );
    }
  }
);

// Add User
export const addUser = createAsyncThunk(
  "auth/addUser",
  async (userData, thunkAPI) => {
    try {
      const response = await useInsertDataWithImage("/api/users", userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "فشل في إضافة المستخدم"
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
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
      const response = await useGetDataToken("api/users/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "حدث خطأ غير متوقع"
      );
    }
  }
);

// Get One User
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/users/${userId}/`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في جلب بيانات المستخدم"
      );
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/users/${userId}/`);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "فشل في حذف المستخدم"
      );
    }
  }
);

// Initial State
const initialState = {
  user: null,
  singleUser: null,
  allUsers: [],
  loading: false,
  error: null,
  deleteSuccess: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Coordinator
      .addCase(addCoordinator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCoordinator.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addCoordinator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
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
      })

      // Get One User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleUser = null;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Coordinators
      .addCase(getAllCoordinators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoordinators.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload; // يمكنك تغيير الاسم إلى state.allCoordinators إذا رغبت بذلك
      })
      .addCase(getAllCoordinators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One Coordinator
      .addCase(getCoordinator.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleUser = null; // أو state.singleCoordinator
      })
      .addCase(getCoordinator.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload; // أو state.singleCoordinator
      })
      .addCase(getCoordinator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleUser = null; // أو state.singleCoordinator
      });
  },
});

export const authReducer = authSlice.reducer;
