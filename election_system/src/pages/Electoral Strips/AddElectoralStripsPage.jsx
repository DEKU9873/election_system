import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Phone,
  Lock,
  LogIn,
  CalendarDays,
  FileText,
  ImagePlus,
  Layers,
} from "lucide-react";
import GetAllCenter from "../../hook/Center/get-all-center";
import AddTapesHook from "../../hook/tapes/add-tapse-hooks";
import GetAllSubdistricts from "../../hook/Subdistricts/get-all-subdistricts";
import GetAllStation from "../../hook/Stations/get-all-station";
import Select from "react-select";

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

  const [centers] = GetAllCenter();
  const [stations] = GetAllStation();

  const centerOptions = centers?.map((center) => ({
    value: center.id,
    label: center.name,
  }));

  const stationOptions = stations?.map((station) => ({
    value: station.id,
    label: station.name,
  }));

  const handleCenterChange = (selectedOption) => {
    onChangeElectionCenterId({ target: { value: selectedOption.value } });
  };

  const handleStationChange = (selectedOption) => {
    onChangeStationId({ target: { value: selectedOption.value } });
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      paddingRight: "10px",
      borderRadius: "0.5rem",
      borderColor: "#E5E7EB",
      "&:hover": {
        borderColor: "#E5E7EB",
      },
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: "right",
    }),
    input: (base) => ({
      ...base,
      textAlign: "right",
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-2 sm:p-4">
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          إضافة شريط انتخابي جديد
        </h1>
        <div className="w-full grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              المركز
            </label>
            <div className="relative">
              <Select
                options={centerOptions}
                value={centerOptions?.find(
                  (option) => option.value === electionCenterId
                )}
                onChange={handleCenterChange}
                placeholder="اختر المركز"
                isSearchable={true}
                className="text-right text-sm sm:text-base"
                styles={selectStyles}
              />
              <Lock
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              المحطة
            </label>
            <div className="relative">
              <Select
                options={stationOptions}
                value={stationOptions?.find(
                  (option) => option.value === stationId
                )}
                onChange={handleStationChange}
                placeholder="اختر المحطة"
                isSearchable={true}
                className="text-right text-sm sm:text-base"
                styles={selectStyles}
              />
              <Lock
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              التاريخ
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right appearance-none bg-white text-sm sm:text-base"
                value={date}
                onChange={onChangeDate}
                style={{
                  direction: "rtl",
                  colorScheme: "light",
                }}
              />
              <CalendarDays
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              صورة الشريط
            </label>
            <div className="relative">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right rtl file:ml-2 sm:file:ml-4 file:mr-0 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer text-xs sm:text-sm"
                  onChange={onChangeTapeImage}
                  dir="rtl"
                />
                <ImagePlus
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              الملاحظات
            </label>
            <div className="relative">
              <textarea
                className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right text-sm sm:text-base"
                value={notes}
                onChange={onChangeNotes}
                rows={4}
                placeholder="أدخل الملاحظات هنا"
                dir="rtl"
              />
              <FileText
                className="absolute left-3 sm:left-4 top-3 sm:top-4 transform text-blue-600"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 text-right">
              الحالة
            </label>
            <div className="relative">
              <select
                className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white text-sm sm:text-base"
                value={status}
                onChange={onChangeStatus}
                dir="rtl"
              >
                <option value="">اختر الحالة</option>
                <option value="مقبول">مقبول</option>
                <option value="مرفوض">مرفوض</option>
                <option value="قيد المراجعة">قيد المراجعة</option>
              </select>

              <Layers
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={16}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base shadow-md mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={16} className="sm:w-5 sm:h-5" />
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
