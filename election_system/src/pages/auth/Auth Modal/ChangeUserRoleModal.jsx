import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole, resetChangeRoleSuccess } from "../../../redux/authSlice";
import notify from "../../../hook/useNotification";
import GetAllElectionCentersHook from "../../../hook/ElectionCenters/get-all-election-centers";
import { Save, X, UserCog, Building } from "lucide-react";
import Select from "react-select";

const ChangeUserRoleModal = ({ isOpen, onClose, userId }) => {
  const dispatch = useDispatch();
  const [centers] = GetAllElectionCentersHook();
  const { loading, changeRoleSuccess, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    newRole: "",
    election_centers_id: [],
  });

  const roles = [
    { value: "voter", label: "ناخب" },
    { value: "observer", label: "مراقب" },
    { value: "coordinator", label: "منسق" },
    { value: "center_manager", label: "مدير مركز" },
    { value: "district_manager", label: "مدير منطقة" },
    { value: "owner", label: "مالك" },
  ];
  
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

  // إعادة تعيين النموذج عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      setFormData({
        newRole: "",
        election_centers_id: [],
      });
    }
  }, [isOpen]);

  // إعادة تعيين حالة النجاح عند إغلاق النافذة
  const handleClose = () => {
    dispatch(resetChangeRoleSuccess());
    onClose();
  };

  // معالجة نجاح أو فشل تغيير الدور
  useEffect(() => {
    if (changeRoleSuccess) {
      notify("تم تغيير دور المستخدم بنجاح", "success");
      handleClose();
    }
    if (error) {
      notify(error, "error");
    }
  }, [changeRoleSuccess, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCenterChange = (e) => {
    const { value, checked } = e.target;
    const centerId = parseInt(value);

    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          election_centers_id: [...prevData.election_centers_id, centerId],
        };
      } else {
        return {
          ...prevData,
          election_centers_id: prevData.election_centers_id.filter(
            (id) => id !== centerId
          ),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    if (!formData.newRole) {
      notify("الرجاء اختيار الدور الجديد", "warning");
      return;
    }

    // التحقق من اختيار مراكز انتخابية للأدوار التي تتطلب ذلك
    if (
      ["coordinator", "district_manager"].includes(formData.newRole) &&
      formData.election_centers_id.length === 0
    ) {
      notify("الرجاء اختيار مركز انتخابي واحد على الأقل", "warning");
      return;
    }

    // إعداد البيانات للإرسال
    const roleData = {
      newRole: formData.newRole,
    };

    // إضافة مراكز الانتخاب فقط للأدوار التي تتطلب ذلك
    if (["coordinator", "district_manager"].includes(formData.newRole)) {
      roleData.election_centers_id = formData.election_centers_id;
    }

    // إرسال البيانات
    await dispatch(changeUserRole({ userId, roleData }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center p-2 sm:p-4"
      onClick={handleClose}
    >
      <div className="absolute inset-0" />
      <div
        className="bg-white backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          تغيير دور المستخدم
        </h1>
        <div dir="rtl" className="w-full grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-right">
              الدور الجديد
            </label>
            <div className="relative">
              <Select
                options={roles}
                value={roles.find((role) => role.value === formData.newRole)}
                onChange={(selectedOption) => {
                  handleChange({ target: { name: "newRole", value: selectedOption.value } });
                }}
                placeholder="اختر الدور"
                isSearchable={true}
                className="text-right"
                styles={selectStyles}
              />
              <UserCog
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={20}
              />
            </div>
          </div>

          {["coordinator", "district_manager"].includes(formData.newRole) && (
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-right">
                المراكز الانتخابية
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3 relative">
                <Building
                  className="absolute left-4 top-4 text-blue-600"
                  size={20}
                />
                {centers && centers.length > 0 ? (
                  centers.map((center) => (
                    <div key={center.id} className="mb-2">
                      <label className="flex items-center text-right">
                        <input
                          type="checkbox"
                          value={center.id}
                          checked={formData.election_centers_id.includes(center.id)}
                          onChange={handleCenterChange}
                          className="ml-2"
                        />
                        {center.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-right">لا توجد مراكز انتخابية متاحة</p>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
              جاري التحديث...
            </>
          ) : (
            <>
              حفظ التعديلات
              <Save size={18} className="ml-1 inline" />
            </>
          )}
        </button>
        <button
          onClick={handleClose}
          className="w-full mt-3 sm:mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRoleModal;