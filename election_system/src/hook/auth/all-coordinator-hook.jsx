import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/authSlice";

const AllCoordinatorHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { allUsers, loading } = useSelector((state) => state.auth);
  
  const coordinators = useMemo(() => {
    return allUsers?.filter(user => user.role === "coordinator") || [];
  }, [allUsers]);

  return [coordinators, loading];
};

export default AllCoordinatorHook;
