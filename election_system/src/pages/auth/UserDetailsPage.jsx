import React, { use } from "react";
import Sidebar from "../../Components/Uitily/Sidebar";
import logo from "../../assets/urlogo.png";
import { useParams } from "react-router-dom";
import OneUserHook from "../../hook/auth/one-user-hook";
// استخدام div بدلاً من Card

const UserDetailsPage = () => {

const {id} = useParams();
const [singleUser, isLoading] = OneUserHook(id);
console.log(singleUser);

  // بيانات ثابتة للعرض
  const userData = {
    personalInfo: {
      "الاسم الكامل": "محمد أحمد علي",
      "الاسم الأول": "محمد",
      "اسم الأب": "أحمد",
      "سنة الميلاد": "1990",
      "رقم الهاتف": "07701234567",
      "تم التسجيل بواسطة": "مدير النظام",
    },
    documents: {
      voterCardImage: logo,
    },
    voterInfo: {
      المحافظة: "بغداد",
      القضاء: "الكرخ",
      الناحية: "المنصور",
      "رقم المركز": "123",
    },
    systemInfo: {
      الدور: "ناخب",
      "المركز الانتخابي": "مركز المنصور",
      "حالة التحقق": "تم التحقق",
      "تاريخ التسجيل": "2024-01-15",
      "آخر تحديث": "2024-01-20",
    },
    electionCenter: {
      "اسم المركز": "مركز المنصور للانتخابات",
      الرمز: "BGW-123",
      العنوان: "شارع 14 رمضان",
      المحافظة: "بغداد",
      القضاء: "الكرخ",
    },
  };

  const InfoSection = ({ title, data }) => (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-blue-200 transition-colors duration-300">
      <div className="flex items-center mb-6 border-b border-gray-200 pb-3">
        <div className="w-1 h-6 bg-blue-500 mr-3"></div>
        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">{title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col p-4 bg-gray-50 rounded-md border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
          >
            <span className="text-sm font-medium text-gray-600 mb-2 flex items-center">
              <span className="w-3 h-[2px] bg-blue-400 mr-2"></span>
              {key}
            </span>
            <span className="text-base text-gray-700">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <div className="px-4 py-8">
      <div className="w-full mb-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center relative flex flex-col items-center justify-center mb-8">
            <span className="mb-3 tracking-wide">معلومات المستخدم</span>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-sm"></div>
          </h1>
      </div>

      <div className="w-full space-y-8">
        {/* الصور والمستندات */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-blue-200 transition-colors duration-300">
          <div className="flex items-center mb-6 border-b border-gray-200 pb-3">
            <div className="w-1 h-6 bg-blue-500 mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              الصور والمستندات
            </h2>
          </div>
          <div className="flex items-center justify-center p-6 border border-gray-200 rounded-lg bg-gray-50 gap-20">
            <img
              src={userData.documents.voterCardImage}
              alt="صورة بطاقة الناخب"
              className="max-w-2xl rounded-lg shadow-lg hover:shadow-blue-100 transition-shadow duration-300"
            />
            <img
              src={userData.documents.voterCardImage}
              alt="صورة بطاقة الناخب"
              className="max-w-2xl rounded-lg shadow-lg hover:shadow-blue-100 transition-shadow duration-300"
            />
            <img
              src={userData.documents.voterCardImage}
              alt="صورة بطاقة الناخب"
              className="max-w-2xl rounded-lg shadow-lg hover:shadow-blue-100 transition-shadow duration-300"
            />
          </div>
        </div>

        {/* البيانات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* معلومات النظام والمركز */}
          <div className="space-y-8">
            <InfoSection
              title="البيانات الشخصية"
              data={userData.personalInfo}
            />

            <InfoSection
              title="المركز الانتخابي"
              data={userData.electionCenter}
            />
          </div>

          {/* البيانات الشخصية والناخب */}
          <div className="space-y-8">
            <InfoSection title="معلومات النظام" data={userData.systemInfo} />
            <InfoSection title="معلومات الناخب" data={userData.voterInfo} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetailsPage;
