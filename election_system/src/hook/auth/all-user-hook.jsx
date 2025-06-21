import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/authSlice';

const AllUserHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    const { allUsers, Loading } = useSelector((state) => state.auth);
    console.log('allUsers',allUsers);
  
    return [allUsers, Loading];
}

export default AllUserHook
