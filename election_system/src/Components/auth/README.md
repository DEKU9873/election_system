# مكون UserTableToolbar

هذا المكون يستخدم لعرض شريط أدوات في جداول المستخدمين، ويتضمن حقل بحث وزر إجراء (مثل إضافة مستخدم) وقائمة لإظهار/إخفاء الأعمدة.

## الميزة الجديدة: التحكم في ظهور الزر حسب دور المستخدم

تمت إضافة ميزة جديدة تتيح التحكم في ظهور زر الإجراء (مثل زر "إضافة مستخدم") بناءً على دور المستخدم الحالي. يمكن تحديد الأدوار المسموح لها برؤية الزر من خلال خاصية `allowedRoles`.

## كيفية الاستخدام

### الخصائص (Props)

| الخاصية | النوع | الوصف |
|---------|------|-------|
| `title` | string | عنوان الزر |
| `filterText` | string | نص البحث الحالي |
| `setFilterText` | function | دالة لتحديث نص البحث |
| `showColumnMenu` | boolean | حالة قائمة الأعمدة (مفتوحة/مغلقة) |
| `setShowColumnMenu` | function | دالة لتحديث حالة قائمة الأعمدة |
| `visibleColumns` | object | كائن يحدد الأعمدة المرئية |
| `setVisibleColumns` | function | دالة لتحديث الأعمدة المرئية |
| `onOpen` | function | دالة تنفذ عند النقر على الزر |
| `className` | string | فئات CSS إضافية للمكون |
| `allowedRoles` | array | مصفوفة تحتوي على الأدوار المسموح لها برؤية الزر |

### مثال على الاستخدام

```jsx
<UserTableToolbar
  title="اضافة مستخدم"
  filterText={filterText}
  setFilterText={setFilterText}
  showColumnMenu={showColumnMenu}
  setShowColumnMenu={setShowColumnMenu}
  visibleColumns={visibleColumns}
  setVisibleColumns={setVisibleColumns}
  onOpen={() => navigate('/register')}
  allowedRoles={['system_admin', 'coordinator']} // تحديد الأدوار المسموح لها برؤية زر الإضافة
  className="flex-wrap"
/>
```

## حالات استخدام خاصية allowedRoles

1. **تحديد أدوار محددة**:
   ```jsx
   allowedRoles={['system_admin', 'coordinator']}
   ```
   سيظهر الزر فقط للمستخدمين الذين لديهم دور "system_admin" أو "coordinator".

2. **عرض الزر لجميع المستخدمين**:
   ```jsx
   allowedRoles={[]}
   ```
   عند تمرير مصفوفة فارغة، سيظهر الزر لجميع المستخدمين المسجلين دخول.

3. **إخفاء الزر عن جميع المستخدمين**:
   ```jsx
   allowedRoles={['non_existing_role']}
   ```
   يمكن تمرير دور غير موجود لإخفاء الزر عن جميع المستخدمين.

## ملاحظات

- إذا كان المستخدم غير مسجل دخول أو ليس لديه دور محدد، لن يظهر الزر.
- يتم التحقق من دور المستخدم من خلال ملف تعريف الارتباط (cookie) المسمى "user".
- يمكن استخدام هذا المكون في أي صفحة تحتاج إلى شريط أدوات مع التحكم في ظهور الزر حسب دور المستخدم.