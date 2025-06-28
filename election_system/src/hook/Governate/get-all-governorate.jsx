import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGovernates } from '../../redux/placeSlice';

const GetAllGovernorate = () => {
const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getGovernates());
    }, []);
    const { governates, isLoading } = useSelector((state) => state.place);
  
    return [governates, isLoading];
}

export default GetAllGovernorate
