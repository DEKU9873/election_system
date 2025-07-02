import { useState } from 'react';
import { User, Lock, Phone, IdCard, MapPin, Camera } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import logo from "../../assets/urlogo.png";
import RegisterHook from '../../hook/auth/register-hook';
import { Link } from 'react-router-dom';

const CoordinatorRegister = () => {
  const [
    _,
    __,
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
    personalPhoto,
    personalPhotoPreview,
    handleFileChange,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    ___, // newCenter, not used here
    ____, // handleNewCenterChange, not used
    _____,
    ______,
    _______,
    ________,
    handleSubmit,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview
  ] = RegisterHook();

  // 🟨 حقل خاص بالمراكز المتعددة
  const [centers, setCenters] = useState([""]);

  const handleCenterChange = (index, value) => {
    const updated = [...centers];
    updated[index] = value;
    setCenters(updated);
  };

  const addCenter = () => {
    setCenters([...centers, ""]);
  };

  const removeCenter = (index) => {
    const updated = centers.filter((_, i) => i !== index);
    setCenters(updated);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="شعار النظام الانتخابي" className="w-28 h-28" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">تسجيل منسق</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🧾 البيانات الأساسية */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="الاسم الأول" className="w-full pr-10 py-2 border rounded-lg text-right" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="اسم الأب" className="w-full pr-10 py-2 border rounded-lg text-right" value={fatherName} onChange={handleFatherNameChange} />
            </div>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="اسم الجد" className="w-full pr-10 py-2 border rounded-lg text-right" value={grandFatherName} onChange={handleGrandFatherNameChange} />
            </div>
            <div className="relative">
              <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="tel" placeholder="رقم الهاتف" className="w-full pr-10 py-2 border rounded-lg text-right" value={phone} onChange={handlePhoneChange} />
            </div>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="number" placeholder="سنة الميلاد" className="w-full pr-10 py-2 border rounded-lg text-right" value={birthYear} onChange={handleBirthYearChange} />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="password" placeholder="كلمة المرور" className="w-full pr-10 py-2 border rounded-lg text-right" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input type="password" placeholder="تأكيد كلمة المرور" className="w-full pr-10 py-2 border rounded-lg text-right" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
          </div>

          {/* 📸 الوثائق */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* الصورة الشخصية */}
            <FileUploadPreview
              id="personalPhoto"
              label="الصورة الشخصية"
              preview={personalPhotoPreview}
              icon={<Camera size={32} className="text-gray-400 mb-2" />}
              handleChange={(e) => handleFileChange(e, setPersonalPhoto, setPersonalPhotoPreview)}
            />

            {/* الهوية */}
            <FileUploadPreview
              id="idPhoto"
              label="صورة الهوية"
              preview={idPhotoPreview}
              icon={<IdCard size={32} className="text-gray-400 mb-2" />}
              handleChange={(e) => handleFileChange(e, setIdPhoto, setIdPhotoPreview)}
            />

            {/* بطاقة الانتخاب */}
            <FileUploadPreview
              id="electionCardPhoto"
              label="صورة بطاقة الانتخاب"
              preview={electionCardPhotoPreview}
              icon={<IdCard size={32} className="text-gray-400 mb-2" />}
              handleChange={(e) => handleFileChange(e, setElectionCardPhoto, setElectionCardPhotoPreview)}
            />
          </div>

          {/* 🏢 مراكز متعددة */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">المراكز الانتخابية</h3>
            {centers.map((center, index) => (
              <div key={index} className="relative mb-2">
                <MapPin className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`اسم المركز ${index + 1}`}
                  className="w-full pr-10 py-2 border rounded-lg text-right"
                  value={center}
                  onChange={(e) => handleCenterChange(index, e.target.value)}
                />
                {centers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCenter(index)}
                    className="absolute left-2 top-2 text-red-500 text-sm"
                  >
                    حذف
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCenter}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              + إضافة مركز آخر
            </button>
          </div>

          {/* زر التسجيل */}
          <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700">
            تسجيل المنسق
          </button>

          <Link to="/login" className="text-center block text-blue-500 hover:text-blue-600 mt-4">
            لديك حساب؟ تسجيل الدخول
          </Link>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

// 🔧 مكون مساعد لعرض صورة وتحميل ملف
const FileUploadPreview = ({ id, label, preview, icon, handleChange }) => (
  <div className="relative border-2 border-dashed rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center overflow-hidden">
    {preview ? (
      <div className="w-full h-full relative group">
        <img src={preview} alt={label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={() => document.getElementById(id).click()}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            تغيير
          </button>
        </div>
      </div>
    ) : (
      <>
        {icon}
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <button
          type="button"
          onClick={() => document.getElementById(id).click()}
          className="bg-blue-50 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          اختر صورة
        </button>
      </>
    )}
    <input type="file" id={id} accept="image/*" className="hidden" onChange={handleChange} />
  </div>
);

export default CoordinatorRegister;
