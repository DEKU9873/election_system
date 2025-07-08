import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import NotificationIcon from './NotificationIcon';
import { notificationContainerStyles, notificationElementStyles } from './NotificationStyles';

const NotificationToast = () => {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const { notifications, markAsRead } = useNotifications();

  // مرجع للمؤقت الزمني
  const timerRef = React.useRef(null);

  // مراقبة الإشعارات الجديدة
  useEffect(() => {
    
    // البحث عن أحدث إشعار غير مقروء
    if (notifications && notifications.length > 0) {
      // استخدام مصفوفة جديدة لتجنب تعديل المصفوفة الأصلية
      const unreadNotifications = notifications
        .filter(notif => {
          // التحقق من كلا الخاصيتين isRead و read
          // اعتبار الإشعار غير مقروء إذا كانت إحدى الخاصيتين false أو غير موجودة
          const isUnread = (!notif.isRead && !notif.read);
          return isUnread;
        });
      
      
      // ترتيب الإشعارات غير المقروءة حسب التاريخ (الأحدث أولاً)
      const sortedUnread = [...unreadNotifications].sort((a, b) => {
        // استخدام تاريخ الإنشاء للترتيب إذا كان متاحًا، وإلا استخدام المعرف
        const dateA = new Date(a.createdAt || a.created_at || Date.now());
        const dateB = new Date(b.createdAt || b.created_at || Date.now());
        // ترتيب تنازلي (الأحدث أولاً)
        return dateB - dateA;
      });


      const latestUnread = sortedUnread[0];

      // تحقق من وجود إشعار غير مقروء
      if (latestUnread) {
        // تحقق مما إذا كان الإشعار مختلفًا عن الإشعار الحالي أو إذا كان الإشعار الحالي غير موجود
        const isNewNotification = !currentNotification || 
          latestUnread.notification_id !== currentNotification.notification_id;
        
        if (isNewNotification) {
          setCurrentNotification(latestUnread);
          setVisible(true);

          // إلغاء المؤقت السابق إذا كان موجودًا
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          // إخفاء الإشعار بعد 5 ثوانٍ
          timerRef.current = setTimeout(() => {
            setVisible(false);
          }, 5000);
        }
      }
    }

    // تنظيف المؤقت عند إلغاء تحميل المكون
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notifications, currentNotification]);

  // إغلاق الإشعار
  const closeNotification = () => {
    setVisible(false);
  };

  // تحديد الإشعار كمقروء وإغلاقه
  const handleMarkAsRead = () => {
    if (currentNotification) {
      // استخدام معرف الإشعار الصحيح
      const notificationId = currentNotification.notification_id;
      if (notificationId) {
        markAsRead(notificationId);
        setVisible(false);
      }
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
                {currentNotification.title || currentNotification.name}
              </p>
              <p className={notificationElementStyles.message}>
                {currentNotification.message}
              </p>
              <p className={notificationElementStyles.time}>
                {currentNotification.time || (
                  currentNotification.createdAt ? 
                  new Date(currentNotification.createdAt).toLocaleString('ar-SA') : 
                  currentNotification.created_at ? 
                  new Date(currentNotification.created_at).toLocaleString('ar-SA') : 
                  'الآن'
                )}
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