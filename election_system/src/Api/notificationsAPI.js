// واجهة برمجة التطبيق للإشعارات
// هذا الملف يحتوي على الدوال اللازمة للتعامل مع الإشعارات من الخادم

import baseURL from "./baseURL";
import Cookies from "js-cookie";

// الحصول على جميع الإشعارات للمستخدم الحالي
export const fetchNotifications = async () => {
  try {
    const token = Cookies.get("token");
    const response = await baseURL.get("/api/notifications/", {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// تحديد إشعار كمقروء
export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = Cookies.get("token");
    const response = await baseURL.post(
      `/api/notifications/mark-read/${notificationId}`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// تحديد جميع الإشعارات كمقروءة
export const markAllNotificationsAsRead = async () => {
  try {
    const token = Cookies.get("token");
    const response = await baseURL.post(
      "/api/notifications/mark-all-read",
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

// حذف إشعار
export const deleteNotification = async (notificationId) => {
  try {
    const token = Cookies.get("token");
    const response = await baseURL.delete(
      `/api/notifications/${notificationId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// حذف جميع الإشعارات
export const deleteAllNotifications = async () => {
  try {
    const token = Cookies.get("token");
    const response = await baseURL.delete("/api/notifications/", {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    throw error;
  }
};

// الاشتراك في الإشعارات في الوقت الحقيقي (يمكن استخدام WebSockets في المستقبل)
export const subscribeToNotifications = (callback) => {
  // هذه الدالة ستكون مسؤولة عن إعداد اتصال WebSocket في المستقبل
  // حاليًا، يمكن استخدام استطلاع دوري للإشعارات الجديدة

  // let lastFetchTime = 0; // تخزين وقت آخر استطلاع
  // let isFirstFetch = true; // علامة للاستطلاع الأول

  // // استطلاع فوري عند بدء الاشتراك
  // const fetchImmediately = async () => {
  //   try {
  //     // console.log('بدء الاشتراك في الإشعارات - استطلاع فوري');
  //     const notifications = await fetchNotifications();
  //     lastFetchTime = Date.now();
  //     isFirstFetch = false;
  //     callback(notifications);
  //   } catch (error) {
  //     // console.error('خطأ في استطلاع الإشعارات الفوري:', error);
  //   }
  // };

  // // تنفيذ استطلاع فوري
  // fetchImmediately();

  // // ثم إعداد استطلاع دوري بفترات أقصر
  // const intervalId = setInterval(async () => {
  //   try {
  //     // تجنب الاستطلاعات المتكررة بشكل سريع جدًا
  //     const now = Date.now();
  //     const timeSinceLastFetch = now - lastFetchTime;

  //     // إذا كان الوقت منذ آخر استطلاع أقل من 2 ثانية، تخطي هذا الاستطلاع
  //     if (!isFirstFetch && timeSinceLastFetch < 2000) {
  //       // console.log('تخطي استطلاع الإشعارات - تم الاستطلاع مؤخرًا');
  //       return;
  //     }

  //     // console.log('استطلاع دوري للإشعارات');
  //     const notifications = await fetchNotifications();
  //     lastFetchTime = now;
  //     callback(notifications);
  //   } catch (error) {
  //     // console.error('خطأ في استطلاع الإشعارات الدوري:', error);
  //   }
  // }, 5000); // استطلاع كل 5 ثوانٍ بدلاً من 10 ثوانٍ

  // // إرجاع دالة لإلغاء الاشتراك
  // return () => {
  //   // console.log('إلغاء الاشتراك في الإشعارات');
  //   clearInterval(intervalId);
  // };
};
