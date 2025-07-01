import { Link } from 'react-router-dom';
import { User, Lock, Phone, IdCard, MapPin, Camera, PlusCircle } from 'lucide-react';
import logo from "../../assets/urlogo.png"
import RegisterHook from '../../hook/auth/register-hook';
import { Toaster } from 'react-hot-toast';

const Register = () => {
  const [
    registrationType,
    handleRegistrationTypeChange,
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
    newCenter,
    handleNewCenterChange,
    hasVotingRight,
    handleHasVotingRightChange,
    idUpdated,
    handleIdUpdatedChange,
    handleSubmit,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview
  ] = RegisterHook();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="شعار النظام الانتخابي" className="w-32 h-32" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">التسجيل</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-8 w-full">
            <button
              type="button"
              className={`p-4 rounded-lg text-center ${registrationType === 'voter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleRegistrationTypeChange('voter')}
            >
              ناخب
            </button>
            <button
              type="button"
              className={`p-4 rounded-lg text-center ${registrationType === 'observer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleRegistrationTypeChange('observer')}
            >
              مراقب
            </button>
            <button
              type="button"
              className={`p-4 rounded-lg text-center ${registrationType === 'center_manager' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleRegistrationTypeChange('center_manager')}
            >
              مدير مركز
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">المعلومات الأساسية</h3>
              <div className="grid md:grid-cols-2 gap-4">
              
              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="الاسم الأول"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الأب"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={fatherName}
                  onChange={handleFatherNameChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الجد"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={grandFatherName}
                  onChange={handleGrandFatherNameChange}
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  placeholder="سنة الميلاد"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={birthYear}
                  onChange={handleBirthYearChange}
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              </div>
            </div>

          {/* الوثائق والصور */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">الوثائق والصور</h3>
              <div className="grid md:grid-cols-3 gap-4">
              
                <div className="relative border-2 border-dashed rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center overflow-hidden">
                  {personalPhotoPreview ? (
                    <div className="w-full h-full relative group">
                      <img src={personalPhotoPreview} alt="الصورة الشخصية" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('personalPhoto').click()}
                          className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                          تغيير الصورة
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Camera className="text-gray-400 mb-2" size={32} />
                      <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الشخصية</label>
                      <button
                        type="button"
                        onClick={() => document.getElementById('personalPhoto').click()}
                        className="bg-blue-50 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
                      >
                        اختر صورة
                      </button>
                    </>
                  )}
                  <input
                    id="personalPhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setPersonalPhoto, setPersonalPhotoPreview)}
                  />
                </div>

                <div className="relative border-2 border-dashed rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center overflow-hidden">
                  {idPhotoPreview ? (
                    <div className="w-full h-full relative group">
                      <img src={idPhotoPreview} alt="صورة الهوية" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('idPhoto').click()}
                          className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                          تغيير الصورة
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <IdCard className="text-gray-400 mb-2" size={32} />
                      <label className="block text-sm font-medium text-gray-700 mb-2">صورة الهوية</label>
                      <button
                        type="button"
                        onClick={() => document.getElementById('idPhoto').click()}
                        className="bg-blue-50 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
                      >
                        اختر صورة
                      </button>
                    </>
                  )}
                  <input
                    type="file"
                    id="idPhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setIdPhoto, setIdPhotoPreview)}
                  />
                </div>

                {registrationType !== 'voter' && (
                  <div className="relative border-2 border-dashed rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center overflow-hidden">
                    {electionCardPhotoPreview ? (
                      <div className="w-full h-full relative group">
                        <img src={electionCardPhotoPreview} alt="صورة بطاقة الانتخاب" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => document.getElementById('electionCardPhoto').click()}
                            className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
                          >
                            تغيير الصورة
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <IdCard className="text-gray-400 mb-2" size={32} />
                        <label className="block text-sm font-medium text-gray-700 mb-2">صورة بطاقة الانتخاب</label>
                        <button
                          type="button"
                          onClick={() => document.getElementById('electionCardPhoto').click()}
                          className="bg-blue-50 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
                        >
                          اختر صورة
                        </button>
                      </>
                    )}
                    <input
                      type="file"
                      id="electionCardPhoto"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setElectionCardPhoto, setElectionCardPhotoPreview)}
                    />
                  </div>
                )}


              </div>
          </div>



          {(registrationType === 'voter' || registrationType === 'observer' || registrationType === 'center_manager') && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">معلومات المركز الانتخابي</h3>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم المركز الانتخابي"
                  className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={newCenter}
                  onChange={handleNewCenterChange}
                />
              </div>
            </div>
          )}

          {registrationType === 'voter' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">معلومات إضافية</h3>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <input
                  type="checkbox"
                  name="hasVotingRight"
                  id="hasVotingRight"
                  className="h-4 w-4 text-blue-500"
                  checked={hasVotingRight}
                  onChange={handleHasVotingRightChange}
                />
                <label htmlFor="hasVotingRight" className="text-gray-700">لدي حق التصويت</label>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <input
                  type="checkbox"
                  name="idUpdated"
                  id="idUpdated"
                  className="h-4 w-4 text-blue-500"
                  checked={idUpdated}
                  onChange={handleIdUpdatedChange}
                />
                <label htmlFor="idUpdated" className="text-gray-700">قمت بتحديث الهوية</label>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4 w-full max-w-6xl mx-auto">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              تسجيل
            </button>

            <Link
              to="/login"
              className="text-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
      <Toaster />

    </div>
  );
};

export default Register;