import React, { useMemo, useState } from "react";
import { useUserData } from "../../Components/auth/UserData";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import UserTableStats from "../../Components/auth/UserTableStats";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import { CenterHeader } from "../../Components/auth/TableHeaderData";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
import GetallDistricts from "../../hook/Districts/get-all-districts";
import { useDispatch } from "react-redux";
import {
  deleteDistrict,
  deleteElectionCenter,
  getElectionCenters,
} from "../../redux/placeSlice";
import GetAllCenter from "../../hook/Center/get-all-center";
import { useNavigate } from "react-router-dom";
import AddCenterModal from "./Place Modal/AddCenterModal";
import EditCenterModal from "./Place Modal/EditCenterModal";
import DeleteModal from "../../Components/Uitily/DeleteModal";
import Loader from "../../Components/Uitily/Loader";
const CenterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [electionCenters, loading] = GetAllCenter();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [centerIdToDelete, setCenterIdToDelete] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  // حالات التطبيق
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    id: true,
    code: true,
    name: true,
    governorate_name: true,
    district_name: true,
    subdistrict_name: true,
    stations_count: true,
    users_count: true,
    percentageOfVoters: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const itemsPerPage = 6;

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return electionCenters.filter((item) =>
      item?.name?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [electionCenters, filterText]);

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
  const handleUserAction = (action, center) => {
    setShowActionMenu(null);

    if (action === "edit") {
      setSelectedCenter(center);
      setShowEditModal(true);
    }
  };

  const handleDeleteConfirm = (id) => {
    setCenterIdToDelete(id);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCenterIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (centerIdToDelete) {
      await dispatch(deleteElectionCenter(centerIdToDelete));
      await dispatch(getElectionCenters());
      setShowDeleteModal(false);
      setCenterIdToDelete(null);
    }
  };

  const handleCenterStations = (id) => {
    if (id) {
      navigate(`/stations/${id}`);
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
    setSelectedCenter(null);
  };

  console.log(loading);

  return (
    <div>
      {/* <Sidebar /> */}
      <div className="w-full max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 bg-white min-h-screen" dir="rtl">
        <div className="mb-6">
          <UserTableTitle
            title="المراكز الانتخابية"
            subtitle="قائمة المراكز الانتخابية"
          />

          <UserTableToolbar
            title="اضافة مركز انتخابي"
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpen={handleOpenModal}
          />

          <UserTableStats data={electionCenters} title="اجمالي المراكز" />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <UserTableHeader
              tableHeaders={CenterHeader}
              visibleColumns={visibleColumns}
              selectedRows={selectedRows}
              paginatedData={paginatedData}
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
            />

            {loading ? (
              <tr>
                <td colSpan="12" className="px-4 py-12 text-center">
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
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
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            className="rounded text-blue-600 w-4 h-4 sm:w-5 sm:h-5"
                          />
                        </td>
                      )}
                      {visibleColumns.id && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">{row.id}</div>
                        </td>
                      )}

                      {visibleColumns.code && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-2">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {row.code}
                            </div>
                          </div>
                        </td>
                      )}
                      {visibleColumns.name && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.name}
                          </div>
                        </td>
                      )}
                      {visibleColumns.governorate_name && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.governorate_name}
                          </div>
                        </td>
                      )}

                      {visibleColumns.district_name && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.district_name}
                          </div>
                        </td>
                      )}
                      {visibleColumns.subdistrict_name && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.subdistrict_name}
                          </div>
                        </td>
                      )}
                      {visibleColumns.stations_count && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.stations_count}
                          </div>
                        </td>
                      )}
                      {visibleColumns.users_count && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.users_count}
                          </div>
                        </td>
                      )}
                      {visibleColumns.percentageOfVoters && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.percentageOfVoters}
                          </div>
                        </td>
                      )}

                      {visibleColumns.actions && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
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
                                    onClick={() => handleCenterStations(row.id)}
                                    className="block w-full text-right px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    عرض المحطات
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUserAction("edit", row)
                                    }
                                    className="block w-full text-right px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() => handleDeleteConfirm(row.id)}
                                    className="block w-full text-right px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50 transition-colors"
                                  >
                                    حذف
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
                      <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-2 sm:mb-4" />
                      <p className="text-base sm:text-lg font-medium">لا توجد نتائج</p>
                      <p className="text-xs sm:text-sm">جرب تغيير مصطلحات البحث</p>
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
      {showModal && <AddCenterModal onClose={handleCloseModal} />}
      {showEditModal && (
        <EditCenterModal
          onClose={handleCloseEditModal}
          centerData={selectedCenter}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </div>
  );
};

export default CenterPage;
