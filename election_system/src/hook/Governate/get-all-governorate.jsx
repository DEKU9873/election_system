import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGovernates } from '../../redux/placeSlice';

const GetAllGovernorate = () => {
const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getGovernates());
    }, []);
    const { governates, loading } = useSelector((state) => state.place);
  
    return [governates, loading];
}

export default GetAllGovernorate
