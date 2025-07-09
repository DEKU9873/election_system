import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, getFinanceCapitals, resetState } from '../../redux/financeSlice';

const GetAllFinanceCapitalsHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getFinanceCapitals());
  }, [dispatch]);
  
  const { financeCapitals, loading } = useSelector((state) => state.finance);
  
  return [financeCapitals, loading];
}

export default GetAllFinanceCapitalsHook
