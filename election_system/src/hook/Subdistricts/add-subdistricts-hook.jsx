import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addSubdistrict, getSubdistricts } from "../../redux/placeSlice";

const AddSubDistrictsHook = (onClose) => {
  const dispatch = useDispatch();

  const [subdistrict, setSubdistrict] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeSubdistrict = (e) => {
    setSubdistrict(e.target.value);
  };

  const onChangeDistrictId = (e) => {
    setDistrictID(Number(e.target.value));
  };

  const onChangeGovernorateId = (e) => {
    setGovernorateId(Number(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!subdistrict || !districtID || !governorateId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addSubdistrict({
          name: subdistrict,
          governorate_id: governorateId,
          district_id: districtID,
        })
      );

      if (res.type === "place/addSubdistrict/fulfilled") {
        await dispatch(getSubdistricts());
        notify("تمت إضافة الناحية بنجاح", "success");
        setSubdistrict("");
        setDistrictID("");
        setGovernorateId("");
        
        // إغلاق المودال بعد الإضافة الناجحة
        if (onClose) onClose();
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

  return [
    subdistrict,
    districtID,
    governorateId,
    loading,
    submitClicked,
    onChangeSubdistrict,
    onChangeDistrictId,
    onChangeGovernorateId,
    onSubmit,
  ];
};

export default AddSubDistrictsHook;
