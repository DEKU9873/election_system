import { Camera, IdCard, Lock, Phone, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/urlogo.png";
import RegisterHook from "../../hook/auth/register-hook";

const SelfRegister = () => {
  const [
    firstName,
    setFirstName,
    fatherName,
    setFatherName,
    grandFatherName,
    setGrandFatherName,
    phone,
    setPhone,
    birthYear,
    setBirthYear,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    electionCenter,
    setElectionCenter,
    hasVotingRight,
    setHasVotingRight,
    idCardUpdated,
    setIdCardUpdated,
    personalPhoto,
    handleFileChange,
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
    setPersonalPhoto,
    setPersonalPhotoPreview,
  ] = RegisterHook();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4 md:p-8"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="شعار النظام الانتخابي" className="w-32 h-32" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          تسجيل ناخب جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* المعلومات الأساسية */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              المعلومات الأساسية
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="الاسم الأول"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الأب"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الجد"
                  value={grandFatherName}
                  onChange={(e) => setGrandFatherName(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <IdCard className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  placeholder="سنة الميلاد"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <MapPin className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="اسم المركز الانتخابي"
                value={electionCenter}
                onChange={(e) => setElectionCenter(e.target.value)}
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
                onChange={(e) => setHasVotingRight(e.target.checked)}
                className="h-4 w-4 text-blue-500"
              />
              <label htmlFor="hasVotingRight" className="text-gray-700">
                لدي حق التصويت
              </label>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <input
                type="checkbox"
                id="idUpdated"
                checked={idCardUpdated}
                onChange={(e) => setIdCardUpdated(e.target.checked)}
                className="h-4 w-4 text-blue-500"
              />
              <label htmlFor="idUpdated" className="text-gray-700">
                قمت بتحديث الهوية
              </label>
            </div>
          </div>

          {/* الصور والمستندات */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              الصور والمستندات
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* الصورة الشخصية */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">الصورة الشخصية</label>
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
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">اختر صورة</span>
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
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md hover:bg-blue-700 transition-colors"
          >
            تسجيل
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelfRegister;
