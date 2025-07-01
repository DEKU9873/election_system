import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTapes } from "../../redux/electoralStripsSlice";

const GetAllTapesHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTapes());
  }, []);
  const { tapes, isLoading } = useSelector((state) => state.tape);
  console.log('hook', tapes)

  return [tapes, isLoading];
};

export default GetAllTapesHook;
