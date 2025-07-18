import React, { useState } from 'react'
import Cookies from "js-cookie";
import { User, Mail, Phone, Calendar, Key } from 'lucide-react';
import Sidebar from '../../Components/Uitily/Sidebar';
import { ChangePasswordModal } from '../../Components/AuthModal';

const ProfilePage = () => {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  
  // State for change password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // التحقق من وجود بيانات المستخدم
  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-center text-gray-600">لا توجد بيانات مستخدم متاحة</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, title, value, bgColor = "bg-blue-50", iconColor = "text-blue-600" }) => (
    <div className={`${bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className={`p-2 rounded-full bg-white ${iconColor}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ condition, trueText, falseText, trueColor = "bg-green-100 text-green-800", falseColor = "bg-red-100 text-red-800" }) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      condition ? trueColor : falseColor
    }`}>
      {condition ? trueText : falseText}
    </span>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 rtl:md:space-x-reverse">
              <div className="relative">
                <img
                 src={user.profile_image_url || "/api/placeholder/120/120"}
                 alt="صورة الملف الشخصي"
                 className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                 onError={(e) => {
                   e.target.src = "/api/placeholder/120/120";
                 }}
               />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-center md:text-right flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                   {user.full_name}
                 </h1>
                 <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                   <StatusBadge 
                     condition={user.role === 'owner'} 
                     trueText="مالك" 
                     falseText={user.role}
                     trueColor="bg-purple-100 text-purple-800"
                   />
                   <StatusBadge 
                     condition={user.is_active} 
                     trueText="نشط" 
                     falseText="غير نشط"
                   />
                 </div>
                 <p className="text-gray-600">معرف المستخدم: #{user.id}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  <Key size={16} className="ml-2" />
                  تغيير كلمة المرور
                </button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="ml-2 text-blue-600" size={24} />
              المعلومات الأساسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard 
                 icon={User} 
                 title="الاسم الأول" 
                 value={user.first_name}
               />
               <InfoCard 
                 icon={User} 
                 title="الاسم الثاني" 
                 value={user.second_name}
               />
               <InfoCard 
                 icon={User} 
                 title="الاسم الأخير" 
                 value={user.last_name}
               />
               <InfoCard 
                 icon={Mail} 
                 title="البريد الإلكتروني" 
                 value={user.email}
                 bgColor="bg-green-50"
                 iconColor="text-green-600"
               />
               <InfoCard 
                 icon={Phone} 
                 title="رقم الهاتف" 
                 value={user.phone_number}
                 bgColor="bg-orange-50"
                 iconColor="text-orange-600"
               />
               <InfoCard 
                 icon={Calendar} 
                 title="سنة الميلاد" 
                 value={user.birth_year}
                 bgColor="bg-purple-50"
                 iconColor="text-purple-600"
               />
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
  )
}

export default ProfilePage
