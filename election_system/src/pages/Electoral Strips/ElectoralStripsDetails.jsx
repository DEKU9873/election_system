import React from "react";
import { useParams } from "react-router-dom";
import GetOneTapesHook from "../../hook/tapes/get-one-tapes-hook";
import {
  Calendar,
  MapPin,
  FileText,
  Clock,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import formatDate from "../../hook/UtilsFunctions/FormatDate";

const ElectoralStripsDetails = () => {
  const { id } = useParams();
  const [currentTape, isLoading] = GetOneTapesHook(id);

  console.log(currentTape)

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!currentTape?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">لم يتم العثور على البيانات</p>
        </div>
      </div>
    );
  }

  const data = currentTape.data;

  const getStatusColor = (status) => {
    switch (status) {
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "مقبول":
        return "bg-green-100 text-green-800 border-green-200";
      case "مرفوض":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "approved":
        return "موافق عليه";
      case "rejected":
        return "مرفوض";

      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-4 sm:mb-6 p-3 sm:p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
              تفاصيل الشريط الانتخابي #{data?.id}
            </h1>
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                data?.status
              )}`}
            >
              {getStatusText(data?.status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Information Card */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <FileText className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              المعلومات الأساسية
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {/* Election Center */}
              <div className="flex items-start">
                <MapPin className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    المركز الانتخابي
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{data?.ElectionCenter?.name}</p>
                  <p className="text-xs text-gray-500">
                    رقم المركز: {data?.ElectionCenter?.id}
                  </p>
                </div>
              </div>

              {/* Station */}
              <div className="flex items-start">
                <MapPin className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">المحطة</p>
                  <p className="text-xs sm:text-sm text-gray-600">{data?.Station?.name}</p>
                  <p className="text-xs text-gray-500">
                    رقم المحطة: {data?.Station?.id}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start">
                <Calendar className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    تاريخ الشريط
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{formatDate(data?.date)}</p>
                </div>
              </div>

              {/* Notes */}
              {data?.notes && (
                <div className="flex items-start">
                  <FileText className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      الملاحظات
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap">
                      {data?.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Card */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <ImageIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              صور الشريط
            </h2>

            {/* عرض الصور المتعددة إذا كانت متوفرة */}
            {data?.images && data.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url || image}
                      alt={`صورة الشريط الانتخابي ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm bg-gray-50"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                      onLoad={(e) => {
                        e.target.style.display = "block";
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = "none";
                        }
                      }}
                    />
                    <div
                      className="hidden items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                      style={{ display: "none" }}
                    >
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">فشل في تحميل الصورة</p>
                      </div>
                    </div>
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex gap-1 sm:gap-2">
                      <a
                        href={image.url || image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black bg-opacity-50 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs hover:bg-opacity-70 transition-opacity"
                      >
                        عرض بالحجم الكامل
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (data?.tape_imageurl || (data?.images && data?.images[0])) ? (
              <div className="relative">
                <img
                  src={data?.tape_imageurl || (data?.images && data?.images[0]?.url)}
                  alt="صورة الشريط الانتخابي"
                  className="w-full h-auto max-h-96 object-contain rounded-lg border border-gray-200 shadow-sm bg-gray-50"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = "none";
                    }
                  }}
                />
                <div
                  className="hidden items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                  style={{ display: "none" }}
                >
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">فشل في تحميل الصورة</p>
                    <p className="text-xs text-gray-400 mt-1">
                      تحقق من رابط الصورة
                    </p>
                  </div>
                </div>
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex gap-1 sm:gap-2">
                  <a
                    href={data?.tape_imageurl || (data?.images && data?.images[0]?.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black bg-opacity-50 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs hover:bg-opacity-70 transition-opacity"
                  >
                    عرض بالحجم الكامل
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-36 sm:h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 sm:h-10 md:h-12 sm:w-10 md:w-12 text-gray-400 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-gray-500">لا توجد صورة متاحة</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timestamps Card */}
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 md:p-6 mt-3 sm:mt-4 md:mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <Clock className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            التواريخ والأوقات
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                تاريخ الإنشاء
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{formatDate(data?.createdAt)}</p>
            </div>

            <div className="bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                تاريخ آخر تحديث
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{formatDate(data?.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectoralStripsDetails;
