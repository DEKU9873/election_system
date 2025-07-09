import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateSubdistrict, getSubdistricts } from "../../redux/placeSlice";

const EditSubdistrictsHook = (subdistrictData, onClose) => {
  const dispatch = useDispatch();

  const [subdistrict, setSubdistrict] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [subdistrictId, setSubdistrictId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (subdistrictData) {
      setSubdistrict(subdistrictData.name || "");
      setDistrictID(subdistrictData?.district?.id || "");
      setGovernorateId(subdistrictData?.governorate?.id || "");
      setSubdistrictId(subdistrictData.id || null);
    }
  }, [subdistrictData]);

  const onChangeSubdistrict = (e) => {
    setSubdistrict(e.target.value);
  };

  const onChangeDistrict = (e) => {
    setDistrictID(Number(e.target.value));
  };

  const onChangeGovernorateId = (e) => {
    setGovernorateId(Number(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!subdistrict || !districtID || !governorateId || !subdistrictId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        updateSubdistrict({
          id: subdistrictId,
          name: subdistrict,
          governorate_id: governorateId,
          district_id: districtID,
        })
      );

      if (res.type === "place/updateSubdistrict/fulfilled") {
        await dispatch(getSubdistricts());
        notify("تم تعديل الناحية بنجاح", "success");
        
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

  return [
    subdistrict,
    districtID,
    governorateId,
    loading,
    submitClicked,
    onChangeSubdistrict,
    onChangeDistrict,
    onChangeGovernorateId,
    onSubmit,
  ];
};

export default EditSubdistrictsHook;