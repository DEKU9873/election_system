import React, { useMemo, useState } from "react";
import { useUserData } from "../../Components/auth/UserData";
import Sidebar from "../../Components/Uitily/Sidebar";
import UserTableTitle from "../../Components/auth/UserTableTitle";
import UserTableToolbar from "../../Components/auth/UserTableToolbar";
import UserTableStats from "../../Components/auth/UserTableStats";
import UserTableHeader from "../../Components/auth/UserTableHeader";
import { subdistrictsTableHeader } from "../../Components/auth/TableHeaderData";
import { MoreHorizontal, User } from "lucide-react";
import UserTablePagination from "../../Components/auth/UserTablePagination";
import GetAllSubdistricts from "../../hook/Subdistricts/get-all-subdistricts";
import { useDispatch } from "react-redux";
import { deleteSubdistrict, getSubdistricts } from "../../redux/placeSlice";
import AddSubdistrictsModal from "./Place Modal/AddSubdistrictsModal";
import EditSubdistrictsModal from "./Place Modal/EditSubdistrictsModal";
import DeleteModal from "../../Components/Uitily/DeleteModal";
import Loader from "../../Components/Uitily/Loader";
const SubdistrictPage = () => {
  const dispatch = useDispatch();

  // const { subdistrictsData } = useUserData();
  const [subdistricts, loading] = GetAllSubdistricts();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subdistrictIdToDelete, setSubdistrictIdToDelete] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);


  // حالات التطبيق
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    id: true,
    district: true,
    governorate: true,
    name: true,
    numberOfElections: true,
    election_centers_count: true,
    users_count: true,
    confirmed_voting_users_count: true,
    percentageOfVoters: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const itemsPerPage = 6;

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return subdistricts.filter((item) =>
      item?.name?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [subdistricts, filterText]);

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
  const handleUserAction = (action, subdistrict) => {
    setShowActionMenu(null);
    if (action === "edit") {
      setSelectedSubdistrict(subdistrict);
      setShowEditModal(true);
    }
  };

  const handleDeleteConfirm = (id) => {
    setSubdistrictIdToDelete(id);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSubdistrictIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (subdistrictIdToDelete) {
      await dispatch(deleteSubdistrict(subdistrictIdToDelete));
      await dispatch(getSubdistricts());
      setShowDeleteModal(false);
      setSubdistrictIdToDelete(null);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () =>{
    setShowModal(false);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedSubdistrict(null);
  }

  return (
    <div>
      {/* <Sidebar /> */}
      <div className="w-full max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 bg-white min-h-screen" dir="rtl">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <UserTableTitle title="النواحي" subtitle="قائمة النواحي" />

          <UserTableToolbar
            title="اضافة ناحية"
            filterText={filterText}
            setFilterText={setFilterText}
            showColumnMenu={showColumnMenu}
            setShowColumnMenu={setShowColumnMenu}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            onOpen={handleOpenModal}
           
          />

          <UserTableStats data={subdistricts} title = "اجمالي النواحي" />
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <UserTableHeader
              tableHeaders={subdistrictsTableHeader}
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
                          className="rounded text-blue-600 w-3 h-3 sm:w-4 sm:h-4"
                        />
                      </td>
                    )}
                    {visibleColumns.id && (
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-gray-900">{row.id}</div>
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
                    {visibleColumns.district && (
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {row.district}
                        </div>
                      </td>
                    )}
                    {visibleColumns.governorate && (
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {row.governorate}
                        </div>
                      </td>
                    )}
                    {visibleColumns.election_centers_count && (
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {row.election_centers_count}
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
                    {visibleColumns.confirmed_voting_users_count && (
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {row.confirmed_voting_users_count}
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
                                  onClick={() => handleUserAction("edit", row)}
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
                                {/* <button
                                  onClick={() =>
                                    handleUserAction("permissions", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  إدارة الصلاحيات
                                </button> */}
                                {/* <hr className="my-1" />
                                <button
                                  onClick={() =>
                                    handleUserAction("delete", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                                >
                                   حذف المستخدم
                                </button> */}
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
      {showModal && (
        <AddSubdistrictsModal onClose={handleCloseModal} />
      )}
      {showEditModal && (
        <EditSubdistrictsModal onClose={handleCloseEditModal} subdistrictData={selectedSubdistrict} />
      )}
      <DeleteModal 
        isOpen={showDeleteModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </div>
  );
};

export default SubdistrictPage;
