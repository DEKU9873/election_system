# نظام الإشعارات

هذا المستند يشرح نظام الإشعارات المستخدم في تطبيق نظام الانتخابات.

## المكونات الرئيسية

### 1. مكتبة Redux (notificationsSlice.js)

يتم استخدام Redux لإدارة حالة الإشعارات في التطبيق. يحتوي ملف `notificationsSlice.js` على:

- حالة أولية للإشعارات
- مجموعة من الـ reducers للتعامل مع الإشعارات (إضافة، تحديد كمقروء، حذف، إلخ)
- تصدير الـ actions والـ reducer

### 2. NotificationProvider

مكون `NotificationProvider` يوفر سياق (Context) للإشعارات في جميع أنحاء التطبيق. يستخدم هذا المكون الـ hook الخاص `useNotificationsHook` ويوفر واجهة موحدة للتعامل مع الإشعارات.

### 3. useNotificationsHook

هذا الـ hook المخصص يربط بين Redux وواجهة التطبيق، ويوفر وظائف مثل:

- إضافة إشعار جديد
- تحديد إشعار كمقروء
- حذف إشعار
- تحديد جميع الإشعارات كمقروءة
- حذف جميع الإشعارات

### 4. NotificationToast

مكون `NotificationToast` يعرض الإشعارات المنبثقة عند وصول إشعار جديد. يظهر الإشعار لمدة محددة ثم يختفي تلقائيًا.

### 5. NotificationIcon

مكون `NotificationIcon` يعرض أيقونات مختلفة بناءً على نوع الإشعار (معلومات، تحذير، نجاح، خطأ، إلخ).

### 6. NotificationsPage

صفحة `NotificationsPage` تعرض جميع الإشعارات في التطبيق، مع إمكانية تحديدها كمقروءة أو حذفها.

## أنواع الإشعارات

يدعم النظام عدة أنواع من الإشعارات:

- `info`: معلومات عامة
- `warning`: تحذيرات
- `success`: إشعارات النجاح
- `error`: أخطاء
- `voter`: إشعارات متعلقة بالناخبين
- `center`: إشعارات متعلقة بالمراكز الانتخابية
- `report`: إشعارات متعلقة بالتقارير
- `monitor`: إشعارات متعلقة بالمراقبين
- `system`: إشعارات النظام

## كيفية استخدام نظام الإشعارات

### إضافة إشعار جديد

```jsx
import { useNotifications } from '../Components/Notifications/NotificationProvider';

function MyComponent() {
  const { createNotification } = useNotifications();
  
  const handleAction = () => {
    createNotification({
      type: 'success',
      title: 'تم بنجاح',
      message: 'تم تنفيذ العملية بنجاح'
    });
  };
  
  return (
    <button onClick={handleAction}>تنفيذ العملية</button>
  );
}
```

### عرض عدد الإشعارات غير المقروءة

```jsx
import { useNotifications } from '../Components/Notifications/NotificationProvider';

function NotificationBadge() {
  const { unreadCount } = useNotifications();
  
  return (
    <div className="relative">
      <BellIcon />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
```

## التكامل مع الواجهة

تم دمج نظام الإشعارات مع واجهة المستخدم من خلال:

1. إضافة زر الإشعارات في الشريط الجانبي (Sidebar) مع عرض عدد الإشعارات غير المقروءة
2. إضافة صفحة مخصصة لعرض جميع الإشعارات
3. إضافة نظام الإشعارات المنبثقة لعرض الإشعارات الجديدة

## التطوير المستقبلي

- إضافة دعم للإشعارات في الوقت الحقيقي باستخدام WebSockets
- إضافة خيارات تخصيص للإشعارات (مثل تفعيل/تعطيل أنواع معينة)
- إضافة دعم للإشعارات المجدولة
- تخزين الإشعارات في قاعدة البيانات للرجوع إليها لاحقًا