import { useState } from 'react';
import { User, Lock, Phone, IdCard, MapPin, Camera, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import logo from "../../../assets/urlogo.png";
import CoordinatorRegisterHook from '../../../hook/auth/coordinator-register-hook';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import GetAllCenter from '../../../hook/Center/get-all-center';

const CoordinatorRegisterModal = ({ onClose }) => {
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
    personalPhoto,
    personalPhotoPreview,
    handleFileChange,
    idPhoto,
    idPhotoPreview,
    electionCardPhoto,
    electionCardPhotoPreview,
    newCenter,
    handleNewCenterChange,
    handleSubmit,
    setPersonalPhoto,
    setPersonalPhotoPreview,
    setIdPhoto,
    setIdPhotoPreview,
    setElectionCardPhoto,
    setElectionCardPhotoPreview
  ] = CoordinatorRegisterHook(onClose);

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
          <h2 className="text-2xl font-bold text-center text-gray-800">تسجيل مرتكز جديد</h2>
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
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full pr-10 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="relative">
                <User className="absolute right-3 top-2 text-gray-400" size={18} />
                <input
                  type="number"
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
                  placeholder="كلمة المرور"
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-right">الوثائق والصور</h3>
            <div className="grid md:grid-cols-3 gap-4 w-full">
              <div className="relative border-2 border-dashed rounded-lg p-3 text-center h-40 flex flex-col items-center justify-center overflow-hidden">
                {personalPhotoPreview ? (
                  <div className="w-full h-full relative group">
                    <img src={personalPhotoPreview} alt="الصورة الشخصية" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => document.getElementById('personalPhoto').click()}
                        className="bg-white text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        تغيير الصورة
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Camera className="text-gray-400 mb-2" size={28} />
                    <label className="block text-sm font-medium text-gray-700 mb-1">الصورة الشخصية</label>
                    <button
                      type="button"
                      onClick={() => document.getElementById('personalPhoto').click()}
                      className="bg-blue-50 text-blue-500 px-3 py-1.5 rounded-lg hover:bg-blue-100 text-sm"
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

              <div className="relative border-2 border-dashed rounded-lg p-3 text-center h-40 flex flex-col items-center justify-center overflow-hidden">
                {idPhotoPreview ? (
                  <div className="w-full h-full relative group">
                    <img src={idPhotoPreview} alt="صورة الهوية" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => document.getElementById('idPhoto').click()}
                        className="bg-white text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        تغيير الصورة
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <IdCard className="text-gray-400 mb-2" size={28} />
                    <label className="block text-sm font-medium text-gray-700 mb-1">صورة الهوية</label>
                    <button
                      type="button"
                      onClick={() => document.getElementById('idPhoto').click()}
                      className="bg-blue-50 text-blue-500 px-3 py-1.5 rounded-lg hover:bg-blue-100 text-sm"
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

              <div className="relative border-2 border-dashed rounded-lg p-3 text-center h-40 flex flex-col items-center justify-center overflow-hidden">
                {electionCardPhotoPreview ? (
                  <div className="w-full h-full relative group">
                    <img src={electionCardPhotoPreview} alt="صورة بطاقة الانتخاب" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => document.getElementById('electionCardPhoto').click()}
                        className="bg-white text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        تغيير الصورة
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <IdCard className="text-gray-400 mb-2" size={28} />
                    <label className="block text-sm font-medium text-gray-700 mb-1">صورة بطاقة الانتخاب</label>
                    <button
                      type="button"
                      onClick={() => document.getElementById('electionCardPhoto').click()}
                      className="bg-blue-50 text-blue-500 px-3 py-1.5 rounded-lg hover:bg-blue-100 text-sm"
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
            </div>
          </div>

   <div className="relative">
              <MapPin
                className="absolute right-3 top-2 text-gray-400 z-10"
                size={18}
              />
              {loading ? (
                <div className="w-full pr-10 py-2 border rounded-lg text-right">
                  جاري تحميل المراكز...
                </div>
              ) : (
                <Select
                  placeholder="اختر المركز الانتخابي"
                  value={electionCenters?.find(option => option.id === newCenter) ? 
                    { value: newCenter, label: electionCenters.find(option => option.id === newCenter).name } : null}
                  onChange={(selectedOption) => handleNewCenterChange({ target: { value: selectedOption.value } })}
                  options={electionCenters?.map(center => ({ value: center.id, label: center.name }))}
                  className="w-full text-right"
                  classNamePrefix="select"
                  isRtl={true}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      paddingRight: '2.5rem',
                      borderRadius: '0.5rem',
                      borderColor: '#e2e8f0',
                      '&:hover': {
                        borderColor: '#cbd5e0'
                      }
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      textAlign: 'right'
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      textAlign: 'right',
                      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
                      color: state.isSelected ? 'white' : '#1f2937',
                      '&:hover': {
                        backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff',
                      }
                    }),
                    menu: (baseStyles) => ({
                      ...baseStyles,
                      zIndex: 50
                    })
                  }}
                  noOptionsMessage={() => "لا توجد مراكز متاحة"}
                />
              )}
            </div>

           <div className="flex flex-col space-x-4 space-x-reverse justify-end w-full mt-4">
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-5 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              تسجيل
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-5 rounded-lg font-medium text-sm transition-colors duration-200"
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

export default CoordinatorRegisterModal;
