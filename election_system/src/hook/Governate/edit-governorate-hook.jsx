import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { updateGovernate, getGovernates } from "../../redux/placeSlice";

const EditGovernorateHook = (governate) => {
  const dispatch = useDispatch();

  const [governorate, setGovernorate] = useState("");
  const [code, setCode] = useState("");
  const [governorateId, setGovernorateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  // تعيين البيانات الأولية عند فتح المودال
  useEffect(() => {
    if (governate) {
      setGovernorate(governate.name || "");
      setCode(governate.code || "");
      setGovernorateId(governate.id || null);
    }
  }, [governate]);

  const onChangeGovernorate = (e) => {
    setGovernorate(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setEditClicked(true);
    setLoading(true);

    if (!governorate || !code || !governorateId) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        updateGovernate({ id: governorateId, name: governorate, code: code })
      );

      if (res.type === "place/updateGovernate/fulfilled") {
        await dispatch(getGovernates());

        notify("تم تعديل المحافظة بنجاح", "success");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء التعديل", "error");
      }
    } catch (err) {
      notify("فشل التعديل", "error");
    }

    setLoading(false);
  };

  return [
    governorate,
    code,
    loading,
    editClicked,
    onChangeGovernorate,
    onChangeCode,
    onSubmit,
  ];
};

export default EditGovernorateHook;