import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStations } from "../../redux/placeSlice";

const GetAllStation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStations());
  }, []);
  const { stations, isLoading } = useSelector((state) => state.place);

  return [stations, isLoading];
};

export default GetAllStation;
