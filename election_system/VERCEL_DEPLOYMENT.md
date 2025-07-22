# نشر نظام الانتخابات على Vercel

هذا الدليل يشرح كيفية نشر مشروع نظام الانتخابات على منصة Vercel.

## الخطوات

1. قم بإنشاء حساب على [Vercel](https://vercel.com/) إذا لم يكن لديك حساب بالفعل.

2. قم بتثبيت Vercel CLI (اختياري):
   ```bash
   npm install -g vercel
   ```

3. قم بتسجيل الدخول إلى Vercel من خلال CLI (اختياري):
   ```bash
   vercel login
   ```

4. طريقة النشر المباشر من GitHub:
   - قم برفع المشروع إلى مستودع GitHub الخاص بك
   - قم بتسجيل الدخول إلى [Vercel](https://vercel.com/)
   - انقر على "Add New" ثم "Project"
   - اختر مستودع GitHub الخاص بك
   - اترك الإعدادات الافتراضية كما هي (Vercel سيكتشف تلقائيًا أنه مشروع Vite/React)
   - انقر على "Deploy"

5. طريقة النشر باستخدام Vercel CLI (اختياري):
   - انتقل إلى مجلد المشروع في Terminal
   - قم بتنفيذ الأمر:
   ```bash
   vercel
   ```
   - اتبع التعليمات على الشاشة

## ملاحظات هامة

- تم إضافة ملف `vercel.json` لتكوين النشر بشكل صحيح
- تم التأكد من وجود ملف `_redirects` في مجلد `public` للتعامل مع توجيهات React Router
- Vercel سيقوم تلقائيًا بتنفيذ أمر البناء `npm run build` وسينشر المحتوى من مجلد `dist`

## روابط مفيدة

- [توثيق Vercel](https://vercel.com/docs)
- [توثيق Vite](https://vitejs.dev/guide/static-deploy.html#vercel)