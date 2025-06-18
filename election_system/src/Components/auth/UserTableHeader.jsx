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
              <th key={header.id} className="px-4 py-3 text-right">
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
            <th key={header.id} className="px-4 py-3 text-right">
              {header.sortable ? (
                <button
                  onClick={() => handleSort(header.id)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  {header.icon && <header.icon className="w-4 h-4" />}
                  {header.label}
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-sm font-medium text-gray-900">
                  {header.label}
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