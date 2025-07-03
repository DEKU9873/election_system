import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoordinators, getAllUsers } from "../../redux/authSlice";

const AllCoordinatorHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoordinators());
  }, [dispatch]);

  const { allUsers, Loading } = useSelector((state) => state.auth);

  return [allUsers, Loading];
};

export default AllCoordinatorHook;
