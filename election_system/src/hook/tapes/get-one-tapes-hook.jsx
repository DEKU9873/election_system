import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTapes, getOneTape } from "../../redux/electoralStripsSlice";

const GetOneTapesHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneTape(id));
  }, []);
  const { currentTape, isLoading } = useSelector((state) => state.tape);

  return [currentTape, isLoading];
};

export default GetOneTapesHook;
