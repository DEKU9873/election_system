import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDistrictManagers, getAllUsers } from "../../redux/authSlice";

const AllDistrictManagerHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDistrictManagers());
  }, [dispatch]);

  const { allDistrictManagers, loading } = useSelector((state) => state.auth);

  return [allDistrictManagers, loading];
};

export default AllDistrictManagerHook;
