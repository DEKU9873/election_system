import React from "react";
import { Toaster } from "react-hot-toast";
import GetAllGovernorate from "../../../hook/Governate/get-all-governorate";
import { Landmark, MapPin, Map, LogIn, X } from "lucide-react";
import AddDistrictsHook from "../../../hook/Districts/add-districts-hook";
import AddSubDistrictsHook from "../../../hook/Subdistricts/add-subdistricts-hook";
import GetallDistricts from "../../../hook/Districts/get-all-districts";
import Select from 'react-select';

const AddSubdistrictsModal = ({ onClose }) => {
  const [
    subdistrict,
    districtID,
    governorateId,
    loading,
    submitClicked,
    onChangeSubdistrict,
    onChangeDistrictId,
    onChangeGovernorateId,
    onSubmit,
  ] = AddSubDistrictsHook(onClose);

  const [governates, isLoading] = GetAllGovernorate();
  const [districts] = GetallDistricts();

  const governorateOptions = governates?.map(governorate => ({
    value: governorate.id,
    label: governorate.name
  }));

  const districtOptions = districts?.map(district => ({
    value: district.id,
    label: district.name
  }));

  const handleGovernorateChange = (selectedOption) => {
    onChangeGovernorateId({ target: { value: selectedOption.value } });
  };

  const handleDistrictChange = (selectedOption) => {
    onChangeDistrictId({ target: { value: selectedOption.value } });
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      paddingRight: '10px',
      borderRadius: '0.5rem',
      borderColor: '#E5E7EB',
      '&:hover': {
        borderColor: '#E5E7EB'
      }
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: 'right'
    }),
    input: (base) => ({
      ...base,
      textAlign: 'right',
      direction: 'rtl'
    }),
    option: (base) => ({
      ...base,
      textAlign: 'right',
      direction: 'rtl'
    }),
    menu: (base) => ({
      ...base,
      textAlign: 'right',
      direction: 'rtl'
    }),
    singleValue: (base) => ({
      ...base,
      textAlign: 'right',
      direction: 'rtl'
    })
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0" />
      <div className="bg-white backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center relative overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>

        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">إضافة ناحية جديدة</h1>
        <div dir="rtl" className="w-full grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              اسم الناحية
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pr-10 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={subdistrict}
                onChange={onChangeSubdistrict}
              />
              <Landmark
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
                value={governorateOptions?.find(option => option.value === governorateId)}
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
                value={districtOptions?.find(option => option.value === districtID)}
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
        </div>

        <button
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
    </div>
  );
};

export default AddSubdistrictsModal;