import React, { useEffect } from "react";
import Sidebar from "../../Components/Uitily/Sidebar";
import { Bell, Check, Trash2 } from "lucide-react";
import { useNotifications } from "../../Components/Notifications/NotificationProvider";
import NotificationIcon from "../../Components/Notifications/NotificationIcon";
import { notificationListStyles, notificationElementStyles, notificationPageStyles } from "../../Components/Notifications/NotificationStyles";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification
  } = useNotifications();

  // إضافة بعض الإشعارات الوهمية للعرض إذا لم تكن هناك إشعارات
  useEffect(() => {
    // هذا الكود للعرض فقط، في التطبيق الحقيقي ستأتي البيانات من الخادم
    if (notifications.length === 0) {
      // إضافة بعض الإشعارات الوهمية للعرض
      createNotification({
        title: "تم تسجيل ناخب جديد",
        message: "تم تسجيل ناخب جديد في المركز الانتخابي الموصل - حي الزهراء",
        time: "منذ 5 دقائق",
        type: "voter",
      });
      createNotification({
        title: "تحديث في بيانات المركز",
        message: "تم تحديث بيانات المركز الانتخابي في محافظة بغداد",
        time: "منذ 30 دقيقة",
        type: "center",
      });
      createNotification({
        title: "تقرير جديد",
        message: "تم إضافة تقرير جديد عن سير العملية الانتخابية",
        time: "منذ 2 ساعة",
        type: "report",
        read: true,
      });
    }
  }, [notifications.length, createNotification]);

  // تم استبدال دالة getNotificationIcon بمكون NotificationIcon

  return (
    <div className={notificationPageStyles.pageContainer}>
      {/* <Sidebar /> */}
      <div className={notificationPageStyles.pageContent}>
        <div className={notificationPageStyles.contentWrapper}>
          {/* عنوان الصفحة */}
          <div className={notificationPageStyles.header}>
            <h1 className={notificationPageStyles.title}>الإشعارات</h1>
            <div className={notificationPageStyles.headerActions}>
              <span className={notificationPageStyles.unreadCount}>
                {unreadCount} إشعارات غير مقروءة
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className={notificationPageStyles.markAllButton}
                >
                  تحديد الكل كمقروء
                </button>
              )}
            </div>
          </div>

          {/* قائمة الإشعارات */}
          <div className={notificationListStyles.wrapper}>
            {notifications.length > 0 ? (
              <ul className={notificationListStyles.list}>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`${notificationListStyles.listItem} ${!notification.read ? notificationListStyles.unreadItem : ""}`}
                  >
                    <div className={notificationElementStyles.container}>
                      <div className={notificationElementStyles.iconContainer}>
                        <NotificationIcon type={notification.type || 'info'} size={18} />
                      </div>
                      <div className={notificationElementStyles.contentContainer}>
                        <div className={notificationElementStyles.header}>
                          <p className={`${notificationElementStyles.title.base} ${!notification.read ? notificationElementStyles.title.unread : notificationElementStyles.title.read}`}>
                            {notification.title}
                          </p>
                          <p className={notificationElementStyles.time}>
                            {notification.time}
                          </p>
                        </div>
                        <p className={notificationElementStyles.message}>
                          {notification.message}
                        </p>
                      </div>
                      <div className={notificationElementStyles.actionButtons}>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className={notificationElementStyles.iconButton}
                            title="تحديد كمقروء"
                          >
                            <Check size={16} className={notificationElementStyles.checkIcon} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className={notificationElementStyles.iconButton}
                          title="حذف الإشعار"
                        >
                          <Trash2 size={16} className={notificationElementStyles.trashIcon} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={notificationListStyles.emptyContainer}>
                <div className={notificationListStyles.emptyIconContainer}>
                  <NotificationIcon type="info" size={32} />
                </div>
                <h3 className={notificationListStyles.emptyTitle}>
                  لا توجد إشعارات
                </h3>
                <p className={notificationListStyles.emptyText}>
                  ستظهر هنا الإشعارات الجديدة عندما تصل.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;