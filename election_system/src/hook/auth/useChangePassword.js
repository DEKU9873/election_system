import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/authSlice';

export const useChangePassword = (onClose) => {
  const dispatch = useDispatch();
  const { loading, changePasswordSuccess, error } = useSelector((state) => state.auth);
  
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
  
  // Validation function
  const validatePasswords = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين');
      return false;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    
    if (!passwordData.oldPassword.trim()) {
      alert('يرجى إدخال كلمة المرور الحالية');
      return false;
    }
    
    return true;
  };
  
  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    try {
      const result = await dispatch(changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }));
      
      if (changePassword.fulfilled.match(result)) {
        alert('تم تغيير كلمة المرور بنجاح');
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
  
  // Reset form function
  const resetForm = () => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };
  
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
    validatePasswords
  };
};