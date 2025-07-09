import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { getFinanceCapitals, updateFinanceCapital, resetState } from "../../redux/financeSlice";

const EditFinanceCapitalsHook = (financeCapital, onClose) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [financeCapitalId, setFinanceCapitalId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

    useEffect(() => {
      if (financeCapital) {
        setTitle(financeCapital.title || "");
        setDescription(financeCapital.description || "");
        setAmount(financeCapital.amount || "");
        setFinanceCapitalId(financeCapital.id);
      }
    }, [financeCapital]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(Number(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginClicked(true);
    setLoading(true);
    
    // إعادة تعيين حالة الخطأ والنجاح
    dispatch(resetState());

    if (!title || !description || !amount) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const financeCapitalData = {
        id: financeCapitalId,
        title: title,
        description: description,
        amount: amount
      };
      
      const res = await dispatch(updateFinanceCapital(financeCapitalData));

      if (res.type === "finance/updateFinanceCapital/fulfilled") {
        await dispatch(getFinanceCapitals());

        notify("تم تعديل رأس المال بنجاح", "success");
        setTitle("");
        setDescription("");
        
        // إغلاق المودال بعد التعديل الناجح
        if (typeof onClose === 'function') {
          onClose();
        }
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء التعديل", "error");
      }
    } catch (err) {
      notify("فشل التعديل", "error");
    }

    setLoading(false);
  };

  return [
    title,
    description,
    amount,
    loading,
    loginClicked,
    onChangeTitle,
    onChangeDescription,
    onChangeAmount,
    onSubmit,
  ];
};

export default EditFinanceCapitalsHook;