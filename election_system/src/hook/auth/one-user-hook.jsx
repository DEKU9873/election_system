import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/authSlice';

const OneUserHook = (id) => {
const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUser(id));
    }, []);
    const { singleUser, isLoading } = useSelector((state) => state.auth);
  
    return [singleUser, isLoading];
}

export default OneUserHook
