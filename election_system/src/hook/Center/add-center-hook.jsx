import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addElectionCenter } from "../../redux/placeSlice"; // تأكد من أن الأكشن موجود هنا

const AddCenterHook = () => {
  const dispatch = useDispatch();

  const [center, setCenter] = useState("");
  const [code, setCode] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subdistrictId, setSubdistrictId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

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

    if (!center || !code || !governorateId || !districtId || !subdistrictId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addElectionCenter({
          name: center,
          code,
          governorate_id: governorateId,
          district_id: districtId,
          subdistrict_id: subdistrictId,
        })
      );

      if (res.type === "place/addElectionCenter/fulfilled") {
        notify("تمت إضافة المركز الانتخابي بنجاح", "success");
        setCenter("");
        setCode("");
        setGovernorateId("");
        setDistrictId("");
        setSubdistrictId("");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
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

export default AddCenterHook;
