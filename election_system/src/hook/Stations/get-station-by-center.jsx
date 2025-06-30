import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStationsByCenterId } from '../../redux/placeSlice';

const GetStationByCenter = (id) => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getStationsByCenterId(id));
    }, []);
    const { stations, isLoading } = useSelector((state) => state.place);
  
    return [stations, isLoading];
}

export default GetStationByCenter
