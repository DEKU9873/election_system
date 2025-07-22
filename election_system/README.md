# نظام الانتخابات

نظام إدارة الانتخابات مبني باستخدام React و Vite مع Tailwind CSS.

## المميزات

- واجهة مستخدم حديثة وسهلة الاستخدام
- إدارة العمليات الانتخابية
- عرض النتائج والإحصائيات
- خرائط تفاعلية باستخدام Leaflet
- رسوم بيانية باستخدام Chart.js
- إدارة الحالة باستخدام Redux Toolkit

## متطلبات النظام

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

## تثبيت وتشغيل المشروع محليًا

1. قم بتنزيل أو استنساخ المشروع

```bash
git clone <رابط-المستودع>
cd election_system
```

2. قم بتثبيت الاعتماديات

```bash
npm install
# أو
yarn install
```

3. قم بإنشاء ملف `.env` بناءً على `.env.example`

4. قم بتشغيل خادم التطوير

```bash
npm run dev
# أو
yarn dev
```

## بناء المشروع للإنتاج

```bash
npm run build
# أو
yarn build
```

## نشر المشروع على Vercel

لنشر المشروع على منصة Vercel، يرجى الاطلاع على [دليل النشر على Vercel](./VERCEL_DEPLOYMENT.md).

## التقنيات المستخدمة

- React 19
- Vite 6
- Tailwind CSS 4
- Redux Toolkit
- React Router
- Chart.js / Recharts
- Leaflet
- Axios
- Socket.io-client
