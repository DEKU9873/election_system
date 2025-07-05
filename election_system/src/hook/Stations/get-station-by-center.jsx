import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStationsByCenterId } from '../../redux/placeSlice';

const GetStationByCenter = (id) => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getStationsByCenterId(id));
    }, []);
    const { stations, loading } = useSelector((state) => state.place);
  
    return [stations, loading];
}

export default GetStationByCenter
