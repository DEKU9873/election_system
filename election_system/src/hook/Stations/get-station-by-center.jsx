import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStationsByCenterId } from '../../redux/placeSlice';

const GetStationByCenter = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getStationsByCenterId(id));
    }
  }, [dispatch, id]);
  const { stations, loading } = useSelector((state) => state.place);
  
  return { stations, loading };
}

export default GetStationByCenter;
