import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotification";
import { getExpenses, updateExpense, resetState } from "../../redux/financeSlice";

const EditExpenseHook = (expense) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseId, setExpenseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

    useEffect(() => {
      if (expense) {
        setTitle(expense.title || "");
        setDescription(expense.description || "");
        setAmount(expense.amount || "");
        setExpenseId(expense.id);
      }
    }, [expense]);

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
        id: expenseId,
        title: title,
        description: description,
        amount: amount
      };
      
      const res = await dispatch(updateExpense(expenseData));

      if (res.type === "finance/updateExpense/fulfilled") {
        await dispatch(getExpenses());

        notify("تمت تعديل الوصل بنجاح", "success");
        setTitle("");
        setDescription("");
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

export default EditExpenseHook;
