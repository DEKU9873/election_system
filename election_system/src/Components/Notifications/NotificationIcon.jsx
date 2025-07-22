// import React from 'react';
// import { Bell, User, Calendar, AlertTriangle, CheckCircle, Info } from 'lucide-react';
// import { getIconStylesByType } from './NotificationStyles';

// const NotificationIcon = ({ type, size = 20 }) => {
//   // الحصول على الأنماط حسب نوع الإشعار
//   const styles = getIconStylesByType(type);
  
//   // تحديد الأيقونة بناءً على نوع الإشعار
//   let IconComponent;
  
//   switch (type) {
//     case 'info':
//       IconComponent = Info;
//       break;
//     case 'warning':
//     case 'error':
//       IconComponent = AlertTriangle;
//       break;
//     case 'success':
//       IconComponent = CheckCircle;
//       break;
//     case 'voter':
//     case 'monitor':
//       IconComponent = User;
//       break;
//     case 'report':
//       IconComponent = Calendar;
//       break;
//     case 'center':
//     case 'system':
//     default:
//       IconComponent = Bell;
//       break;
//   }
  
//   return (
//     <div className={styles.container}>
//       <IconComponent size={size} className={styles.icon} />
//     </div>
//   );
// };

// export default NotificationIcon;