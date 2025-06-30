import React from "react";
import { Toaster } from "react-hot-toast";
import GetAllGovernorate from "../../hook/Governate/get-all-governorate";
import { Phone, Lock, LogIn } from "lucide-react";
import AddDistrictsHook from "../../hook/Districts/add-districts-hook";
import AddSubDistrictsHook from "../../hook/Subdistricts/add-subdistricts-hook";
import GetallDistricts from "../../hook/Districts/get-all-districts";
import GetAllSubdistricts from "../../hook/Subdistricts/get-all-subdistricts";
import AddCenterHook from "../../hook/Center/add-center-hook";

const AddCenterPage = () => {
  const [
    center,
    code,
    governorateId,
    districtId,
    subdistrictId,
    loading,
    submitClicked,
    onChangeCenter,
    onChangeCode,
    onChangeGovernorateId,
    onChangeDistrictId,
    onChangeSubdistrictId,
    onSubmit,
  ] = AddCenterHook();

  const [governates, isLoading] = GetAllGovernorate();
  const [districts] = GetallDistricts();
    const [subdistricts] = GetAllSubdistricts();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
        <div className="w-full grid grid-cols-1 gap-6">
          {/* District Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              اسم المركز
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="اسم المركز"
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={center}
                onChange={onChangeCenter}
              />
              <Phone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
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
                placeholder="رمز المركز"
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
                value={code}
                onChange={onChangeCode}
              />
              <Phone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              المحافظة
            </label>
            <div className="relative">
              <select
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={governorateId}
                onChange={onChangeGovernorateId}
              >
                <option value="">اختر المحافظة</option>
                {!isLoading &&
                  governates?.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name}
                    </option>
                  ))}
              </select>
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              القضاء
            </label>
            <div className="relative">
              <select
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={districtId}
                onChange={onChangeDistrictId}
              >
                <option value="">اختر القضاء</option>
                {!isLoading &&
                  districts?.map((dis) => (
                    <option key={dis.id} value={dis.id}>
                      {dis.name}
                    </option>
                  ))}
              </select>
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              الناحية
            </label>
            <div className="relative">
              <select
                className="w-full pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-right bg-white"
                value={subdistrictId}
                onChange={onChangeSubdistrictId}
              >
                <option value="">اختر الناحية</option>
                {!isLoading &&
                  subdistricts?.map((subdis) => (
                    <option key={subdis.id} value={subdis.id}>
                      {subdis.name}
                    </option>
                  ))}
              </select>
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md mt-6 flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn size={20} />
              إضافة مركز
            </>
          )}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddCenterPage;
