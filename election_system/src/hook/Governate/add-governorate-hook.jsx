import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addGovernate, getGovernates } from "../../redux/placeSlice";

const AddDistrictsHook = () => {
  const dispatch = useDispatch();

  const [governorate, setGovernorate] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const onChangeGovernorate = (e) => {
    setGovernorate(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginClicked(true);
    setLoading(true);

    if (!governorate || !code) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addGovernate({ name: governorate, code: code })
      );

      if (res.type === "place/addGovernate/fulfilled") {
        await dispatch(getGovernates());

        notify("تمت إضافة المحافظة بنجاح", "success");
        setGovernorate("");
        setCode("");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
      notify("فشل الإضافة", "error");
    }

    setLoading(false);
  };

  return [
    governorate,
    code,
    loading,
    loginClicked,
    onChangeGovernorate,
    onChangeCode,
    onSubmit,
  ];
};

export default AddDistrictsHook;
