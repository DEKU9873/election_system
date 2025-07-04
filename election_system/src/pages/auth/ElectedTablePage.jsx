import React, { useEffect, useMemo, useState } from "react";
import { useUserData } from "../../Components/auth/UserData";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import UserTableStats from "../../Components/auth/UserTableStats";
import { tableHeaders } from "../../Components/auth/TableHeaderData";
import UsersMap from "../../Components/auth/UsersMap";
import AllUserHook from "../../hook/auth/all-user-hook";
import formatDate from "../../hook/UtilsFunctions/FormatDate";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import RegisterModal from "./Auth Modal/RegisterModal";
import DeleteModal from "../../Components/Uitily/DeleteModal";

const ElectedTablePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    allUsers,
    Loading,
    system_admin,
    coordinator,
    observer,
    center_manager,
    district_manager,
    finance_auditor,
    voter,
  ] = AllUserHook();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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
    birth_year: true,
    createdAt: true,
    registrationMethod: true,
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
      const selectedUser = voter.find((user) => selectedRows.has(user.id));
      if (selectedUser && selectedUser.location) {
        setMapCenter(selectedUser.location);
        setMapZoom(8);
      }
    } else {
      setMapCenter([24.7136, 46.6753]);
      setMapZoom(5);
    }
  }, [selectedRows, voter]);

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return voter.filter(
      (item) =>
        item?.full_name?.toLowerCase().includes(filterText.toLowerCase()) ||
        item?.phone_number?.includes(filterText) ||
        item?.birth_year?.toString().includes(filterText) ||
        item?.createdAt?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [voter, filterText]);

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
  };

  const handleDeleteConfirm =  (id) => {
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


  return (
    <div>
      <Sidebar />
      <div className="w-full max-w-[1440px] mx-auto p-6 bg-white" dir="rtl">
        <div className="mb-6">
          <UserTableTitle title="الناخبين" subtitle="قائمة الناخبين" />

          {/* خريطة المستخدمين */}
          <div className="mb-4">
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 mb-2"
            >
              {showMap ? "إخفاء الخريطة" : "إظهار الخريطة"}
            </button>
            {showMap && (
              <UsersMap
                data={voter}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
              />
            )}
          </div>

          <UserTableToolbar
            title="اضافة ناخب"
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpen={handleOpenModal}
          />

          <UserTableStats data={voter} title="اجمالي الناخبين" />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full">
            <UserTableHeader
              tableHeaders={tableHeaders}
              visibleColumns={visibleColumns}
              selectedRows={selectedRows}
              paginatedData={paginatedData}
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
            />

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
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                    )}
                    {visibleColumns.full_name && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => {
                              const marker = document.querySelector(
                                `[data-marker-id="${row.id}"]`
                              );
                              if (marker) {
                                marker.click();
                              }
                              setSelectedRows(new Set([row.id]));
                              setMapCenter(row.location);
                              setMapZoom(12);
                            }}
                          >
                            {row.full_name}
                          </div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.phone_number && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">
                          {row.phone_number}
                        </div>
                      </td>
                    )}
                    {visibleColumns.birth_year && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">
                          {row.birth_year}
                        </div>
                      </td>
                    )}
                    {visibleColumns.createdAt && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">
                          {formatDate(row.createdAt)}
                        </div>
                      </td>
                    )}
                    {visibleColumns.registrationMethod && (
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">
                          {row.registrationMethod}
                        </div>
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
                                  onClick={() =>
                                    handleDetailsUserAction(row.id)
                                  }
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
                                  onClick={() => handleDeleteConfirm(row.id)}
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
      {showModal && <RegisterModal onClose={handleCloseModal} />}
      <DeleteModal isOpen={showDeleteModal} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirmation} />
    </div>
  );
};

export default ElectedTablePage;
