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
    if (!phone.trim()) {
      notify("من فضلك ادخل رقم الهاتف", "error");
      return false;
    }

    // التحقق من صحة تنسيق رقم الهاتف (يجب أن يكون 11 رقم)
    // if (!/^\d{11}$/.test(phone.trim())) {
    //   notify("رقم الهاتف يجب أن يتكون من 11 رقم", "error");
    //   return false;
    // }

    if (!password) {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }

    // التحقق من طول كلمة المرور
    if (password.length < 6) {
      notify("كلمة السر يجب أن تتكون من 6 أحرف على الأقل", "error");
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    try {
      const isValid = validationValues();
      if (!isValid) {
        return;
      }

      setLoginClicked(true);
      setLoading(true);
      
      await dispatch(loginUser({ 
        phone_number: phone.trim(), 
        password: password 
      }));
    } catch (error) {
      notify("حدث خطأ أثناء تسجيل الدخول", "error");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);

  // Remove console.logs in production
    console.log('user', user);
    console.log('error', error);
  

  useEffect(() => {
    if (!loading && loginClicked) {
      if (user?.data) {
        try {
          Cookies.set("user", user.data, { 
            expires: 7,
            secure: true,
            sameSite: 'strict'
          });
          Cookies.set("token", user.token, { 
            expires: 7,
            secure: true,
            sameSite: 'strict'
          });
          
          notify("تم تسجيل الدخول بنجاح", "success");
          navigate("/users");
        } catch (error) {
          notify("حدث خطأ أثناء حفظ بيانات المستخدم", "error");
        }
      } else if (error) {
        const errorMessage = error?.response?.data?.message || "فشل تسجيل الدخول. تأكد من البيانات";
        notify(errorMessage, "error");
      }
      setLoginClicked(false);
    }
  }, [loading, loginClicked, user, error, navigate]);


  return [phone, password, loading, onChangePhone, onChangePassword, onSubmit];
};

export default LoginHook;
