import React, { useState, useEffect } from "react";
import notify from "../useNotification";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validationValues = () => {
    if (phone === "") {
      notify("من فضلك ادخل رقم الهاتف", "error");
      return false;
    }

    if (password === "") {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) {
      return;
    }
    setLoginClicked(true);
    setLoading(true);
    await dispatch(loginUser({ phone_number: phone, password: password }));
    setLoading(false);
  };

  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);

  console.log('user',user);
  console.log('error',error);

 useEffect(() => {
  if (!loading && loginClicked) {
    if (user) {
      Cookies.set("user", JSON.stringify(user.data), { expires: 7 }); 
      
      notify("تم تسجيل الدخول بنجاح", "success");
      navigate("/users");
    } else if (error) {
      notify("فشل تسجيل الدخول. تأكد من البيانات", "error");
    }
    setLoginClicked(false); 
  }
}, [loading, loginClicked, user, error]);


  return [phone, password, loading, onChangePhone, onChangePassword, onSubmit];
};

export default LoginHook;
