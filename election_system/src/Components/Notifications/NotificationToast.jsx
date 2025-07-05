import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import NotificationIcon from './NotificationIcon';
import { notificationContainerStyles, notificationElementStyles } from './NotificationStyles';

const NotificationToast = () => {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const { notifications, markAsRead } = useNotifications();

  // مراقبة الإشعارات الجديدة
  useEffect(() => {
    // البحث عن أحدث إشعار غير مقروء
    const latestUnread = [...notifications]
      .filter(notif => !notif.read)
      .sort((a, b) => b.id - a.id)[0];

    if (latestUnread && latestUnread !== currentNotification) {
      setCurrentNotification(latestUnread);
      setVisible(true);

      // إخفاء الإشعار بعد 5 ثوانٍ
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications, currentNotification]);

  // إغلاق الإشعار
  const closeNotification = () => {
    setVisible(false);
  };

  // تحديد الإشعار كمقروء وإغلاقه
  const handleMarkAsRead = () => {
    if (currentNotification) {
      markAsRead(currentNotification.id);
      setVisible(false);
    }
  };

  if (!visible || !currentNotification) return null;

  return (
    <div className={notificationContainerStyles.fixed}>
      <div className={notificationContainerStyles.toast}>
        <div className={notificationContainerStyles.content}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <NotificationIcon type={currentNotification.type || 'info'} />
            </div>
            <div className="mr-3 flex-1">
              <p className={`${notificationElementStyles.title.base} ${notificationElementStyles.title.read}`}>
                {currentNotification.title}
              </p>
              <p className={notificationElementStyles.message}>
                {currentNotification.message}
              </p>
              <div className={notificationElementStyles.actions}>
                <button
                  onClick={handleMarkAsRead}
                  className={notificationElementStyles.actionButton}
                >
                  تحديد كمقروء
                </button>
              </div>
            </div>
            <button
              onClick={closeNotification}
              className={notificationElementStyles.closeButton}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;