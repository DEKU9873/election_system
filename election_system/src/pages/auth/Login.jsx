import React from "react";
import { Phone, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/urlogo.png";
import LoginHook from "../../hook/auth/login-hook";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [phone, password, loading, onChangePhone, onChangePassword, onSubmit] =
    LoginHook();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <img src={logo} alt="logo" className="w-32 h-32 object-contain mb-6" />
        <div className="text-center mb-6 w-full">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            نظام الانتخابات
          </h2>
          <p className="text-lg text-gray-600">تسجيل الدخول للنظام</p>
        </div>

        <div className="w-full grid grid-cols-1 gap-6">
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              رقم الهاتف
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={onChangePhone}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-right text-base"
                dir="ltr"
                placeholder="07xxxxxxxx"
                pattern="[0-9]{10}"
              />
              <Phone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={onChangePassword}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-right text-base"
                dir="ltr"
                placeholder="********"
              />
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md mt-6 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={20} />
              تسجيل الدخول
            </>
          )}
        </button>

        <div className="text-gray-600 text-base text-center mt-8 space-y-2">
          <Link
            to="/forgot-password"
            className="text-blue-600 font-medium underline block"
          >
            هل نسيت كلمة المرور؟
          </Link>
          <Link to="/register" className="text-gray-600 font-medium block">
            ليس لديك حساب؟ تسجيل حساب جديد
          </Link>
          <Link to="/coordinatorRegister" className="text-gray-600 font-medium block">
            تسجيل حساب مرتكز جديد
          </Link>
          <Link to="/districtManagerRegister" className="text-gray-600 font-medium block">
            تسجيل حساب مدير منطقة جديد
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
