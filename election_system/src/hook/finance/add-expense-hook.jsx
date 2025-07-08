import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addExpense, getExpenses, resetState } from "../../redux/financeSlice";

const AddExpenseHook = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

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
      const expenseData = {
        title: title,
        description: description,
        amount: amount
      };
      
      const res = await dispatch(addExpense(expenseData));

      if (res.type === "finance/addExpense/fulfilled") {
        await dispatch(getExpenses());

        notify("تمت إضافة وصل بنجاح", "success");
        setTitle("");
        setDescription("");
        setAmount("");
      } else {
        // استخراج رسالة الخطأ من الاستجابة
        console.log("Error response:", res.payload); // للتشخيص
        const errorMessage = res.payload?.message || "حدث خطأ أثناء الإضافة";
        notify(errorMessage, "error");
      }
    } catch (err) {
      console.error("Unexpected error:", err); // للتشخيص
      notify("فشل الإضافة", "error");
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

export default AddExpenseHook;
