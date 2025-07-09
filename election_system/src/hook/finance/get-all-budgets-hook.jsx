import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../redux/financeSlice';
const GetAllBudgetsHook = () => {
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);
  
  const { budgets, loading } = useSelector((state) => state.finance);
  
  return [budgets, loading];
}

export default GetAllBudgetsHook
