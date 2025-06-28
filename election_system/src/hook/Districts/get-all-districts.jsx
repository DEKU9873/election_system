import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDistricts } from '../../redux/placeSlice';

const GetallDistricts = () => {
const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getDistricts());
    }, []);
    const { districts, isLoading } = useSelector((state) => state.place);
  
    return [districts, isLoading];
}

export default GetallDistricts
