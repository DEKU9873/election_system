import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../useNotification";
import { addTape, getAllTapes } from "../../redux/electoralStripsSlice";
import { getStationsByCenterId } from "../../redux/placeSlice";

const AddTapesHook = (onClose) => {
  const dispatch = useDispatch();

  const [electionCenterId, setElectionCenterId] = useState("");
  const [stationId, setStationId] = useState("");
  const [date, setDate] = useState("");
  const [tape_image, setTapeImage] = useState([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeElectionCenterId = (e) => {
    const centerId = Number(e.target.value);
    setElectionCenterId(centerId);
    // عند تغيير المركز، نقوم بجلب المحطات المرتبطة به
    if (centerId) {
      dispatch(getStationsByCenterId(centerId));
      // إعادة تعيين المحطة المختارة
      setStationId("");
    }
  };

  const onChangeStationId = (e) => {
    setStationId(Number(e.target.value));
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangeTapeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // إضافة الصور الجديدة إلى المصفوفة الحالية بدلاً من استبدالها
      setTapeImage(prevImages => {
        // تحويل FileList إلى مصفوفة
        const newImages = Array.from(e.target.files);
        // دمج الصور السابقة مع الصور الجديدة
        return [...prevImages, ...newImages];
      });
    } else if (e.target.files && e.target.files.length === 0) {
      // إذا تم مسح الصور، نقوم بتفريغ المصفوفة
      setTapeImage([]);
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
      !tape_image.length ||
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
    // إضافة جميع الصور المحددة
    tape_image.forEach((image, index) => {
      formData.append("tape_image", image);
    });
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

  // استخراج المحطات من حالة Redux
  const { stations } = useSelector((state) => state.place);

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
    stations, // إضافة المحطات إلى القيم المرجعة
  ];
};

export default AddTapesHook;