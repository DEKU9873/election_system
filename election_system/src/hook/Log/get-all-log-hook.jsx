import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../../redux/logSlice';

const GetAllLogHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getLogs());
    }, []);
    const { logs, loading } = useSelector((state) => state.log);
  
    return [logs, loading];

}

export default GetAllLogHook
