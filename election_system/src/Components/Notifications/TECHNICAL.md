# التوثيق الفني لنظام الإشعارات

## الهيكل العام

```
src/
├── Api/
│   └── notificationsAPI.js       # واجهة برمجة التطبيق للإشعارات
├── Components/
│   └── Notifications/
│       ├── NotificationButton.jsx # زر لإضافة إشعارات تجريبية
│       ├── NotificationIcon.jsx   # مكون لعرض أيقونات الإشعارات
│       ├── NotificationProvider.jsx # مزود سياق الإشعارات
│       ├── NotificationToast.jsx  # مكون لعرض الإشعارات المنبثقة
│       ├── README.md              # توثيق المستخدم
│       └── TECHNICAL.md           # التوثيق الفني
├── hook/
│   └── notifications/
│       └── use-notifications-hook.jsx # هوك مخصص للإشعارات
├── pages/
│   └── Notifications/
│       └── NotificationsPage.jsx  # صفحة عرض الإشعارات
└── redux/
    └── notificationsSlice.js     # شريحة Redux للإشعارات
```

## تدفق البيانات

1. **إضافة إشعار جديد**:
   - يتم استدعاء `createNotification` من `useNotifications`
   - يتم إنشاء كائن إشعار جديد مع معرف فريد وتاريخ
   - يتم إرسال الإشعار إلى Redux عبر `dispatch(addNotification(newNotification))`
   - يتم تحديث واجهة المستخدم تلقائيًا عبر React

2. **عرض الإشعارات**:
   - يتم استخدام `useSelector` للوصول إلى الإشعارات من Redux
   - يتم عرض الإشعارات في `NotificationsPage`
   - يتم عرض الإشعارات الجديدة في `NotificationToast`

3. **تحديث حالة الإشعارات**:
   - يتم استدعاء الوظائف المناسبة من `useNotifications`
   - يتم إرسال الإجراءات إلى Redux
   - يتم تحديث واجهة المستخدم تلقائيًا

## واجهة برمجة التطبيق (API)

### notificationsAPI.js

```javascript
// الحصول على جميع الإشعارات
fetchNotifications(): Promise<Notification[]>

// تحديد إشعار كمقروء
markNotificationAsRead(notificationId: string): Promise<any>

// تحديد جميع الإشعارات كمقروءة
markAllNotificationsAsRead(): Promise<any>

// حذف إشعار
deleteNotification(notificationId: string): Promise<any>

// حذف جميع الإشعارات
deleteAllNotifications(): Promise<any>

// الاشتراك في الإشعارات في الوقت الحقيقي
subscribeToNotifications(callback: Function): Function
```

## Redux

### notificationsSlice.js

```javascript
// الحالة الأولية
initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null
}

// Reducers
addNotification(state, action)
markAsRead(state, action)
markAllAsRead(state)
deleteNotification(state, action)
clearAllNotifications(state)
```

## مكونات React

### NotificationProvider.jsx

```jsx
// مزود سياق الإشعارات
export const NotificationProvider = ({ children }) => {
  const notificationsHook = useNotificationsHook();
  return (
    <NotificationContext.Provider value={notificationsHook}>
      {children}
    </NotificationContext.Provider>
  );
};

// هوك مخصص لاستخدام سياق الإشعارات
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications يجب أن يستخدم داخل NotificationProvider');
  }
  return context;
};
```

### NotificationToast.jsx

```jsx
// مكون لعرض الإشعارات المنبثقة
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

  // ...
};
```

## هوك مخصص

### use-notifications-hook.jsx

```jsx
const useNotificationsHook = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // إضافة إشعار جديد
  const createNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      time: new Date().toLocaleString('ar-SA'),
      read: false,
      ...notification
    };
    dispatch(addNotification(newNotification));
    return newNotification.id;
  };

  // تحديد إشعار كمقروء
  const handleMarkAsRead = async (id) => {
    try {
      dispatch(markAsRead(id));
      // await markNotificationAsRead(id);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // ...

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
```

## نموذج البيانات

```typescript
interface Notification {
  id: number;           // معرف فريد للإشعار
  title: string;        // عنوان الإشعار
  message: string;      // نص الإشعار
  time: string;         // وقت الإشعار
  read: boolean;        // حالة القراءة
  type: string;         // نوع الإشعار (info, warning, success, error, etc.)
}
```

## التكامل مع الواجهة الخلفية

تم تصميم النظام ليكون قابلاً للتكامل مع الواجهة الخلفية بسهولة. يتم ذلك من خلال:

1. استخدام واجهة برمجة التطبيق في `notificationsAPI.js`
2. تعليق استدعاءات API حتى يتم تنفيذ الواجهة الخلفية
3. استخدام Redux لإدارة حالة الإشعارات محليًا

عند تنفيذ الواجهة الخلفية، يمكن إلغاء تعليق استدعاءات API في `use-notifications-hook.jsx`.

## التوسعة المستقبلية

1. **دعم WebSockets**:
   - يمكن تنفيذ اتصال WebSocket في `subscribeToNotifications`
   - يمكن استخدام Socket.IO أو أي مكتبة أخرى للاتصال في الوقت الحقيقي

2. **تخصيص الإشعارات**:
   - إضافة إعدادات للمستخدم لتخصيص أنواع الإشعارات التي يرغب في تلقيها
   - إضافة دعم للإشعارات المجدولة

3. **تحسينات الأداء**:
   - تنفيذ التحميل المتأخر للإشعارات القديمة
   - تنفيذ التمرير اللانهائي في صفحة الإشعارات