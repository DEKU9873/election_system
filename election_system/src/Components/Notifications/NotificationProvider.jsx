import React, { createContext, useContext } from 'react';
import useNotificationsHook from '../../hook/notifications/use-notifications-hook';

// إنشاء سياق للإشعارات
const NotificationContext = createContext();

// مزود الإشعارات الذي يغلف التطبيق
export const NotificationProvider = ({ children }) => {
  const notificationsHook = useNotificationsHook();

  return (
    <NotificationContext.Provider value={notificationsHook}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook مخصص لاستخدام سياق الإشعارات
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications يجب أن يستخدم داخل NotificationProvider');
  }
  return context;
};