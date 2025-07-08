import React, { useEffect } from "react";
import Sidebar from "../../Components/Uitily/Sidebar";
import { Bell, Check, Trash2 } from "lucide-react";
import { useNotifications } from "../../Components/Notifications/NotificationProvider";
import NotificationIcon from "../../Components/Notifications/NotificationIcon";
import {
  notificationListStyles,
  notificationElementStyles,
  notificationPageStyles,
} from "../../Components/Notifications/NotificationStyles";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
  } = useNotifications();


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
                    key={notification.notification_id}
                    className={`${notificationListStyles.listItem} ${
                      !notification.isRead
                        ? notificationListStyles.unreadItem
                        : ""
                    }`}
                  >
                    <div className={notificationElementStyles.container}>
                      <div className={notificationElementStyles.iconContainer}>
                        <NotificationIcon
                          type={notification.type || "info"}
                          size={18}
                        />
                      </div>
                      <div
                        className={notificationElementStyles.contentContainer}
                      >
                        <div className={notificationElementStyles.header}>
                          <p
                            className={`${
                              notificationElementStyles.title.base
                            } ${
                              !notification.isRead
                                ? notificationElementStyles.title.unread
                                : notificationElementStyles.title.read
                            }`}
                          >
                            {notification.title || notification.name}
                          </p>
                          <p className={notificationElementStyles.createdAt}>
                            {notification.createdAt ||
                              (notification.createdAt
                                ? new Date(
                                    notification.createdAt
                                  ).toLocaleString("ar-SA")
                                : "الآن")}
                          </p>
                        </div>
                        <p className={notificationElementStyles.message}>
                          {notification.message}
                        </p>
                      </div>
                      <div className={notificationElementStyles.actionButtons}>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.notification_id)}
                            className={notificationElementStyles.iconButton}
                            title="تحديد كمقروء"
                          >
                            <Check
                              size={16}
                              className={notificationElementStyles.checkIcon}
                            />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.notification_id)}
                          className={notificationElementStyles.iconButton}
                          title="حذف الإشعار"
                        >
                          <Trash2
                            size={16}
                            className={notificationElementStyles.trashIcon}
                          />
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
