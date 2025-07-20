import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Key,
  FileText,
  Award,
  MapPin,
  Clock,
} from "lucide-react";
import Sidebar from "../../Components/Uitily/Sidebar";
import ChangePasswordModal from "./Auth Modal/ChangePasswordModal";

const ProfilePage = () => {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  // State for change password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // التحقق من وجود بيانات المستخدم
  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border-t-4 border-blue-500 border-r border-b border-l p-6">
              <p className="text-center text-gray-600">
                لا توجد بيانات مستخدم متاحة
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({
    icon: Icon,
    title,
    value,
    borderColor = "border-blue-500",
  }) => (
    <div
      className={`bg-white rounded-lg p-5 shadow-sm border-t-4 ${borderColor} border-r border-b border-l`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <Icon size={18} className="text-gray-500" />
        </div>
        <div className="flex-1 mr-3">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="font-semibold text-gray-800 text-lg">
            {value || "غير متوفر"}
          </p>
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({
    condition,
    trueText,
    falseText,
    trueColor = "bg-green-100 text-green-800 border-green-300",
    falseColor = "bg-red-100 text-red-800 border-red-300",
  }) => (
    <span
      className={`px-3 py-1 rounded-md text-sm font-medium border ${
        condition ? trueColor : falseColor
      }`}
    >
      {condition ? trueText : falseText}
    </span>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 lg:p-10 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-500 border-r border-b border-l p-10 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-l border-gray-200 pb-6 md:pb-0">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10"></div>
                  <img
                    src={user.profile_image_url || "/api/placeholder/120/120"}
                    alt="صورة الملف الشخصي"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/120/120";
                    }}
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
                  {user.full_name}
                </h1>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <StatusBadge
                    condition={user.role === "owner"}
                    trueText="مالك"
                    falseText={user.role}
                    trueColor="bg-blue-100 text-blue-800 border-blue-300"
                  />
                  <StatusBadge
                    condition={user.is_active}
                    trueText="نشط"
                    falseText="غير نشط"
                  />
                </div>
                <p className="text-gray-500 text-base mb-5 flex items-center">
                  <FileText size={14} className="ml-1" />
                  معرف المستخدم: #{user.id}
                </p>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-medium mt-2"
                >
                  <Key size={18} className="ml-2" />
                  تغيير كلمة المرور
                </button>
              </div>

              <div className="md:w-2/3 md:pr-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                  <User className="ml-3 text-blue-500" size={24} />
                  المعلومات الشخصية
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="flex items-center">
                    <User size={20} className="text-gray-400 ml-3" />
                    <div>
                      <p className="text-sm text-gray-500">الاسم الكامل</p>
                      <p className="font-medium text-base">{`${user.first_name} ${user.second_name} ${user.last_name}`}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail size={18} className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-medium text-base">
                        {user.email || "غير متوفر"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <p className="font-medium text-base">
                        {user.phone_number || "غير متوفر"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">سنة الميلاد</p>
                      <p className="font-medium text-base">
                        {user.birth_year || "غير متوفر"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Award size={18} className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">الدور</p>
                      <p className="font-medium text-base">
                        {user.role || "غير متوفر"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Modal */}
          <ChangePasswordModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
