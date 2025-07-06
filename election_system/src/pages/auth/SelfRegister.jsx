import { Camera, IdCard, Lock, Phone, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/urlogo.png";
import SelfRegisterHook from "../../hook/auth/self-register-hook";
import { Toaster } from "react-hot-toast";

const SelfRegister = () => {
  const [
    firstName,
    handleFirstNameChange,
    fatherName,
    handleFatherNameChange,
    grandFatherName,
    handleGrandFatherNameChange,
    phone,
    handlePhoneChange,
    birthYear,
    handleBirthYearChange,
    password,
    handlePasswordChange,
    confirmPassword,
    handleConfirmPasswordChange,
    electionCenter,
    handleElectionCenterChange,
    hasVotingRight,
    handleHasVotingRightChange,
    idCardUpdated,
    handleIdCardUpdatedChange,
    personalPhoto,
    handleFileChange,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    personalPhotoPreview,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    handleSubmit,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview,
  ] = SelfRegisterHook();


  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-3 sm:p-4 md:p-8"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-8">
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <img src={logo} alt="شعار النظام الانتخابي" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8">
          تسجيل ناخب جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* المعلومات الأساسية */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-3 md:mb-4">
              المعلومات الأساسية
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="الاسم الأول"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الأب"
                  value={fatherName}
                  onChange={handleFatherNameChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الجد"
                  value={grandFatherName}
                  onChange={handleGrandFatherNameChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <IdCard className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="number"
                  placeholder="سنة الميلاد"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>
            </div>
          </div>

          {/* المركز الانتخابي */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              معلومات المركز الانتخابي
            </h3>
            <div className="relative">
              <MapPin className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="اسم المركز الانتخابي"
                value={electionCenter}
                onChange={handleElectionCenterChange}
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
              />
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              معلومات إضافية
            </h3>
            <div className="flex items-center space-x-4 space-x-reverse">
              <input
                type="checkbox"
                id="hasVotingRight"
                checked={hasVotingRight}
                onChange={handleHasVotingRightChange}
                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500"
              />
              <label htmlFor="hasVotingRight" className="text-gray-700 text-sm sm:text-base">
                لدي حق التصويت
              </label>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <input
                type="checkbox"
                id="idUpdated"
                checked={idCardUpdated}
                onChange={handleIdCardUpdatedChange}
                className="h-4 w-4 text-blue-500"
              />
              <label htmlFor="idUpdated" className="text-gray-700 text-sm sm:text-base">
                قمت بتحديث الهوية
              </label>
            </div>
          </div>

          {/* الصور والمستندات */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              الصور والمستندات
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {/* الصورة الشخصية */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium text-sm sm:text-base">الصورة الشخصية</label>
                <div className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setPersonalPhoto, setPersonalPhotoPreview)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {personalPhotoPreview ? (
                    <img
                      src={personalPhotoPreview}
                      alt="معاينة الصورة الشخصية"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" />
                      <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">اختر صورة</span>
                    </div>
                  )}
                </div>
              </div>

              {/* صورة الهوية */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">صورة الهوية</label>
                <div className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setIdPhoto, setIdPhotoPreview)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {idPhotoPreview ? (
                    <img
                      src={idPhotoPreview}
                      alt="معاينة صورة الهوية"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">اختر صورة</span>
                    </div>
                  )}
                </div>
              </div>

              {/* صورة البطاقة الانتخابية */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">صورة البطاقة الانتخابية</label>
                <div className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, setElectionCardPhoto, setElectionCardPhotoPreview)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {electionCardPhotoPreview ? (
                    <img
                      src={electionCardPhotoPreview}
                      alt="معاينة صورة البطاقة الانتخابية"
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">اختر صورة</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg font-medium text-sm sm:text-base shadow-md hover:bg-blue-700 transition-colors"
          >
            تسجيل
          </button>

          <div className="text-center mt-3 sm:mt-4">
            <Link to="/login" className="text-blue-600 hover:underline text-sm sm:text-base">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
      <Toaster />

    </div>
  );
};

export default SelfRegister;
