import React from "react";
import { Toaster } from "react-hot-toast";
import { MapPin, Hash, LogIn, X } from "lucide-react";
import AddExpenseHook from "../../../hook/finance/add-expense-hook";

const AddExpenseModal = ({ onClose }) => {
  const [
    title,
    description,
    amount,
    loading,
    loginClicked,
    onChangeTitle,
    onChangeDescription,
    onChangeAmount,
    onSubmit,
  ] = AddExpenseHook();
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div
        className="bg-white backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          إضافة وصل جديدة
        </h1>
        <div dir="rtl" className="w-full grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              العنوان
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="العنوان"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={title}
                onChange={onChangeTitle}
              />
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              الوصف
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="الوصف"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={description}
                onChange={onChangeDescription}
              />
              <Hash
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-right"
            >
              الكمية
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="الكمية"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={amount}
                onChange={onChangeAmount}
              />
              <Hash
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
              جاري الإضافة...
            </>
          ) : (
            <>
              إضافة
              <LogIn size={18} className="ml-1 inline" />
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 sm:mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
        >
          إلغاء
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddExpenseModal;
