import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateTape, getAllTapes } from "../../redux/electoralStripsSlice";

const EditTapesHook = (tapeData, onClose) => {
  const dispatch = useDispatch();

  const [electionCenterId, setElectionCenterId] = useState("");
  const [stationId, setStationId] = useState("");
  const [date, setDate] = useState("");
  const [tape_image, setTapeImage] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [tapeId, setTapeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    if (tapeData) {
      setElectionCenterId(tapeData.ElectionCenter?.id || "");
      setStationId(tapeData.Station?.id || "");
      setDate(tapeData.date || "");
      setNotes(tapeData.notes || "");
      setStatus(tapeData.status || "");
      setTapeId(tapeData.id || null);
      setCurrentImageUrl(tapeData.tape_imageurl || "");
    }
  }, [tapeData]);

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
    if (e.target.files && e.target.files[0]) {
      setTapeImage(e.target.files[0]);
    } else {
      // إذا تم مسح الصورة، نحتفظ بالصورة القديمة
      setTapeImage(null);
    }
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
      !notes ||
      !status
    ) {
      notify("يرجى إدخال جميع الحقول المطلوبة", "warning");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("election_center_id", electionCenterId);
    formData.append("station_id", stationId);
    formData.append("date", date);
    formData.append("notes", notes);
    formData.append("status", status);

    // إضافة الصورة فقط إذا تم تحديد صورة جديدة
    if (tape_image) {
      formData.append("tape_image", tape_image);
    }

    try {
      const res = await dispatch(updateTape({ id: tapeId, data: formData }));

      if (res.type === "tape/update/fulfilled") {
        notify("تم تعديل الشريط بنجاح", "success");
        // تحديث قائمة الأشرطة
        dispatch(getAllTapes());
        // إغلاق النافذة المنبثقة
        if (onClose) onClose();
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء التعديل", "error");
      }
    } catch (err) {
      notify("فشل التعديل", "error");
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
    currentImageUrl,
    onChangeElectionCenterId,
    onChangeStationId,
    onChangeDate,
    onChangeTapeImage,
    onChangeNotes,
    onChangeStatus,
    onSubmit,
  ];
};

export default EditTapesHook;