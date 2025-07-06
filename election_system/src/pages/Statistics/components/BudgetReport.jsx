import React from "react";

// مكون لعرض تقرير الميزانية
const BudgetReport = ({ totalBudget, totalExpenses, remainingBudget }) => {
  const percentSpent = (totalExpenses / totalBudget) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">تقرير الميزانية</h3>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          الميزانية المستهلكة
        </span>
        <span className="text-sm font-medium text-gray-900">
          {percentSpent.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="h-2.5 rounded-full"
          style={{ 
            width: `${percentSpent}%`,
            backgroundColor: percentSpent > 90
              ? 'rgba(255, 99, 132, 0.7)'
              : percentSpent > 70
              ? 'rgba(255, 159, 64, 0.7)'
              : 'rgba(75, 192, 192, 0.7)'
          }}
        ></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">الميزانية الكلية</p>
          <p className="text-lg font-bold text-gray-900">
            {totalBudget.toLocaleString()} د.ع
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">المصروفات</p>
          <p className="text-lg font-bold text-red-600">
            {totalExpenses.toLocaleString()} د.ع
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">المتبقي</p>
          <p className="text-lg font-bold text-green-600">
            {remainingBudget.toLocaleString()} د.ع
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetReport;