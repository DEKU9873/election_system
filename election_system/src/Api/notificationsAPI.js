// واجهة برمجة التطبيق للإشعارات
// هذا الملف يحتوي على الدوال اللازمة للتعامل مع الإشعارات من الخادم

import baseURL from './baseURL';
import Cookies from 'js-cookie';

// الحصول على جميع الإشعارات للمستخدم الحالي
export const fetchNotifications = async () => {
  try {
    const token = Cookies.get('token');
    const response = await baseURL.get('/notifications', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
  
};

// تحديد إشعار كمقروء
export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = Cookies.get('token');
    const response = await baseURL.patch(
      `/notifications/${notificationId}/read`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// تحديد جميع الإشعارات كمقروءة
export const markAllNotificationsAsRead = async () => {
  try {
    const token = Cookies.get('token');
    const response = await baseURL.patch(
      '/notifications/read-all',
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// حذف إشعار
export const deleteNotification = async (notificationId) => {
  try {
    const token = Cookies.get('token');
    const response = await baseURL.delete(`/notifications/${notificationId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// حذف جميع الإشعارات
export const deleteAllNotifications = async () => {
  try {
    const token = Cookies.get('token');
    const response = await baseURL.delete('/notifications/delete-all', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    throw error;
  }
};

// الاشتراك في الإشعارات في الوقت الحقيقي (يمكن استخدام WebSockets في المستقبل)
export const subscribeToNotifications = (callback) => {
  // هذه الدالة ستكون مسؤولة عن إعداد اتصال WebSocket في المستقبل
  // حاليًا، يمكن استخدام استطلاع دوري للإشعارات الجديدة
  const intervalId = setInterval(async () => {
    try {
      const notifications = await fetchNotifications();
      callback(notifications);
    } catch (error) {
      console.error('Error in notification polling:', error);
    }
  }, 30000); // استطلاع كل 30 ثانية

  // إرجاع دالة لإلغاء الاشتراك
  return () => {
    clearInterval(intervalId);
  };
};