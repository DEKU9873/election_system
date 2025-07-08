import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useGetDataToken } from "../hooks/useGetData";
import { useInsertDataWithToken } from "../hooks/useInsertData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";
import { usePatchDataWithToken } from "../hooks/useUpdateData";

// جلب كل الإشعارات
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("/api/notifications/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// إضافة إشعار جديد
export const addNotification = createAsyncThunk(
  "notifications/addNotification",
  async (newNotification, thunkAPI) => {
    try {
      // إضافة معرف مؤقت للإشعار قبل إرساله للخادم (سيتم استبداله بالمعرف الفعلي من الخادم)
      const tempNotification = {
        ...newNotification,
        temp_id: `temp-${Date.now()}`
      };
      
      // إضافة الإشعار مؤقتًا إلى الحالة قبل الاستجابة من الخادم
      thunkAPI.dispatch({
        type: "notifications/addTempNotification",
        payload: tempNotification
      });
      
      // إرسال الإشعار إلى الخادم
      const response = await useInsertDataWithToken("/api/notifications/", newNotification);
      
      // إرجاع البيانات مع المعرف المؤقت لاستبداله لاحقًا
      return {
        ...response.data,
        temp_id: tempNotification.temp_id
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// حذف إشعار معين
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notification_id, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/notifications/${notification_id}`);
      return notification_id; // نعيد الـ notification_id للحذف من الـ state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// حذف كل الإشعارات
export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAllNotifications",
  async (_, thunkAPI) => {
    try {
      await useDeleteDataWithToken("/api/notifications/");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// تعليم إشعار كمقروء
export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (notification_id, thunkAPI) => {
    try {
      const response = await usePatchDataWithToken(`/api/notifications/mark-read/${notification_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    // لو بدك أكشنات عادية بدون async
    resetState: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    },
    // إضافة إشعار مؤقت قبل استجابة الخادم
    addTempNotification: (state, action) => {
      // التأكد من أن الإشعار المؤقت يحتوي على جميع الحقول المطلوبة
      const tempNotification = {
        ...action.payload,
        // التأكد من وجود الخصائص الضرورية
        isRead: action.payload.isRead || false,
        read: action.payload.read || false,
        notification_id: action.payload.notification_id || action.payload.temp_id,
        createdAt: action.payload.createdAt || action.payload.created_at || new Date().toISOString(),
        // إضافة علامة لتمييز الإشعارات المؤقتة
        isTemp: true
      };
      // إضافة الإشعار المؤقت في بداية المصفوفة
      state.items.unshift(tempNotification);
    },
  },
  extraReducers: (builder) => {
    builder
      // جلب الإشعارات
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.success = true;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "حدث خطأ أثناء جلب الإشعارات";
        state.success = false;
      })

      // إضافة إشعار
      .addCase(addNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addNotification.fulfilled, (state, action) => {
        state.loading = false;
        
        // تأكد من أن الإشعار الجديد يحتوي على جميع الحقول المطلوبة
        const newNotification = {
          ...action.payload,
          // التأكد من وجود الخصائص الضرورية
          isRead: action.payload.isRead || false,
          read: action.payload.read || false,
          notification_id: action.payload.notification_id || action.payload.id,
          createdAt: action.payload.createdAt || action.payload.created_at || new Date().toISOString(),
          // إزالة علامة الإشعار المؤقت
          isTemp: false
        };
        
        // البحث عن الإشعار المؤقت واستبداله بالإشعار الفعلي
        const tempId = action.payload.temp_id;
        if (tempId) {
          const tempIndex = state.items.findIndex(item => 
            item.temp_id === tempId || 
            item.notification_id === tempId
          );
          
          if (tempIndex !== -1) {
            // استبدال الإشعار المؤقت بالإشعار الفعلي
            state.items[tempIndex] = newNotification;
          } else {
            // إذا لم يتم العثور على الإشعار المؤقت، أضف الإشعار الجديد في البداية
            state.items.unshift(newNotification);
          }
        } else {
          // إذا لم يكن هناك معرف مؤقت، أضف الإشعار الجديد في البداية
          state.items.unshift(newNotification);
        }
        
        state.success = true;
        state.message = "تم إضافة الإشعار بنجاح";
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "حدث خطأ أثناء إضافة الإشعار";
        state.success = false;
      })

      // حذف إشعار
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((n) => n.notification_id !== action.payload);
        state.success = true;
        state.message = "تم حذف الإشعار بنجاح";
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "حدث خطأ أثناء حذف الإشعار";
        state.success = false;
      })

      // حذف كل الإشعارات
      .addCase(deleteAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.success = true;
        state.message = "تم حذف جميع الإشعارات بنجاح";
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "حدث خطأ أثناء حذف جميع الإشعارات";
        state.success = false;
      })

      // تعليم إشعار كمقروء
      .addCase(markNotificationRead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((n) => n.notification_id === action.payload.notification_id);
        if (index !== -1) {
          // تحديث الإشعار مع الحفاظ على البيانات الموجودة
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
            // التأكد من تحديث كلا الخاصيتين
            read: true,
            isRead: true
          };
        }
        state.success = true;
        state.message = "تم تعليم الإشعار كمقروء بنجاح";
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "حدث خطأ أثناء تعليم الإشعار كمقروء";
        state.success = false;
      });
  },
});

export const { resetState, addTempNotification } = notificationSlice.actions;
export const notificationsReducer = notificationSlice.reducer;
