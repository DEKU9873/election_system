import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addTape, getAllTapes } from "../../redux/electoralStripsSlice";

const AddTapesHook = (onClose) => {
  const dispatch = useDispatch();

  const [electionCenterId, setElectionCenterId] = useState("");
  const [stationId, setStationId] = useState("");
  const [date, setDate] = useState("");
  const [tape_image, setTapeImage] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeElectionCenterId = (e) => {
    setElectionCenterId(Number(e.target.value));
  };

  const onChangeStationId = (e) => {
    setStationId(Number(e.target.value));
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangeTapeImage = (e) => {
    setTapeImage(e.target.files[0]);
  };

  const onChangeNotes = (e) => {
    setNotes(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (
      !electionCenterId ||
      !stationId ||
      !date ||
      !tape_image ||
      !notes ||
      !status
    ) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("election_center_id", electionCenterId);
    formData.append("station_id", stationId);
    formData.append("date", date);
    formData.append("tape_image", tape_image);
    formData.append("notes", notes);
    formData.append("status", status);

    try {
      const res = await dispatch(addTape(formData));

      if (res.type === "tape/add/fulfilled") {
         await dispatch(getAllTapes());

        notify("تمت إضافة الشريط بنجاح", "success");
        setElectionCenterId("");
        setStationId("");
        setDate("");
        setTapeImage(null);
        setNotes("");
        setStatus("");

        
        // إغلاق النافذة المنبثقة عند نجاح الإرسال
        if (typeof onClose === 'function') {
          onClose();
        }
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

  return [
    electionCenterId,
    stationId,
    date,
    tape_image,
    notes,
    status,
    loading,
    submitClicked,
    onChangeElectionCenterId,
    onChangeStationId,
    onChangeDate,
    onChangeTapeImage,
    onChangeNotes,
    onChangeStatus,
    onSubmit,
  ];
};

export default AddTapesHook;
