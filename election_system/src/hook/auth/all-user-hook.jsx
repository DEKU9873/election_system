import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/authSlice";

const AllUserHook = () => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]); 

  const system_admin = useMemo(
    () => allUsers?.filter((user) => user.role === "system_admin") || [],
    [allUsers]
  );

  const coordinator = useMemo(
    () => allUsers?.filter((user) => user.role === "coordinator") || [],
    [allUsers]
  );

  const observer = useMemo(
    () => allUsers?.filter((user) => user.role === "observer") || [],
    [allUsers]
  );

  const center_manager = useMemo(
    () => allUsers?.filter((user) => user.role === "center_manager") || [],
    [allUsers]
  );

  const district_manager = useMemo(
    () => allUsers?.filter((user) => user.role === "district_manager") || [],
    [allUsers]
  );

  const finance_auditor = useMemo(
    () => allUsers?.filter((user) => user.role === "finance_auditor") || [],
    [allUsers]
  );

  const voter = useMemo(
    () => allUsers?.filter((user) => user.role === "voter") || [],
    [allUsers]
  );

  return [
    allUsers,
    loading,
    system_admin,
    coordinator,
    observer,
    center_manager,
    district_manager,
    finance_auditor,
    voter,
  ];
};

export default AllUserHook;
