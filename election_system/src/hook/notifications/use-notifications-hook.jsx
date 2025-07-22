// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchNotifications,
//   addNotification,
//   deleteNotification,
//   deleteAllNotifications,
//   markNotificationRead,
//   resetState,
// } from "../../redux/notificationSlice";
// import { subscribeToNotifications } from "../../Api/notificationsAPI";

// const useNotificationsHook = () => {
//   const dispatch = useDispatch();
//   const {
//     items: notifications,
//     loading,
//     error,
//     success,
//   } = useSelector((state) => state.notifications);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // جلب الإشعارات من الخادم عند تحميل المكون
//   useEffect(() => {
//     const fetchNotificationsFromServer = async () => {
//       dispatch(resetState());
//       dispatch(fetchNotifications());
//     };

//     fetchNotificationsFromServer();
//   }, [dispatch]);

//   // حساب عدد الإشعارات غير المقروءة
//   useEffect(() => {
//     if (notifications) {
//       const count = notifications.filter(
//         (notification) =>
//           // التحقق من كلا الخاصيتين isRead و read
//           !notification.isRead && !notification.read
//       ).length;
//       setUnreadCount(count);
//     }
//   }, [notifications]);

//   // الاشتراك في الإشعارات في الوقت الحقيقي
//   useEffect(() => {
//     const unsubscribe = subscribeToNotifications((newNotifications) => {
//       // تحديث الإشعارات عن طريق إعادة جلبها من الخادم
//       dispatch(resetState());
//       dispatch(fetchNotifications());
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [dispatch]);

//   // إضافة إشعار جديد
//   const createNotification = async (notification) => {
//     try {
//       // إضافة تاريخ للإشعار إذا لم يكن موجودًا
//       const now = new Date();
//       const newNotification = {
//         time: now.toLocaleString("ar-SA"),
//         read: false,
//         isRead: false, // إضافة خاصية isRead لتتوافق مع الباك اند
//         // تحويل البيانات لتتوافق مع ما يتوقعه الباك اند
//         name: notification.name || notification.title, // دعم كلا الصيغتين
//         message: notification.message,
//         type: notification.type,
//         send_to: notification.send_to || "all",
//         // دعم كلا الصيغتين للتاريخ
//         created_at: notification.created_at || now.toISOString(),
//         createdAt:
//           notification.createdAt ||
//           notification.created_at ||
//           now.toISOString(),
//         // إضافة معرف مؤقت للإشعار الجديد (سيتم استبداله بالمعرف الفعلي من الخادم)
//         notification_id: notification.notification_id || `temp-${Date.now()}`,
//       };

//       // إضافة الإشعار مؤقتًا إلى الحالة المحلية قبل الاتصال بالخادم
//       // هذا يضمن ظهور الإشعار فورًا للمستخدم
//       if (notifications) {
//         // تحديث الحالة المحلية مباشرة
//         const updatedNotifications = [newNotification, ...notifications];
//         // يمكن استخدام هذا السطر إذا كنت تريد تحديث الحالة المحلية مباشرة
//         // setNotifications(updatedNotifications);
//       }

//       dispatch(resetState());
//       const result = await dispatch(addNotification(newNotification));

//       // بعد الإضافة بنجاح، قم بتحديث الإشعارات من الخادم
//       dispatch(fetchNotifications());

//       return true; // إرجاع نجاح العملية
//     } catch (error) {
//       return false;
//     }
//   };

//   // تحديد إشعار كمقروء
//   const handleMarkAsRead = async (notification_id) => {
//     dispatch(resetState());
//     dispatch(markNotificationRead(notification_id));
//   };

//   // تحديد جميع الإشعارات كمقروءة
//   const handleMarkAllAsRead = async () => {
//     // نقوم بتعليم كل إشعار كمقروء بشكل فردي
//     if (notifications && notifications.length > 0) {
//       dispatch(resetState());
//       // يمكن تنفيذ هذا بشكل أفضل في الباك اند بإضافة API خاص بتعليم جميع الإشعارات كمقروءة
//       notifications.forEach((notification) => {
//         if (!notification.read) {
//           dispatch(markNotificationRead(notification.notification_id));
//         }
//       });
//     }
//   };

//   // حذف إشعار
//   const handleDeleteNotification = async (notification_id) => {
//     dispatch(resetState());
//     dispatch(deleteNotification(notification_id));
//   };

//   // حذف جميع الإشعارات
//   const handleClearAllNotifications = async () => {
//     dispatch(resetState());
//     dispatch(deleteAllNotifications());
//   };

//   return {
//     notifications: notifications || [],
//     unreadCount,
//     loading,
//     error,
//     success,
//     createNotification,
//     markAsRead: handleMarkAsRead,
//     markAllAsRead: handleMarkAllAsRead,
//     deleteNotification: handleDeleteNotification,
//     clearAllNotifications: handleClearAllNotifications,
//   };
// };

// export default useNotificationsHook;
