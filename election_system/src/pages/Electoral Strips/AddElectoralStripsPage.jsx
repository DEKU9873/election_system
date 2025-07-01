import React from "react";
import { Toaster } from "react-hot-toast";
import { Phone, Lock, LogIn, CalendarDays, FileText, ImagePlus, Layers } from "lucide-react";
import GetAllCenter from "../../hook/Center/get-all-center";
import AddTapesHook from "../../hook/tapes/add-tapse-hooks";
import GetAllSubdistricts from "../../hook/Subdistricts/get-all-subdistricts";
import GetAllStation from "../../hook/Stations/get-all-station";

const AddElectoralStripsPage = () => {
  const [
    electionCenterId,
    stationId,
    date,
    tape_image,
    notes,
    status,
    loading,
    submitClicked,
    onChangeElectionCenterId,
    onChangeStationId,
    onChangeDate,
    onChangeTapeImage,
    onChangeNotes,
    onChangeStatus,
    onSubmit,
  ] = AddTapesHook();

  const [electionCenters, isLoadingCenters] = GetAllCenter();
  const [stations] = GetAllStation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <div className="w-full grid grid-cols-1 gap-6">

          {/* المركز الانتخابي */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              المركز الانتخابي
            </label>
            <div className="relative">
              <select
                className="w-full pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={electionCenterId}
                onChange={onChangeElectionCenterId}
              >
                <option value="">اختر المركز</option>
                {!isLoadingCenters &&
                  electionCenters?.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))}
              </select>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" size={20} />
            </div>
          </div>

          {/* المحطة */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              المحطة
            </label>
            <div className="relative">
              <select
                className="w-full pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={stationId}
                onChange={onChangeStationId}
              >
                <option value="">اختر المحطة</option>
                {stations?.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
              <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" size={20} />
            </div>
          </div>

          {/* التاريخ */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              التاريخ
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={date}
                onChange={onChangeDate}
              />
              <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" size={20} />
            </div>
          </div>

          {/* صورة الشريط */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              صورة الشريط
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full pr-12 py-2 border rounded-lg text-right"
                onChange={onChangeTapeImage}
              />
              <ImagePlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" size={20} />
            </div>
          </div>

          {/* الملاحظات */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              الملاحظات
            </label>
            <div className="relative">
              <textarea
                placeholder="اكتب الملاحظات هنا"
                className="w-full pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={notes}
                onChange={onChangeNotes}
              ></textarea>
              <FileText className="absolute left-3 top-3 text-indigo-600" size={20} />
            </div>
          </div>

          {/* الحالة */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              الحالة
            </label>
            <div className="relative">
              <select
                className="w-full pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={status}
                onChange={onChangeStatus}
              >
                <option value="">اختر الحالة</option>
                <option value="bending">قيد المراجعة</option>
                <option value="verified">مقبول</option>
                <option value="rejected">مرفوض</option>
              </select>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600" size={20} />
            </div>
          </div>
        </div>

        {/* زر الإرسال */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md mt-6 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={20} />
              إضافة شريط انتخابي
            </>
          )}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddElectoralStripsPage;
