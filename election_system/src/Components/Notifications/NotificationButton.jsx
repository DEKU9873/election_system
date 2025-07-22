// import React, { useState } from "react";
// import { useNotifications } from "./NotificationProvider";
// import { notificationButtonStyles } from "./NotificationStyles";
// import { X } from "lucide-react";

// /**
//  * مكون زر إضافة إشعار جديد
//  * 
//  * يرسل البيانات إلى الباك اند بالتنسيق التالي:
//  * {
//  *   name: "اسم الإشعار",
//  *   message: "محتوى الإشعار",
//  *   type: "نوع الإشعار",
//  *   send_to: "all",
//  *   created_at: "تاريخ الإنشاء"
//  * }
//  */

// const NotificationButton = () => {
//   const { createNotification } = useNotifications();
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [notificationData, setNotificationData] = useState({
//     title: "",
//     message: "",
//     type: "info",
//     send_to: "all", // القيمة الافتراضية هي إرسال إلى الجميع
//   });

//   // فتح/إغلاق نموذج الإشعار
//   const toggleForm = () => {
//     setIsFormOpen(!isFormOpen);
//   };

//   // تحديث بيانات الإشعار
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNotificationData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // إرسال الإشعار
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (notificationData.title.trim() && notificationData.message.trim()) {
//       // إرسال الإشعار إلى الباك اند بالتنسيق المطلوب
//       createNotification({
//         name: notificationData.title, // استخدام العنوان كاسم للإشعار
//         message: notificationData.message,
//         type: notificationData.type,
//         send_to: notificationData.send_to, // استخدام القيمة المحددة من القائمة المنسدلة
//         created_at: new Date().toISOString(),
//       });

//       // إعادة تعيين النموذج
//       setNotificationData({
//         title: "",
//         message: "",
//         type: "info",
//         send_to: "all",
//       });

//       // إغلاق النموذج
//       setIsFormOpen(false);
//     }
//   };

//   return (
//     <div className={notificationButtonStyles.container}>
//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
//             <button
//               onClick={toggleForm}
//               className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>

//             <h3 className="text-xl font-bold mb-4 text-center">
//               إنشاء إشعار جديد
//             </h3>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="title"
//                 >
//                   عنوان الإشعار
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={notificationData.title}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="أدخل عنوان الإشعار"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="message"
//                 >
//                   رسالة الإشعار
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={notificationData.message}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
//                   placeholder="أدخل رسالة الإشعار"
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="type"
//                 >
//                   نوع الإشعار
//                 </label>
//                 <select
//                   id="type"
//                   name="type"
//                   value={notificationData.type}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="info">معلومات</option>
//                   <option value="warning">تحذير</option>
//                   <option value="success">نجاح</option>
//                   <option value="error">خطأ</option>
//                 </select>
//               </div>

//               <div className="mb-6">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="send_to"
//                 >
//                   إرسال إلى
//                 </label>
//                 <select
//                   id="send_to"
//                   name="send_to"
//                   value={notificationData.send_to}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="all">الجميع</option>
//                   <option value="voter">الناخب</option>
//                   <option value="observer">المراقب</option>
//                   <option value="coordinator">المنسق</option>
//                   <option value="center_manager">مدير المركز</option>
//                   <option value="district_manager">مدير المنطقة</option>
//                   <option value="finance_auditor">المدقق المالي</option>
//                   <option value="system_admin">مدير النظام</option>
//                 </select>
//               </div>

//               <div className="flex items-center justify-center">
//                 <button
//                   type="submit"
//                   className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                 >
//                   إرسال الإشعار
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={toggleForm}
//         className={notificationButtonStyles.button}
//         title="إضافة إشعار جديد"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className={notificationButtonStyles.icon}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default NotificationButton;
