import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getElectionCenters } from '../../redux/placeSlice';

const GetAllCenter = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getElectionCenters());
    }, []);
    const { electionCenters, isLoading } = useSelector((state) => state.place);
  
    return [electionCenters, isLoading];
}

export default GetAllCenter
