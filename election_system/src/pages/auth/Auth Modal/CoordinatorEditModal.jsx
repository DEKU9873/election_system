import { useState } from 'react';
import { User, Lock, Phone, IdCard, MapPin, Camera, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import logo from "../../../assets/urlogo.png";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import GetAllCenter from '../../../hook/Center/get-all-center';
import useEditUser from '../../../hook/auth/edit-user-hook';

const CoordinatorEditModal = ({ onClose, userData }) => {
  // استخدام هوك تعديل المستخدم
  const {
    // البيانات الأساسية
    firstName,
    fatherName,
    grandFatherName,
    phone,
    birthYear,
    password,
    confirmPassword,
    newCenter,
    // الصور ومعايناتها
    personalPhoto,
    personalPhotoPreview,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    // معالجات الأحداث
    handleFirstNameChange,
    handleFatherNameChange,
    handleGrandFatherNameChange,
    handlePhoneChange,
    handleBirthYearChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNewCenterChange,
    handleFileChange,
    handleSubmit,
    // حالة التحميل
    isLoading,
  } = useEditUser(userData, onClose, "coordinator");

  const [electionCenters, loading] = GetAllCenter();

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div
        className="bg-white backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col items-center relative max-h-[75vh] overflow-y-auto my-6 scrollbar-right"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="شعار النظام الانتخابي" className="w-20 h-20 mb-1" />
          <h2 className="text-2xl font-bold text-center text-gray-800">تعديل بيانات المنسق</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="space-y-3 w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-right">المعلومات الأساسية</h3>
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <div className="relative">
                <User className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="الاسم الأول"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="اسم الأب"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={fatherName}
                  onChange={handleFatherNameChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="اسم الجد"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={grandFatherName}
                  onChange={handleGrandFatherNameChange}
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="رقم الهاتف"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="relative">
                <IdCard className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="سنة الميلاد"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="كلمة المرور (اتركها فارغة إذا لم ترغب بتغييرها)"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-right">معلومات المركز الانتخابي</h3>
            <div className="relative">
              <MapPin className="absolute right-3 top-2 text-gray-400" size={18} />
              {loading ? (
                <div className="w-full pr-10 py-2 border rounded-lg text-right">
                  جاري تحميل المراكز...
                </div>
              ) : (
                <select
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={newCenter}
                  onChange={handleNewCenterChange}
                >
                  <option value="">اختر المركز الانتخابي</option>
                  {electionCenters?.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="space-y-3 w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-right">الصور</h3>
            <div className="grid md:grid-cols-3 gap-4 w-full">
              {/* صورة شخصية */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-2 overflow-hidden">
                  {personalPhotoPreview ? (
                    <>
                      <img
                        src={personalPhotoPreview}
                        alt="معاينة الصورة الشخصية"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPersonalPhoto(null);
                          setPersonalPhotoPreview(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Camera size={32} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">الصورة الشخصية</p>
                      <p className="text-xs text-gray-400 text-center mt-1">اضغط للتحميل</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, setPersonalPhoto, setPersonalPhotoPreview)}
                  />
                </div>
                <span className="text-xs text-gray-500">الصورة الشخصية</span>
              </div>

              {/* صورة الهوية */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-2 overflow-hidden">
                  {idPhotoPreview ? (
                    <>
                      <img
                        src={idPhotoPreview}
                        alt="معاينة صورة الهوية"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIdPhoto(null);
                          setIdPhotoPreview(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <IdCard size={32} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">صورة الهوية</p>
                      <p className="text-xs text-gray-400 text-center mt-1">اضغط للتحميل</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, setIdPhoto, setIdPhotoPreview)}
                  />
                </div>
                <span className="text-xs text-gray-500">صورة الهوية</span>
              </div>

              {/* صورة البطاقة الانتخابية */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-2 overflow-hidden">
                  {electionCardPhotoPreview ? (
                    <>
                      <img
                        src={electionCardPhotoPreview}
                        alt="معاينة صورة البطاقة الانتخابية"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setElectionCardPhoto(null);
                          setElectionCardPhotoPreview(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <IdCard size={32} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">صورة البطاقة الانتخابية</p>
                      <p className="text-xs text-gray-400 text-center mt-1">اضغط للتحميل</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, setElectionCardPhoto, setElectionCardPhotoPreview)}
                  />
                </div>
                <span className="text-xs text-gray-500">صورة البطاقة الانتخابية</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-x-4 space-x-reverse justify-end w-full mt-4">
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-5 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-5 rounded-lg font-medium text-sm transition-colors duration-200"
              disabled={isLoading}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CoordinatorEditModal;