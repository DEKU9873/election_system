import React from 'react';

const UserTablePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  selectedRows,
  sortedData
}) => {
  return (
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}
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
  );
};

export default UserTablePagination;