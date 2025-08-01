import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import UserTableStats from "../../Components/auth/UserTableStats";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import { MonitorsTableHeaders } from "../../Components/auth/TableHeaderData";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
import AllUserHook from "../../hook/auth/all-user-hook";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/authSlice";
import RegisterModal from "./Auth Modal/RegisterModal";
import DeleteModal from "../../Components/Uitily/DeleteModal";
import Loader from "../../Components/Uitily/Loader";
import UsersMap from "../../Components/auth/UsersMap";
import ObserverRegisterModal from "./Auth Modal/ObserverRegisterModal";
import ObserverEditModal from "./Auth Modal/ObserverEditModal";
const MonitorsTablePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    allUsers,
    loading,
    system_admin,
    coordinator,
    observer,
    center_manager,
    district_manager,
    finance_auditor,
  ] = AllUserHook();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // حالات التطبيق
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    id: true,
    full_name: true,
    phone_number: true,
    ElectionCenter: true,
    added_by: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [mapCenter, setMapCenter] = useState([24.7136, 46.6753]);
  const [mapZoom, setMapZoom] = useState(5);
  const [showMap, setShowMap] = useState(false);

  const itemsPerPage = 6;

  // تحديث مركز الخريطة عند تحديد صف
  useEffect(() => {
    if (selectedRows.size === 1) {
      const selectedUser = observer.find((user) => selectedRows.has(user.id));
      if (selectedUser && selectedUser.location) {
        setMapCenter(selectedUser.location);
        setMapZoom(8);
      }
    } else {
      setMapCenter([24.7136, 46.6753]);
      setMapZoom(5);
    }
  }, [selectedRows, observer]);

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return observer.filter(
      (item) =>
        item.full_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item?.ElectionCenter?.name
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        item.phone_number.includes(filterText)
      //  ||
      // item.added_by.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [observer, filterText]);

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
    setShowActionMenu(null);
    if (action === "permissions") {
      // تنفيذ إجراء إدارة الصلاحيات
    } else if (action === "edit") {
      setSelectedUser(user);
      setShowEditModal(true);
    }
  };

  const handleDeleteConfirm = (id) => {
    setUserIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (userIdToDelete) {
      await dispatch(deleteUser(userIdToDelete));
      await dispatch(getAllUsers());

      setShowDeleteModal(false);
      setUserIdToDelete(null);
    }
  };

  const handleDetailsUserAction = async (id) => {
    if (id) {
      navigate(`/userDetails/${id}`);
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };
  return (
    <div>
      {/* <Sidebar /> */}
      <div
        className="w-full max-w-[1440px] mx-auto p-3 sm:p-6 bg-white min-h-screen"
        dir="rtl"
      >
        <div className="mb-6">
          <UserTableTitle title="المراقبين" subtitle="قائمة المراقبين" />

          <UserTableToolbar
            title="اضافة مراقب"
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpen={handleOpenModal}
            allowedRoles={['system_admin', 'coordinator', 'owner']} // تحديد الأدوار المسموح لها برؤية زر الإضافة
          />

          <UserTableStats data={observer} title="اجمالي المراقبين" />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto md:overflow-x-visible">
          <table className="w-full min-w-[800px]">
            <UserTableHeader
              tableHeaders={MonitorsTableHeaders}
              visibleColumns={visibleColumns}
              selectedRows={selectedRows}
              paginatedData={paginatedData}
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
            />

            {loading ? (
              <tr>
                <td
                  colSpan="12"
                  className="px-2 sm:px-4 py-8 sm:py-12 text-center"
                >
                  <div className="flex justify-center items-center h-32 sm:h-40">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedRows.has(row.id) ? "bg-blue-50" : ""
                      }`}
                    >
                      {visibleColumns.select && (
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            className="rounded text-blue-600"
                          />
                        </td>
                      )}
                      {visibleColumns.id && (
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                      )}
                      {visibleColumns.full_name && (
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="font-medium text-xs sm:text-sm text-gray-900">
                              {row.full_name}
                            </div>
                          </div>
                        </td>
                      )}
                      {visibleColumns.phone_number && (
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.phone_number}
                          </div>
                        </td>
                      )}
                      {visibleColumns.ElectionCenter && (
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">
                            {row.ElectionCenter?.name}
                          </div>
                        </td>
                      )}
                      {visibleColumns.added_by && (
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">
                            {row.added_by}
                          </div>
                        </td>
                      )}

                      {visibleColumns.actions && (
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowActionMenu(
                                  showActionMenu === row.id ? null : row.id
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>

                            {showActionMenu === row.id && (
                              <div className="absolute left-0 mt-1 w-36 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-999999999">
                                <div className="py-1">
                                  <button
                                    onClick={() =>
                                      handleDetailsUserAction(row.id)
                                    }
                                    className="block w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    عرض التفاصيل
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUserAction("edit", row)
                                    }
                                    className="block w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() => handleDeleteConfirm(row.id)}
                                    className="block w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50 transition-colors"
                                  >
                                    حذف
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUserAction("permissions", row)
                                    }
                                    className="block w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    إدارة الصلاحيات
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
                      className="px-2 sm:px-4 py-8 sm:py-12 text-center text-gray-500"
                    >
                      <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-4" />
                      <p className="text-base sm:text-lg font-medium">
                        لا توجد نتائج
                      </p>
                      <p className="text-xs sm:text-sm">
                        جرب تغيير مصطلحات البحث
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
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
      {showModal && <ObserverRegisterModal onClose={handleCloseModal} />}
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
      {showEditModal && selectedUser && (
        <ObserverEditModal 
          onClose={handleCloseEditModal} 
          userData={selectedUser} 
        />
      )}
    </div>
  );
};

export default MonitorsTablePage;
