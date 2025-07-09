import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateStation, getStationsByCenterId } from "../../redux/placeSlice";

const EditStationHook = (onClose, station) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [electionCenterId, setElectionCenterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [stationId, setStationId] = useState(null);

  useEffect(() => {
    if (station) {
      setCode(station.code || "");
      setName(station.name || "");
      setElectionCenterId(station.election_center_id || "");
      setStationId(station.id);
    }
  }, [station]);

  const onChangeCode = (e) => setCode(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeElectionCenterId = (e) => setElectionCenterId(Number(e.target.value));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!code || !name || !electionCenterId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        updateStation({
          id: stationId,
          code,
          name,
          election_center_id: electionCenterId,
        })
      );

      if (res.type === "place/updateStation/fulfilled") {
        await dispatch(getStationsByCenterId(electionCenterId));
        notify("تم تحديث المحطة بنجاح", "success");
        
        // إغلاق المودال بعد التحديث الناجح
        if (onClose) onClose();
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء التحديث", "error");
      }
    } catch (err) {
      notify("فشل التحديث", "error");
    }

    setLoading(false);
  };

  return [
    code,
    name,
    electionCenterId,
    loading,
    submitClicked,
    onChangeCode,
    onChangeName,
    onChangeElectionCenterId,
    onSubmit,
  ];
};

export default EditStationHook;