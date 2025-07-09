import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateDistrict, getDistricts } from "../../redux/placeSlice";

const EditDistrictsHook = (districtData, onClose) => {
  const dispatch = useDispatch();

  const [district, setDistrict] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [districtId, setDistrictId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (districtData) {
      setDistrict(districtData?.name || "");
      setGovernorateId(districtData.governorate.id || "");
      setDistrictId(districtData.id || null);
    }
  }, [districtData]);

  const onChangeDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const onChangeGovernorateId = (e) => {
    setGovernorateId(Number(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!district || !governorateId || !districtId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        updateDistrict({
          id: districtId,
          name: district,
          governorate_id: governorateId,
        })
      );

      if (res.type === "place/updateDistrict/fulfilled") {
        await dispatch(getDistricts());
        notify("تم تعديل القضاء بنجاح", "success");
        
        // إغلاق المودال بعد التعديل الناجح
        if (onClose) onClose();
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء التعديل", "error");
      }
    } catch (err) {
      notify("فشل التعديل", "error");
    }

    setLoading(false);
  };

  // تم إزالة عبارات console.log

  return [
    district,
    governorateId,
    loading,
    submitClicked,
    onChangeDistrict,
    onChangeGovernorateId,
    onSubmit,
  ];
};

export default EditDistrictsHook;