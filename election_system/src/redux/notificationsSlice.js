import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// حالة البداية للإشعارات
const initialState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

// إنشاء slice للإشعارات
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // إضافة إشعار جديد
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    // تحديد إشعار كمقروء
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    // تحديد جميع الإشعارات كمقروءة
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        if (!notification.read) {
          notification.read = true;
        }
      });
      state.unreadCount = 0;
    },
    // حذف إشعار
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount -= 1;
        }
        state.notifications.splice(index, 1);
      }
    },
    // حذف جميع الإشعارات
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    // يمكن إضافة reducers إضافية هنا للتعامل مع الطلبات الغير متزامنة
    // مثل جلب الإشعارات من الخادم
  },
});

// تصدير الأفعال (actions)
export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} = notificationsSlice.actions;

// تصدير الـ reducer
export default notificationsSlice.reducer;