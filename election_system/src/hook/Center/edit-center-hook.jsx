import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateElectionCenter, getElectionCenters } from "../../redux/placeSlice";

const EditCenterHook = (centerData, onClose) => {
  const dispatch = useDispatch();

  const [center, setCenter] = useState("");
  const [code, setCode] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subdistrictId, setSubdistrictId] = useState("");
  const [centerId, setCenterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (centerData) {
      console.log(centerData);
      setCenter(centerData.name || "");
      setCode(centerData.code || "");
      setGovernorateId(centerData?.governorate?.id || "");
      setDistrictId(centerData?.district?.id || "");
      setSubdistrictId(centerData?.subdistrict?.id || "");
      setCenterId(centerData.id || null);
    }
  }, [centerData]);

  const onChangeCenter = (e) => {
    setCenter(e.target.value);
  };
  const onChangeCode = (e) => setCode(e.target.value);
  const onChangeGovernorateId = (e) => setGovernorateId(Number(e.target.value));
  const onChangeDistrictId = (e) => setDistrictId(Number(e.target.value));
  const onChangeSubdistrictId = (e) => setSubdistrictId(Number(e.target.value));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setLoading(true);

    if (!center || !code || !governorateId || !districtId || !subdistrictId || !centerId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        updateElectionCenter({
          id: centerId,
          name: center,
          code,
          governorate_id: governorateId,
          district_id: districtId,
          subdistrict_id: subdistrictId,
        })
      );

      if (res.type === "place/updateElectionCenter/fulfilled") {
        await dispatch(getElectionCenters());
        notify("تم تعديل المركز الانتخابي بنجاح", "success");
        
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
    center,
    code,
    governorateId,
    districtId,
    subdistrictId,
    loading,
    submitClicked,
    onChangeCenter,
    onChangeCode,
    onChangeGovernorateId,
    onChangeDistrictId,
    onChangeSubdistrictId,
    onSubmit,
  ];
};

export default EditCenterHook;