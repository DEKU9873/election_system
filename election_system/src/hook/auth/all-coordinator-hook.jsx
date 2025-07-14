import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoordinators, getAllUsers } from "../../redux/authSlice";

const AllCoordinatorHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoordinators());
  }, [dispatch]);

  const { allCoordinators, loading } = useSelector((state) => state.auth);

  return [allCoordinators, loading];
};

export default AllCoordinatorHook;
