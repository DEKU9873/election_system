import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const UserTableHeader = ({ 
  tableHeaders,
  visibleColumns, 
  selectedRows, 
  paginatedData, 
  handleSelectAll, 
  handleSort 
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableHeaders.map((header) => {
          if (!visibleColumns[header.id]) return null;

          if (header.id === 'select') {
            return (
              <th key={header.id} className="px-2 sm:px-4 py-2 sm:py-3 text-right">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded text-blue-600"
                />
              </th>
            );
          }

          return (
            <th key={header.id} className="px-2 sm:px-4 py-2 sm:py-3 text-right">
              {header.sortable ? (
                <button
                  onClick={() => handleSort(header.id)}
                  className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  {header.icon && <header.icon className="w-3 sm:w-4 h-3 sm:h-4" />}
                  <span className="hidden sm:inline">{header.label}</span>
                  <span className="inline sm:hidden">{header.shortLabel || header.label}</span>
                  <ArrowUpDown className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  <span className="hidden sm:inline">{header.label}</span>
                  <span className="inline sm:hidden">{header.shortLabel || header.label}</span>
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default UserTableHeader;