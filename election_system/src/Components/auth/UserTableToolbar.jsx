import React from "react";
import { Search, User, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTableToolbar = ({
  title,
  filterText,
  setFilterText,
  showColumnMenu,
  setShowColumnMenu,
  visibleColumns,
  setVisibleColumns,
  onOpen,
  className,
}) => {


  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 ${className}`}>
      <div className="relative flex-1 min-w-[200px] w-full sm:w-auto sm:max-w-md mb-2 sm:mb-0">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="البحث ..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* زر إضافة مستخدم جديد */}
        <button onClick={onOpen} className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-sky-700 text-white rounded-lg hover:bg-sky-800 focus:ring-2 focus:ring-blue-500">
          {/* <User className="w-3 sm:w-4 h-3 sm:h-4" /> */}
          {title}
        </button>

        {/* قائمة الأعمدة */}
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            الأعمدة
            <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4" />
          </button>

          {showColumnMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
                            : key === "full_name"
                            ? "الاسم"
                            : key === "phone_number"
                            ? "رقم الهاتف"
                            : key === "birth_year"
                            ? "سنة الميلاد"
                            : key === "createdAt"
                            ? "تاريخ التسجيل"
                            : key === "role"
                            ? "المنصب"
                            : key === "registrationMethod"
                            ? "طريقة التسجيل"
                            : key === "state"
                            ? "الحالة"
                            : key === "added_by"
                            ? "اضيف بواسطة"
                            : key === "numberOfCenters"
                            ? "عدد المراكز"
                            : key === "election_centers_count"
                            ? "المركز الانتخابي"
                            : key === "districts_count"
                            ? "عدد الاقضية"
                            : key === "confirmed_voting_users_count"
                            ? "عدد المصوتين"
                            : key === "percentageOfVoters"
                            ? "نسبة التصويت"
                            : key === "users_count"
                            ? "عدد الناخبين"
                            : key === "code"
                            ? "الرمز"
                            : key === "governorate"
                            ? "المحافظات"
                            : key === "subdistricts_count"
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
