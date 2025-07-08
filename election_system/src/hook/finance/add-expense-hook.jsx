import React, { useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { addGovernate, getGovernates } from "../../redux/placeSlice";
import { addExpense, getExpenses } from "../../redux/financeSlice";

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

    if (!title || !description || !amount) {
      notify("يرجى إدخال جميع الحقول", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(
        addExpense({ title: title, description: description, amount: amount })
      );

      if (res.type === "finance/addExpense/fulfilled") {
        await dispatch(getExpenses());

        notify("تمت إضافة وصل  بنجاح", "success");
        setTitle("");
        setDescription("");
      } else {
        notify(res.payload?.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } catch (err) {
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
