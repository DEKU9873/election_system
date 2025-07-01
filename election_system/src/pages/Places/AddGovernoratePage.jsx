import React from "react";
import { Toaster } from 'react-hot-toast';
import AddGovernorateHook from "../../hook/Governate/add-governorate-hook";
import { Phone, Lock, LogIn } from "lucide-react";

const AddGovernoratePage = () => {
  const [
    governorate,
    code,
    loading,
    loginClicked,
    onChangeGovernorate,
    onChangeCode,
    onSubmit,
  ] = AddGovernorateHook();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">إضافة محافظة جديدة</h1>
        <div className="w-full grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              اسم المحافظة
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="اسم المحافظة"
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={governorate}
                onChange={onChangeGovernorate}
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
              رمز المحافظة
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="رمز المحافظة"
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={code}
                onChange={onChangeCode}
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
              اضافة محافظة
            </>
          )}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddGovernoratePage;
