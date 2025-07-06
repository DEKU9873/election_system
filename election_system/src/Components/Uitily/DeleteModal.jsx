import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-md w-full mx-3 sm:mx-4">
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
          <div className="h-12 w-12 sm:h-16 sm:w-16 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">تأكيد الحذف</h3>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا
            الإجراء.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-2 sm:gap-3 w-full">
          <button
            onClick={onCancel}
            type="button"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors w-full sm:w-auto"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-red-600 text-white rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            نعم، قم بالحذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
