import React from "react";
import Sidebar from "../../Components/Uitily/Sidebar";
import { useParams } from "react-router-dom";
import OneUserHook from "../../hook/auth/one-user-hook";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [singleUser, isLoading] = OneUserHook(id);

  if (isLoading || !singleUser) {
    return <div>جاري تحميل البيانات...</div>;
  }

  const InfoSection = ({ title, data }) => (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-md border border-gray-200 hover:border-blue-200 transition-colors duration-300">
      <div className="flex items-center mb-3 sm:mb-4 md:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
        <div className="w-1 h-6 bg-blue-500 mr-3"></div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col p-2 sm:p-3 md:p-4 bg-gray-50 rounded-md border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{key}</span>
            <span className="text-sm sm:text-base text-gray-700">{value ?? "لا يوجد"}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // تجهيز بيانات المستخدم من singleUser
  const personalInfo = {
    "الاسم الكامل": singleUser.full_name,
    "الاسم الأول": singleUser.first_name,
    "الاسم الثاني": singleUser.second_name,
    "الاسم الأخير": singleUser.last_name,
    "سنة الميلاد": singleUser.birth_year,
    "رقم الهاتف": singleUser.phone_number,
    "تم التسجيل بواسطة": singleUser.added_by || "لا يوجد",
  };

  const voterInfo = {
    "المحافظة": singleUser.governorate_id || "لا يوجد",
    "القضاء": singleUser.district_id || "لا يوجد",
    "الناحية": singleUser.subdistrict_id || "لا يوجد",
    "المركز الانتخابي": singleUser.election_center_id || "لا يوجد",

  };

  const systemInfo = {
    "الدور": singleUser.role,
    "نوع التسجيل": singleUser.registration_type,
    "الحالة النشطة": singleUser.is_active ? "فعال" : "غير فعال",
    "تاريخ التسجيل": new Date(singleUser.createdAt).toLocaleDateString(),
    "آخر تحديث": new Date(singleUser.updatedAt).toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* <Sidebar /> */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="w-full mb-6 sm:mb-8 md:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">معلومات المستخدم</h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-sm mx-auto"></div>
        </div>

        <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-md border border-gray-200 mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 border-b border-gray-200 pb-2 sm:pb-3">الصور والمستندات</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-6 border border-gray-200 rounded-lg bg-gray-50">
            <img
              src={singleUser.profile_image_url || "/default-profile.png"}
              alt="صورة المستخدم"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-lg shadow-md"
            />
            <img
              src={singleUser.identity_image_url || "/default-identity.png"}
              alt="صورة الهوية"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <img
              src={singleUser.voting_card_image_url || "/default-voting-card.png"}
              alt="صورة بطاقة الناخب"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <InfoSection title="البيانات الشخصية" data={personalInfo} />
          <InfoSection title="معلومات الناخب" data={voterInfo} />
          <InfoSection title="معلومات النظام" data={systemInfo} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
