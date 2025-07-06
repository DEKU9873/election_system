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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-3 sm:p-4">
      <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <img src={logo} alt="logo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-4 sm:mb-6" />
        <div className="text-center mb-6 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            نظام الانتخابات
          </h2>
          <p className="text-base sm:text-lg text-gray-600">تسجيل الدخول للنظام</p>
        </div>

        <div className="w-full grid grid-cols-1 gap-6">
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-right text-sm sm:text-base"
            >
              رقم الهاتف
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={onChangePhone}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-right text-sm sm:text-base"
                dir="ltr"
                placeholder="07xxxxxxxx"
                pattern="[0-9]{10}"
              />
              <Phone
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 w-4 h-4 sm:w-5 sm:h-5"
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
          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base shadow-md mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
              تسجيل الدخول
            </>
          )}
        </button>

        <div className="text-gray-600 text-sm sm:text-base text-center mt-6 sm:mt-8 space-y-2">
          <Link
            to="/forgot-password"
            className="text-blue-600 font-medium underline block text-sm sm:text-base"
          >
            هل نسيت كلمة المرور؟
          </Link>
          <Link to="/selfRegister" className="text-gray-600 font-medium block text-sm sm:text-base">
            ليس لديك حساب؟ تسجيل حساب جديد
          </Link>
  
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
