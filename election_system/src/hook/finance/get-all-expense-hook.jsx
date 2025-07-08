import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../../redux/financeSlice';

const GetAllExpenseHook = () => {
const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getExpenses());
    }, []);
    const { expenses, loading } = useSelector((state) => state.finance);
  
    return [expenses, loading];
}

export default GetAllExpenseHook
