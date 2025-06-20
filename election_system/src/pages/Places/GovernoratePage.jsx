import React, { useMemo, useState } from "react";
import { useUserData } from "../../Components/auth/UserData";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UsersMap from "../../Components/auth/UsersMap";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import UserTableStats from "../../Components/auth/UserTableStats";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import { governorateTableHeader } from "../../Components/auth/TableHeaderData";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
const GovernoratePage = () => {
  const { governorateData } = useUserData();

  // حالات التطبيق
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    id: true,
    code:true,
    name: true,
    numberOfElections: true,
    numberOfCenters: true,
    numberOfElected: true,
    numberOfVoters: true,
    percentageOfVoters: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const itemsPerPage = 6;

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return governorateData.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.phone.includes(filterText) ||
        item.birthYear.includes(filterText) ||
        item.registrationDate.includes(filterText) ||
        item.registrationMethod.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [governorateData, filterText]);

  // ترتيب البيانات
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // تقسيم الصفحات
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // وظائف الترتيب
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // وظائف التحديد
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((item) => item.id)));
    }
  };

  const handleSelectRow = (id) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  // إجراءات المستخدمين
  const handleUserAction = (action, user) => {
    console.log(`${action} للمستخدم:`, user);
    setShowActionMenu(null);
  };

  return (
    <div>
      <Sidebar />
      <div className="w-full max-w-[1440px] mx-auto p-6 bg-white" dir="rtl">
        <div className="mb-6">
          <UserTableTitle title="المحافظات" subtitle="قائمة المحافظات" />

          <UserTableToolbar
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          <UserTableStats data={governorateData} />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full">
            <UserTableHeader
              tableHeaders={governorateTableHeader}
              visibleColumns={visibleColumns}
              selectedRows={selectedRows}
              paginatedData={paginatedData}
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
            />

            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedRows.has(row.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    {visibleColumns.select && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded text-blue-600"
                        />
                      </td>
                    )}
                    {visibleColumns.id && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.id}</div>
                      </td>
                    )}
                    {visibleColumns.code && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.code}</div>
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-900">
                            {row.name}
                          </div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.numberOfElections && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.numberOfElections}</div>
                      </td>
                    )}
                    {visibleColumns.numberOfCenters && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.numberOfCenters}</div>
                      </td>
                    )}
                    {visibleColumns.numberOfElected && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.numberOfElected}</div>
                      </td>
                    )}
                    {visibleColumns.numberOfVoters && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.numberOfVoters}</div>
                      </td>
                    )}
                    {visibleColumns.percentageOfVoters && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{row.percentageOfVoters}</div>
                      </td>
                    )}

                    {visibleColumns.actions && (
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowActionMenu(
                                showActionMenu === row.id ? null : row.id
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {showActionMenu === row.id && (
                            <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-999999999">
                              <div className="py-1">
                                <button
                                  onClick={() => handleUserAction("view", row)}
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                   عرض التفاصيل
                                </button>
                                <button
                                  onClick={() => handleUserAction("edit", row)}
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                   تعديل
                                </button>
                                <button
                                  onClick={() =>
                                    handleUserAction("delete", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                                >
                                   حذف
                                </button>
                                <button
                                  onClick={() =>
                                    handleUserAction("permissions", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                   إدارة الصلاحيات
                                </button>
                                <hr className="my-1" />
                                <button
                                  onClick={() =>
                                    handleUserAction("delete", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                                >
                                  🗑️ حذف المستخدم
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium">لا توجد نتائج</p>
                    <p className="text-sm">جرب تغيير مصطلحات البحث</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <UserTablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          selectedRows={selectedRows}
          sortedData={sortedData}
        />

        {/* إغلاق القوائم عند النقر خارجها */}
        {(showColumnMenu || showActionMenu) && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => {
              setShowColumnMenu(false);
              setShowActionMenu(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GovernoratePage;
