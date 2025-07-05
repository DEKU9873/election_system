import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
} from '../../redux/notificationsSlice';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification as apiDeleteNotification,
  deleteAllNotifications,
  subscribeToNotifications
} from '../../Api/notificationsAPI';

const useNotificationsHook = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // جلب الإشعارات من الخادم عند تحميل المكون
  useEffect(() => {
    const fetchNotificationsFromServer = async () => {
      try {
        setLoading(true);
        setError(null);
        // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
        // const data = await fetchNotifications();
        // data.forEach(notification => dispatch(addNotification(notification)));
      } catch (err) {
        setError('فشل في جلب الإشعارات');
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    // تعليق استدعاء الدالة حتى يتم تنفيذ الواجهة الخلفية
    // fetchNotificationsFromServer();
  }, [dispatch]);
  
  // الاشتراك في الإشعارات في الوقت الحقيقي
  useEffect(() => {
    // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
    // const unsubscribe = subscribeToNotifications((newNotifications) => {
    //   // تحديث الإشعارات في Redux
    //   newNotifications.forEach(notification => {
    //     if (!notifications.some(n => n.id === notification.id)) {
    //       dispatch(addNotification(notification));
    //     }
    //   });
    // });
    // 
    // return () => {
    //   unsubscribe();
    // };
  }, [dispatch, notifications]);

  // إضافة إشعار جديد
  const createNotification = (notification) => {
    // إضافة معرف فريد وتاريخ للإشعار إذا لم يكن موجودًا
    const newNotification = {
      id: Date.now(), // استخدام الطابع الزمني كمعرف فريد
      time: new Date().toLocaleString('ar-SA'), // تنسيق التاريخ بالعربية
      read: false,
      ...notification
    };
    dispatch(addNotification(newNotification));
    return newNotification.id; // إرجاع معرف الإشعار الجديد
  };

  // تحديد إشعار كمقروء
  const handleMarkAsRead = async (id) => {
    try {
      dispatch(markAsRead(id));
      // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
      // await markNotificationAsRead(id);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // تحديد جميع الإشعارات كمقروءة
  const handleMarkAllAsRead = async () => {
    try {
      dispatch(markAllAsRead());
      // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
      // await markAllNotificationsAsRead();
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // حذف إشعار
  const handleDeleteNotification = async (id) => {
    try {
      dispatch(deleteNotification(id));
      // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
      // await apiDeleteNotification(id);
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // حذف جميع الإشعارات
  const handleClearAllNotifications = async () => {
    try {
      dispatch(clearAllNotifications());
      // يمكن تعليق هذا الكود حتى يتم تنفيذ الواجهة الخلفية
      // await deleteAllNotifications();
    } catch (err) {
      console.error('Error clearing all notifications:', err);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    createNotification,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDeleteNotification,
    clearAllNotifications: handleClearAllNotifications
  };
};

export default useNotificationsHook;