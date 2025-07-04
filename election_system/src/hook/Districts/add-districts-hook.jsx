import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addDistrict, getDistricts } from "../../redux/placeSlice";

const AddDistrictsHook = () => {
  const dispatch = useDispatch();

  const [district, setDistrict] = useState("");
  const [governorateId, setGovernorateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

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

    if (!district || !governorateId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addDistrict({ name: district, governorate_id: governorateId })
      );

      if (res.type === "place/addDistrict/fulfilled") {
        await dispatch(getDistricts());

        notify("تمت إضافة القضاء بنجاح", "success");
        setDistrict("");
        setGovernorateId("");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

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

export default AddDistrictsHook;
