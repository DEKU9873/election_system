import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// جلب كل الإشعارات
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get('/api/notifications/');
    return response.data;
  }
);

// إضافة إشعار جديد
export const addNotification = createAsyncThunk(
  'notifications/addNotification',
  async (newNotification) => {
    const response = await axios.post('/api/notifications/', newNotification);
    return response.data;
  }
);

// حذف إشعار معين
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id) => {
    await axios.delete(`/api/notifications/${id}`);
    return id; // نعيد الـ id للحذف من الـ state
  }
);

// حذف كل الإشعارات
export const deleteAllNotifications = createAsyncThunk(
  'notifications/deleteAllNotifications',
  async () => {
    await axios.delete('/api/notifications/');
    return;
  }
);

// تعليم إشعار كمقروء
export const markNotificationRead = createAsyncThunk(
  'notifications/markNotificationRead',
  async (id) => {
    const response = await axios.post(`/api/notifications/mark-read/${id}`);
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // لو بدك أكشنات عادية بدون async
  },
  extraReducers: (builder) => {
    builder
      // جلب الإشعارات
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // إضافة إشعار
      .addCase(addNotification.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // حذف إشعار
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n.id !== action.payload);
      })

      // حذف كل الإشعارات
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.items = [];
      })

      // تعليم إشعار كمقروء
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const notificationsReducer = notificationSlice.reducer;
