import React, { useMemo, useState } from "react";
import { useUserData } from "../../Components/auth/UserData";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import UserTableStats from "../../Components/auth/UserTableStats";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import { StationHeader } from "../../Components/auth/TableHeaderData";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
import Loader from "../../Components/Uitily/Loader";
import GetAllSubdistricts from "../../hook/Subdistricts/get-all-subdistricts";
import { useDispatch } from "react-redux";
import {
  deleteStation,
  deleteSubdistrict,
  getStations,
  getStationsByCenterId,
} from "../../redux/placeSlice";
import GetStationByCenter from "../../hook/Stations/get-station-by-center";
import { useParams } from "react-router-dom";
import AddStationModal from "./Place Modal/AddStationModal";
import EditStationModal from "./Place Modal/EditStationModal";
import DeleteModal from "../../Components/Uitily/DeleteModal";
import { Toaster } from "react-hot-toast";

const StationPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // const { subdistrictsData } = useUserData();
  const { stations, loading } = GetStationByCenter(id);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stationIdToDelete, setStationIdToDelete] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

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
    tape_count: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const itemsPerPage = 6;

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return stations.filter((item) =>
      item?.name?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [stations, filterText]);

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
  const handleUserAction = (action, station) => {
    setShowActionMenu(null);

    if (action === "edit") {
      setSelectedStation(station);
      setShowEditModal(true);
    }
  };

  const handleDeleteConfirm = (id) => {
    setStationIdToDelete(id);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setStationIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (stationIdToDelete) {
      await dispatch(deleteStation(stationIdToDelete));
      await dispatch(getStationsByCenterId(id));

      setShowDeleteModal(false);
      setStationIdToDelete(null);
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
    setSelectedStation(null);
  };

  return (
    <div>
      {/* <Sidebar /> */}
      <div
        className="w-full max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 bg-white min-h-screen"
        dir="rtl"
      >
        <div className="mb-3 sm:mb-4 md:mb-6">
          <UserTableTitle title="المحطات" subtitle="قائمة المحطات" />

          <UserTableToolbar
            title="اضافة محطة"
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpen={handleOpenModal}
                                                allowedRoles={['system_admin','owner','observer','coordinator']} 

          />

          <UserTableStats data={stations} title="اجمالي المحطات" />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto md:overflow-x-visible">
          <table className="w-full min-w-[800px]">
            <UserTableHeader
              tableHeaders={StationHeader}
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
                  paginatedData.map((row, index) => (
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
                            className="rounded text-blue-600"
                          />
                        </td>
                      )}
                      {visibleColumns.id && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                      )}

                      {visibleColumns.code && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="font-medium text-xs sm:text-sm text-gray-900">
                              {row.code}
                            </div>
                          </div>
                        </td>
                      )}
                      {visibleColumns.name && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="font-medium text-xs sm:text-sm text-gray-900">
                              {row.name}
                            </div>
                          </div>
                        </td>
                      )}

                      {visibleColumns.tape_count && (
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {row.tape_count}
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
                              className="p-0.5 sm:p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>

                            {showActionMenu === row.id && (
                              <div className="absolute left-0 mt-1 w-36 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-999999999">
                                <div className="py-1">
                                  {/* <button
                                  onClick={() => handleUserAction("view", row)}
                                  className="block w-full text-right px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  عرض التفاصيل
                                </button> */}
                                  <button
                                    onClick={() =>
                                      handleUserAction("edit", row)
                                    }
                                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() => handleDeleteConfirm(row.id)}
                                    className="block w-full text-right px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50 transition-colors"
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
                      className="px-2 sm:px-4 py-8 sm:py-12 text-center text-gray-500"
                    >
                      <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-2 sm:mb-4" />
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
      {showModal && <AddStationModal onClose={handleCloseModal} electionCenterId={id} />}
      {showEditModal && (
        <EditStationModal
          onClose={handleCloseEditModal}
          station={selectedStation}
          electionCenterId={id}
        />
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
       <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "55px", 
          },
        }}
      />
    </div>
  );
};

export default StationPage;
