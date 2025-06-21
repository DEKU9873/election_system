import React from "react";
import { Search, User, ChevronDown } from "lucide-react";

const UserTableToolbar = ({
  title,
  filterText,
  setFilterText,
  showColumnMenu,
  setShowColumnMenu,
  visibleColumns,
  setVisibleColumns,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="البحث ..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* زر إضافة مستخدم جديد */}
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          <User className="w-4 h-4" />
          {title}
        </button>

        {/* قائمة الأعمدة */}
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            الأعمدة
            <ChevronDown className="w-4 h-4" />
          </button>

          {showColumnMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                {Object.entries(visibleColumns).map(
                  ([key, visible]) =>
                    key !== "select" &&
                    key !== "actions" && (
                      <label
                        key={key}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={visible}
                          onChange={(e) =>
                            setVisibleColumns((prev) => ({
                              ...prev,
                              [key]: e.target.checked,
                            }))
                          }
                          className="rounded text-blue-600"
                        />
                        <span className="capitalize">
                          {key === "id"
                            ? "ت"
                            : key === "name"
                            ? "الاسم"
                            : key === "phone"
                            ? "رقم الهاتف"
                            : key === "birthYear"
                            ? "سنة الميلاد"
                            : key === "registrationDate"
                            ? "تاريخ التسجيل"
                            : key === "registrationMethod"
                            ? "طريقة التسجيل"
                            : key === "state"
                            ? "الحالة"
                            : key === "addBy"
                            ? "تمت إضافة بواسطة"
                            : key === "numberOfCenters"
                            ? "عدد المراكز"
                            : key === "pollingCenter"
                            ? "المركز الانتخابي"
                            : key === "numberOfElections"
                            ? "عدد الاقضية"
                            : key === "numberOfVoters"
                            ? "عدد المصوتين"
                            : key === "percentageOfVoters"
                            ? "نسبة التصويت"
                            : key === "numberOfElected"
                            ? "عدد الناخبين"
                            : key === "code"
                            ? "الرمز"
                            : key === "governorate"
                            ? "المحافظات"
                            : key === "numberOfSubdistricts"
                            ? "عدد النواحي"
                            : key === "district" ? "الاقضية": key === "station" ? "المحطة" 
                            :key === "electionDayDate" ? "تاريخ اليوم الانتخابي": key === "electionDayTime" ? "وقت اليوم الانتخابي"
                            :key === "uploadedBy" ? "تم الرفع بواسطة":key === "uploadDate" ? "تاريخ الرفع":key}
                        </span>
                      </label>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTableToolbar;
