// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData, useInsertDataWithImage } from "../hooks/useInsertData";
import { useGetDataToken } from "../hooks/useGetData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";
import {
  useInUpdateDataWithImage,
  useUpdateDataWithToken,
} from "../hooks/useUpdateData";

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

// Confirm Voting
export const confirmVoting = createAsyncThunk(
  "auth/confirmVoting",
  async (userId, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/confirm-voting/${userId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في تأكيد التصويت"
      );
    }
  }
);

// Toggle Active Status
export const toggleActive = createAsyncThunk(
  "auth/toggleActive",
  async (userId, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/toggle-active/${userId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في تغيير حالة التفعيل"
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        "/api/change-password/",
        passwordData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في تغيير كلمة المرور"
      );
    }
  }
);

// تم إزالة حذف منسق

// Add District Manager
export const addDistrictManager = createAsyncThunk(
  "auth/addDistrictManager",
  async (formData, thunkAPI) => {
    try {
      const response = await useInsertDataWithImage(
        "/api/district-manager/",
        formData
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في إضافة مدير المنطقة"
      );
    }
  }
);

// Get All District Managers
export const getAllDistrictManagers = createAsyncThunk(
  "auth/getAllDistrictManagers",
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("api/district-manager/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "حدث خطأ غير متوقع"
      );
    }
  }
);

// Get One District Manager
export const getDistrictManager = createAsyncThunk(
  "auth/getDistrictManager",
  async (userId, thunkAPI) => {
    try {
      const response = await useGetDataToken(
        `/api/district-manager/${userId}/`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في جلب بيانات مدير المنطقة"
      );
    }
  }
);

// Delete District Manager
export const deleteDistrictManager = createAsyncThunk(
  "auth/deleteDistrictManager",
  async (districtManagerId, thunkAPI) => {
    try {
      await useDeleteDataWithToken(
        `/api/district-manager/${districtManagerId}/`
      );
      return districtManagerId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "فشل في حذف مدير المنطقة"
      );
    }
  }
);

// Change User Role
export const changeUserRole = createAsyncThunk(
  "auth/changeUserRole",
  async ({ userId, roleData }, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/change-role/${userId}`,
        roleData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في تغيير دور المستخدم"
      );
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await useInUpdateDataWithImage(
        `/api/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "فشل في تحديث بيانات المستخدم"
      );
    }
  }
);

// Initial State
const initialState = {
  user: null,
  singleUser: null,
  allUsers: [],
  allDistrictManagers: [],
  loading: false,
  error: null,
  deleteSuccess: false,
  deleteDistrictManagerSuccess: false,
  confirmVotingSuccess: false,
  toggleActiveSuccess: false,
  changePasswordSuccess: false,
  changeRoleSuccess: false,
  updateUserSuccess: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetChangeRoleSuccess: (state) => {
      state.changeRoleSuccess = false;
    },
  },
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

      // تم إزالة إضافة منسق

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

      // تم إزالة جلب جميع المنسقين

      // تم إزالة جلب منسق واحد

      // Confirm Voting
      .addCase(confirmVoting.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.confirmVotingSuccess = false;
      })
      .addCase(confirmVoting.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmVotingSuccess = true;
        state.error = null;
      })
      .addCase(confirmVoting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.confirmVotingSuccess = false;
      })

      // Toggle Active Status
      .addCase(toggleActive.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.toggleActiveSuccess = false;
      })
      .addCase(toggleActive.fulfilled, (state, action) => {
        state.loading = false;
        state.toggleActiveSuccess = true;
        state.error = null;
      })
      .addCase(toggleActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.toggleActiveSuccess = false;
      })

      // تم إزالة حذف منسق

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.changePasswordSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.changePasswordSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.changePasswordSuccess = false;
      })

      // Add District Manager
      .addCase(addDistrictManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDistrictManager.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addDistrictManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All District Managers
      .addCase(getAllDistrictManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDistrictManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.allDistrictManagers = action.payload;
      })
      .addCase(getAllDistrictManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One District Manager
      .addCase(getDistrictManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleUser = null;
      })
      .addCase(getDistrictManager.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(getDistrictManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleUser = null;
      })

      // Delete District Manager
      .addCase(deleteDistrictManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteDistrictManagerSuccess = false;
      })
      .addCase(deleteDistrictManager.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteDistrictManagerSuccess = true;
        state.allDistrictManagers = state.allDistrictManagers.filter(
          (districtManager) => districtManager.User?.id !== action.payload
        );
      })
      .addCase(deleteDistrictManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deleteDistrictManagerSuccess = false;
      })

      // Change User Role
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.changeRoleSuccess = false;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.changeRoleSuccess = true;
        state.error = null;
        // تحديث المستخدم في القائمة إذا كان موجودًا
        if (state.allUsers.length > 0) {
          state.allUsers = state.allUsers.map((user) =>
            user.id === action.meta.arg.userId
              ? { ...user, role: action.meta.arg.roleData.newRole }
              : user
          );
        }
        // تحديث المستخدم الحالي إذا كان هو المستخدم المحدد
        if (
          state.singleUser &&
          state.singleUser.id === action.meta.arg.userId
        ) {
          state.singleUser = {
            ...state.singleUser,
            role: action.meta.arg.roleData.newRole,
          };
        }
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.changeRoleSuccess = false;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateUserSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updateUserSuccess = true;
        state.error = null;

        // تحديث المستخدم في القائمة إذا كان موجودًا
        if (state.allUsers.length > 0) {
          state.allUsers = state.allUsers.map((user) =>
            user.id === action.meta.arg.userId
              ? { ...user, ...action.meta.arg.userData }
              : user
          );
        }

        // تحديث المستخدم الحالي إذا كان هو المستخدم المحدد
        if (
          state.singleUser &&
          state.singleUser.id === action.meta.arg.userId
        ) {
          state.singleUser = {
            ...state.singleUser,
            ...action.meta.arg.userData,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateUserSuccess = false;
      });
  },
});

export const { resetChangeRoleSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
