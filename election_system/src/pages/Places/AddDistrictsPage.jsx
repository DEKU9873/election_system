import React from "react";
import { Toaster } from "react-hot-toast";
import GetAllGovernorate from "../../hook/Governate/get-all-governorate";
import { Phone, Lock, LogIn } from "lucide-react";
import AddDistrictsHook from "../../hook/Districts/add-districts-hook";
import Select from 'react-select';

const AddDistrictsPage = () => {
  const [
    district,
    governorateId,
    loading,
    submitClicked,
    onChangeDistrict,
    onChangeGovernorateId,
    onSubmit,
  ] = AddDistrictsHook();

  const [governates, isLoading] = GetAllGovernorate();

  const governorateOptions = governates?.map(governorate => ({
    value: governorate.id,
    label: governorate.name
  }));

  const handleGovernorateChange = (selectedOption) => {
    onChangeGovernorateId({ target: { value: selectedOption.value } });
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
      textAlign: 'right'
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">إضافة قضاء جديد</h1>
        <div className="w-full grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              اسم القضاء
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={district}
                onChange={onChangeDistrict}
              />
              <Lock
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
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md mt-6 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={20} />
              إضافة قضاء
            </>
          )}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddDistrictsPage;
