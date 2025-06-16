import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Search,
  User,
  Mail,
  Briefcase,
  Activity,
} from "lucide-react";
import Sidebar from "../Uitily/Sidebar";

const UsersTable = () => {
  // البيانات الأولية
  const [data, setData] = useState([
    {
      id: "1",
      username: "أحمد محمد",
      email: "ahmed.mohamed@example.com",
      position: "مطور واجهات أمامية",
      status: "نشط",
      avatar: "AM",
    },
    {
      id: "2",
      username: "فاطمة علي",
      email: "fatma.ali@example.com",
      position: "مصممة UX/UI",
      status: "نشط",
      avatar: "FA",
    },
    {
      id: "3",
      username: "محمد السيد",
      email: "mohamed.elsayed@example.com",
      position: "مطور خلفي",
      status: "غير نشط",
      avatar: "MS",
    },
    {
      id: "4",
      username: "سارة أحمد",
      email: "sara.ahmed@example.com",
      position: "مديرة مشاريع",
      status: "نشط",
      avatar: "SA",
    },
    {
      id: "5",
      username: "عمر حسن",
      email: "omar.hassan@example.com",
      position: "محلل أنظمة",
      status: "غير نشط",
      avatar: "OH",
    },
    {
      id: "6",
      username: "نور الدين",
      email: "nour.eldeen@example.com",
      position: "مطور تطبيقات جوال",
      status: "نشط",
      avatar: "ND",
    },
    {
      id: "7",
      username: "ليلى محمود",
      email: "layla.mahmoud@example.com",
      position: "مختبرة برمجيات",
      status: "غير نشط",
      avatar: "LM",
    },
    {
      id: "8",
      username: "يوسف عبدالله",
      email: "youssef.abdullah@example.com",
      position: "مهندس DevOps",
      status: "نشط",
      avatar: "YA",
    },
    {
      id: "9",
      username: "مريم صالح",
      email: "mariam.saleh@example.com",
      position: "مديرة تسويق رقمي",
      status: "غير نشط",
      avatar: "MS2",
    },
    {
      id: "10",
      username: "كريم فتحي",
      email: "karim.fathy@example.com",
      position: "مطور Full Stack",
      status: "نشط",
      avatar: "KF",
    },
  ]);

  // حالات التطبيق
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    username: true,
    email: true,
    position: true,
    status: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const itemsPerPage = 6;

  // تصفية البيانات
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.position.toLowerCase().includes(filterText.toLowerCase()) ||
        item.status.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

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

  // تغيير حالة النشاط
  const toggleUserStatus = (userId) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "نشط" ? "غير نشط" : "نشط" }
          : user
      )
    );
    setShowActionMenu(null);
  };

  // تنسيق حالة النشاط
  const getStatusBadge = (status) => {
    const statusStyles = {
      نشط: "bg-green-100 text-green-800 border-green-200",
      "غير نشط": "bg-gray-100 text-gray-800 border-gray-200",
    };

    const statusIcons = {
      نشط: "🟢",
      "غير نشط": "⚫",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
      >
        <span>{statusIcons[status]}</span>
        {status}
      </span>
    );
  };

  // نسخ البريد الإلكتروني
  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setShowActionMenu(null);
  };

  // إجراءات المستخدمين
  const handleUserAction = (action, user) => {
    console.log(`${action} للمستخدم:`, user);
    setShowActionMenu(null);
  };

  return (
    <div>
      {" "}
      <Sidebar />
      <div className="w-full max-w-[1440px] mx-auto p-6 bg-white" dir="rtl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                إدارة المستخدمين
              </h2>
              <p className="text-gray-600">
                إدارة حسابات المستخدمين والصلاحيات
              </p>
            </div>
          </div>

          {/* شريط الأدوات */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* زر إضافة مستخدم جديد */}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                <User className="w-4 h-4" />
                إضافة مستخدم
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
                                {key === "username"
                                  ? "اسم المستخدم"
                                  : key === "email"
                                  ? "البريد الإلكتروني"
                                  : key === "position"
                                  ? "المنصب"
                                  : key === "status"
                                  ? "حالة النشاط"
                                  : key}
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

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  إجمالي المستخدمين
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {data.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  المستخدمين النشطين
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {data.filter((user) => user.status === "نشط").length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 text-gray-600">⚫</span>
                <span className="text-sm font-medium text-gray-800">
                  غير النشطين
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {data.filter((user) => user.status === "غير نشط").length}
              </p>
            </div>
          </div>
        </div>

        {/* الجدول */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.select && (
                  <th className="px-4 py-3 text-right">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.size === paginatedData.length &&
                        paginatedData.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded text-blue-600"
                    />
                  </th>
                )}

                {visibleColumns.username && (
                  <th className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleSort("username")}
                      className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      <User className="w-4 h-4" />
                      اسم المستخدم
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                )}

                {visibleColumns.email && (
                  <th className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                )}

                {visibleColumns.position && (
                  <th className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleSort("position")}
                      className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      <Briefcase className="w-4 h-4" />
                      المنصب
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                )}

                {visibleColumns.status && (
                  <th className="px-4 py-3 text-right">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                      <Activity className="w-4 h-4" />
                      حالة النشاط
                    </div>
                  </th>
                )}

                {visibleColumns.actions && (
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                    الإجراءات
                  </th>
                )}
              </tr>
            </thead>

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

                    {visibleColumns.username && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {row.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {row.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {row.id}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}

                    {visibleColumns.email && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {row.email}
                          </span>
                        </div>
                      </td>
                    )}

                    {visibleColumns.position && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {row.position}
                          </span>
                        </div>
                      </td>
                    )}

                    {visibleColumns.status && (
                      <td className="px-4 py-3">
                        {getStatusBadge(row.status)}
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
                            <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => copyEmail(row.email)}
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  📧 نسخ البريد الإلكتروني
                                </button>
                                <button
                                  onClick={() => handleUserAction("edit", row)}
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  ✏️ تحرير المستخدم
                                </button>
                                <button
                                  onClick={() => toggleUserStatus(row.id)}
                                  className={`block w-full text-right px-4 py-2 text-sm transition-colors ${
                                    row.status === "نشط"
                                      ? "text-yellow-700 hover:bg-yellow-50"
                                      : "text-green-700 hover:bg-green-50"
                                  }`}
                                >
                                  {row.status === "نشط"
                                    ? "⏸️ إلغاء تنشيط"
                                    : "▶️ تنشيط الحساب"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleUserAction("permissions", row)
                                  }
                                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  🔐 إدارة الصلاحيات
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

        {/* شريط التحكم السفلي */}
        <div className="flex items-center justify-between mt-6 bg-gray-50 px-4 py-3 rounded-lg">
          <div className="text-sm text-gray-600">
            تم تحديد {selectedRows.size} من {sortedData.length} مستخدم
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              السابق
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              التالي
            </button>
          </div>
        </div>

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

export default UsersTable;
