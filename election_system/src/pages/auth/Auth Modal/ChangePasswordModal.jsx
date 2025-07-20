import React, { useEffect, useRef } from 'react';
import { Key, Eye, EyeOff, X, LogIn } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useChangePassword } from '../../../hook/auth/useChangePassword';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  // استخدام useRef لتتبع ما إذا كان النموذج جاهزًا للتقديم
  const formReady = useRef(false);
  const formRef = useRef(null);
  
  const {
    passwordData,
    showOldPassword,
    showNewPassword,
    showConfirmPassword,
    loading,
    error,
    setPasswordData,
    setShowOldPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handlePasswordChange,
    resetForm
  } = useChangePassword(onClose);

  const handleClose = () => {
    resetForm();
    formReady.current = false;
    onClose();
  };

  // تعامل مع تقديم النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    // تحقق من أن النموذج جاهز للتقديم
    if (formReady.current) {
      handlePasswordChange(e);
    }
  };

  // تعيين النموذج كجاهز للتقديم عند تغيير أي من حقول كلمة المرور
  const handleInputChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
    // بمجرد أن يبدأ المستخدم في الكتابة، يصبح النموذج جاهزًا للتقديم
    formReady.current = true;
  };

  // إعادة تعيين النموذج عند فتح النافذة المنبثقة
  useEffect(() => {
    if (isOpen) {
      // إعادة تعيين النموذج عند فتح النافذة المنبثقة
      resetForm();
      formReady.current = false;
      
      // تأخير صغير لضمان تحميل النموذج بالكامل
      const timer = setTimeout(() => {
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-2 sm:p-4" onClick={handleClose}>
     <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "55px",
          },
        }}
      />
      <div className="absolute inset-0" />
      <div className="bg-white backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">تغيير كلمة المرور</h1>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="w-full"
          autoComplete="off"
          dir="rtl">
          <div className="w-full grid grid-cols-1 gap-4 sm:gap-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-right">
              {typeof error === 'string' ? error : 'حدث خطأ أثناء تغيير كلمة المرور'}
            </div>
          )}
          
          {/* Old Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              كلمة المرور الحالية
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                placeholder="كلمة المرور الحالية"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={passwordData.oldPassword}
                onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                required
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Key
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
          
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="كلمة المرور الجديدة"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={passwordData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                required
                minLength={6}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Key
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
          
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              تأكيد كلمة المرور الجديدة
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="تأكيد كلمة المرور الجديدة"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={passwordData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                minLength={6}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Key
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
          </div>
          
          <button
            type="submit"
            className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                جاري التغيير...
              </>
            ) : (
              <>
                تغيير كلمة المرور
                <LogIn size={18} className="ml-1 inline" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full mt-3 sm:mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
            disabled={loading}
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;