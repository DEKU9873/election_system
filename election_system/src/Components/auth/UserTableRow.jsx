import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const UserTableRow = ({
  row,
  visibleColumns,
  selectedRows,
  handleSelectRow,
  showActionMenu,
  setShowActionMenu,
  handleUserAction,
  setSelectedRows,
  setMapCenter,
  setMapZoom
}) => {
  return (
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
      {visibleColumns.name && (
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
              {row.name}
            </div>
          </div>
        </td>
      )}
      {visibleColumns.phone && (
        <td className="px-4 py-3">
          <div className="text-sm text-gray-900">{row.phone}</div>
        </td>
      )}
      {visibleColumns.birthYear && (
        <td className="px-4 py-3">
          <div className="text-sm text-gray-900">{row.birthYear}</div>
        </td>
      )}
      {visibleColumns.registrationDate && (
        <td className="px-4 py-3">
          <div className="text-sm text-gray-900">{row.registrationDate}</div>
        </td>
      )}
      {visibleColumns.registrationMethod && (
        <td className="px-4 py-3">
          <div className="text-sm text-gray-900">{row.registrationMethod}</div>
        </td>
      )}
      {visibleColumns.actions && (
        <td className="px-4 py-3">
          <div className="relative">
            <button
              onClick={() =>
                setShowActionMenu(showActionMenu === row.id ? null : row.id)
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
                    onClick={() => handleUserAction("delete", row)}
                    className="block w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                  >
                     حذف
                  </button>
                  <button
                    onClick={() => handleUserAction("permissions", row)}
                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                     إدارة الصلاحيات
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => handleUserAction("delete", row)}
                    className="block w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                  >
                     حذف المستخدم
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default UserTableRow;