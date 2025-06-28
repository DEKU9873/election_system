import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubdistricts } from '../../redux/placeSlice';

const GetAllSubdistricts = () => {
 const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getSubdistricts());
    }, []);
    const { subdistricts, isLoading } = useSelector((state) => state.place);
  
    return [subdistricts, isLoading];
}

export default GetAllSubdistricts
