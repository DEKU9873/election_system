import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole } from "../../redux/authSlice";
import notify from "../useNotification";

const ChangeUserRoleHook = (userId) => {
  const dispatch = useDispatch();
  const { loading, changeRoleSuccess, error } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // إعادة تعيين حالة النجاح عند فتح النافذة
  useEffect(() => {
    if (!isModalOpen) {
      // يمكن إضافة منطق إعادة تعيين هنا إذا لزم الأمر
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitRoleChange = async (roleData) => {
    try {
      await dispatch(changeUserRole({ userId, roleData }));
      return true;
    } catch (error) {
      notify("حدث خطأ أثناء تغيير الدور", "error");
      return false;
    }
  };

  return {
    loading,
    changeRoleSuccess,
    error,
    isModalOpen,
    openModal,
    closeModal,
    submitRoleChange,
  };
};

export default ChangeUserRoleHook;