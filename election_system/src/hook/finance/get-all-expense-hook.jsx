import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, resetState } from '../../redux/financeSlice';

const GetAllExpenseHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // إعادة تعيين حالة الخطأ والنجاح قبل جلب البيانات
    dispatch(resetState());
    dispatch(getExpenses());
  }, [dispatch]);
  
  const { expenses, loading } = useSelector((state) => state.finance);
  
  return [expenses, loading];
}

export default GetAllExpenseHook
