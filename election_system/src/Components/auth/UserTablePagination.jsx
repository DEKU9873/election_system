import React from 'react';

const UserTablePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  selectedRows,
  sortedData
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
      <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
        تم تحديد {selectedRows.size} من {sortedData.length} مستخدم
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          السابق
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // للشاشات الصغيرة، نعرض فقط الصفحات المهمة
            if (totalPages <= 5) {
              return i + 1;
            } else if (currentPage <= 3) {
              // إذا كنا في البداية
              if (i < 4) return i + 1;
              else return totalPages;
            } else if (currentPage >= totalPages - 2) {
              // إذا كنا في النهاية
              if (i === 0) return 1;
              else return totalPages - (4 - i);
            } else {
              // إذا كنا في المنتصف
              if (i === 0) return 1;
              else if (i === 4) return totalPages;
              else return currentPage - 1 + i;
            }
          }).map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index] - array[index-1] > 1 && (
                <span className="text-gray-500 text-xs">...</span>
              )}
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-colors ${
                  currentPage === page
                    ? "bg-sky-700 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default UserTablePagination;