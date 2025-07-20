import { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/authSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotification';

export const useChangePassword = (onClose) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, changePasswordSuccess, error } = useSelector((state) => state.auth);
  
  // استخدام useRef لتتبع حالة النموذج
  const isFormReady = useRef(false);
  const isSubmitting = useRef(false);
  
  // State for password data
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // تتبع تغييرات البيانات لتحديد ما إذا كان النموذج جاهزًا للتقديم
  useEffect(() => {
    const hasValues = (
      passwordData.oldPassword.trim() !== '' || 
      passwordData.newPassword.trim() !== '' || 
      passwordData.confirmPassword.trim() !== ''
    );
    
    // النموذج جاهز للتقديم فقط إذا كان المستخدم قد أدخل بيانات
    isFormReady.current = hasValues;
  }, [passwordData]);
  
  // Validation function
  const validatePasswords = useCallback(() => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      notify('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين', 'error');
      return false;
    }
    
    if (passwordData.newPassword.length < 6) {
      notify('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل', 'error');
      return false;
    }
    
    if (!passwordData.oldPassword.trim()) {
      notify('يرجى إدخال كلمة المرور الحالية', 'error');
      return false;
    }
    
    return true;
  }, [passwordData]);
  
  // Reset form function
  const resetForm = useCallback(() => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    isFormReady.current = false;
    isSubmitting.current = false;
  }, []);
  
  // Handle password change
  const handlePasswordChange = useCallback(async (e) => {
    // تأكد من أن الحدث موجود وأنه حدث تقديم نموذج حقيقي
    if (e) {
      e.preventDefault();
    }
    
    // تحقق من أن النموذج جاهز للتقديم وأنه لا يتم تقديمه بالفعل
    if (!isFormReady.current || isSubmitting.current) {
      console.log('Form not ready or already submitting');
      return;
    }
    
    // تحقق من صحة البيانات
    if (!validatePasswords()) {
      return;
    }
    
    // تعيين علامة التقديم لمنع التقديم المتكرر
    isSubmitting.current = true;
    
    try {
      const result = await dispatch(changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }));
      
      if (changePassword.fulfilled.match(result)) {
        notify('تم تغيير كلمة المرور بنجاح', 'success');
        resetForm();
        onClose();
        
        // تسجيل الخروج بعد تغيير كلمة المرور بنجاح
        Cookies.remove('token');
        Cookies.remove('user');
        navigate('/login');
      } else {
        // إعادة تعيين علامة التقديم في حالة الفشل
        isSubmitting.current = false;
        
        // إظهار رسالة الخطأ للمستخدم إذا كانت متوفرة
        if (error) {
          if (typeof error === 'string') {
            notify(error, 'error');
          } else if (error.message) {
            notify(error.message, 'error');
          } else {
            notify('فشل تغيير كلمة المرور', 'error');
          }
        } else {
          notify('فشل تغيير كلمة المرور لسبب غير معروف', 'error');
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      // إظهار رسالة الخطأ للمستخدم
      if (error.response && error.response.data && error.response.data.message) {
        notify(error.response.data.message, 'error');
      } else {
        notify('حدث خطأ أثناء تغيير كلمة المرور', 'error');
      }
      // إعادة تعيين علامة التقديم في حالة الفشل
      isSubmitting.current = false;
    }
  }, [dispatch, passwordData, validatePasswords, resetForm, onClose]);
  
  return {
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
    resetForm,
    isFormReady: isFormReady.current,
    isSubmitting: isSubmitting.current
  };
};