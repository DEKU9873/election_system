import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import GetAllGovernorate from "../../../hook/Governate/get-all-governorate";
import { Building2, Hash, MapPin, Map, Landmark, Save, X, Navigation } from "lucide-react";
import GetallDistricts from "../../../hook/Districts/get-all-districts";
import GetAllSubdistricts from "../../../hook/Subdistricts/get-all-subdistricts";
import EditCenterHook from "../../../hook/Center/edit-center-hook";
import Select from "react-select";
import MapLocationPicker from "../../../Components/MapLocationPicker";

const EditCenterModal = ({ onClose, centerData }) => {
  const [
    center,
    code,
    governorateId,
    districtId,
    subdistrictId,
    latitude,
    longitude,
    loading,
    submitClicked,
    onChangeCenter,
    onChangeCode,
    onChangeGovernorateId,
    onChangeDistrictId,
    onChangeSubdistrictId,
    onChangeLatitude,
    onChangeLongitude,
    onLocationSelect,
    onSubmit,
  ] = EditCenterHook(centerData, onClose);
  
  const [showMap, setShowMap] = useState(false);

  const [governates, isLoading] = GetAllGovernorate();
  const [districts] = GetallDistricts();
  const [subdistricts] = GetAllSubdistricts();

  const governorateOptions = governates?.map((governorate) => ({
    value: governorate.id,
    label: governorate.name,
  }));

  // فلترة الأقضية حسب المحافظة المختارة
  const filteredDistricts = districts?.filter(district => 
    governorateId ? district.governorate?.id === governorateId : true
  );

  const districtOptions = filteredDistricts?.map((district) => ({
    value: district.id,
    label: district.name,
  }));

  // فلترة النواحي حسب القضاء المختار
  const filteredSubdistricts = subdistricts?.filter(subdistrict => 
    districtId ? subdistrict.district?.id === districtId : true
  );

  const subdistrictOptions = filteredSubdistricts?.map((subdistrict) => ({
    value: subdistrict.id,
    label: subdistrict.name,
  }));

  const handleGovernorateChange = (selectedOption) => {
    if (selectedOption) {
      onChangeGovernorateId({ target: { value: selectedOption.value } });
    } else {
      onChangeGovernorateId({ target: { value: "" } });
    }
  };

  const handleDistrictChange = (selectedOption) => {
    if (selectedOption) {
      onChangeDistrictId({ target: { value: selectedOption.value } });
    } else {
      onChangeDistrictId({ target: { value: "" } });
    }
  };

  const handleSubdistrictChange = (selectedOption) => {
    if (selectedOption) {
      onChangeSubdistrictId({ target: { value: selectedOption.value } });
    } else {
      onChangeSubdistrictId({ target: { value: "" } });
    }
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
      direction: "rtl",
    }),
    option: (base) => ({
      ...base,
      textAlign: "right",
      direction: "rtl",
    }),
    menu: (base) => ({
      ...base,
      textAlign: "right",
      direction: "rtl",
    }),
    singleValue: (base) => ({
      ...base,
      textAlign: "right",
      direction: "rtl",
    }),
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0" />

      <div
        className="bg-white backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          تعديل المركز
        </h1>
        <div dir="rtl" className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-x-6 md:gap-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              اسم المركز
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={center}
                onChange={onChangeCenter}
                dir="rtl"
                placeholder="أدخل اسم المركز"
              />
              <Building2
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              رمز المركز
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={code}
                onChange={onChangeCode}
                dir="rtl"
                placeholder="أدخل رمز المركز"
              />
              <Hash
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              المحافظة
            </label>
            <div className="relative">
              <Select
                options={governorateOptions}
                value={governorateOptions?.find(
                  (option) => option.value === governorateId
                )}
                onChange={handleGovernorateChange}
                placeholder="اختر المحافظة"
                isSearchable={true}
                className="text-right"
                styles={selectStyles}
              />
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              القضاء
            </label>
            <div className="relative">
              <Select
                options={districtOptions}
                value={districtOptions?.find(
                  (option) => option.value === districtId
                )}
                onChange={handleDistrictChange}
                placeholder="اختر القضاء"
                isSearchable={true}
                className="text-right"
                styles={selectStyles}
              />
              <Map
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              الناحية
            </label>
            <div className="relative">
              <Select
                options={subdistrictOptions}
                value={subdistrictOptions?.find(
                  (option) => option.value === subdistrictId
                )}
                onChange={handleSubdistrictChange}
                placeholder="اختر الناحية"
                isSearchable={true}
                className="text-right"
                styles={selectStyles}
              />
              <Landmark
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>

          {/* قسم تحديد الموقع الجغرافي */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 font-medium text-right text-sm">
                الموقع الجغرافي (اختياري)
              </label>
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                <Navigation size={16} />
                {showMap ? 'إخفاء الخريطة' : 'تحديد الموقع على الخريطة'}
              </button>
            </div>
            
            {showMap && (
              <div className="mb-4">
                <MapLocationPicker
                  onLocationSelect={onLocationSelect}
                  initialPosition={latitude && longitude ? [parseFloat(latitude), parseFloat(longitude)] : null}
                />
                <p className="text-xs text-gray-500 mt-2 text-right">
                  انقر على الخريطة لتحديد موقع المركز
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-right text-xs">
                  خط العرض
                </label>
                <input
                  type="number"
                  step="any"
                  className="w-full pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={latitude}
                  onChange={onChangeLatitude}
                  dir="rtl"
                  placeholder="33.3152"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-right text-xs">
                  خط الطول
                </label>
                <input
                  type="number"
                  step="any"
                  className="w-full pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                  value={longitude}
                  onChange={onChangeLongitude}
                  dir="rtl"
                  placeholder="44.3661"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
              جاري التعديل...
            </>
          ) : (
            <>
              حفظ التعديلات
              <Save size={18} className="ml-1 inline" />
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
    </div>
  );
};

export default EditCenterModal;