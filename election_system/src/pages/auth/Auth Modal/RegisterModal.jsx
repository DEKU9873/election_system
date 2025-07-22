import { X } from "lucide-react";
import logo from "../../../assets/urlogo.png";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import VoterRegisterModal from "./VoterRegisterModal";
import ObserverRegisterModal from "./ObserverRegisterModal";
import CenterManagerRegisterModal from "./CenterManagerRegisterModal";

const RegisterModal = ({ onClose }) => {
  const [registrationType, setRegistrationType] = useState(null);

  // عرض المودال المناسب بناءً على نوع التسجيل المختار
  if (registrationType === "voter") {
    return <VoterRegisterModal onClose={onClose} />;
  }

  if (registrationType === "observer") {
    return <ObserverRegisterModal onClose={onClose} />;
  }

  if (registrationType === "center_manager") {
    return <CenterManagerRegisterModal onClose={onClose} />;
  }

  // عرض واجهة اختيار نوع التسجيل
  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-9999999999 min-h-screen flex items-center justify-center p-4 "
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div
        className="bg-white backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            src={logo}
            alt="شعار النظام الانتخابي"
            className="w-20 h-20 mb-1"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            التسجيل
          </h2>
          <p className="text-gray-600 mt-2 mb-4">اختر نوع المستخدم للتسجيل</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          <button
            type="button"
            className="p-4 rounded-lg text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors"
            onClick={() => setRegistrationType("voter")}
          >
            ناخب
          </button>
          <button
            type="button"
            className="p-4 rounded-lg text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors"
            onClick={() => setRegistrationType("observer")}
          >
            مراقب
          </button>
          <button
            type="button"
            className="p-4 rounded-lg text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors"
            onClick={() => setRegistrationType("center_manager")}
          >
            مدير مركز
          </button>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "55px",
          },
        }}
      />
    </div>
  );
};

export default RegisterModal;
