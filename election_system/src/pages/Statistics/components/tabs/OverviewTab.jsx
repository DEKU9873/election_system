import React from "react";
import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";
import StatCard from "../StatCard";
import BudgetReport from "../BudgetReport";
import RecentTransactions from "../RecentTransactions";

const OverviewTab = ({ data }) => {
  // تعيين البيانات المالية
  const financialData = data;
  return (
    <>
      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="إجمالي الميزانية"
          value={`${financialData.totalBudget.toLocaleString()} د.ع`}
          icon={DollarSign}
          trend={5.2}
          color="bg-blue-600"
        />
        <StatCard
          title="إجمالي المصروفات"
          value={`${financialData.totalExpenses.toLocaleString()} د.ع`}
          icon={TrendingDown}
          trend={-2.4}
          color="bg-red-500"
        />
        <StatCard
          title="المتبقي من الميزانية"
          value={`${financialData.remainingBudget.toLocaleString()} د.ع`}
          icon={TrendingUp}
          trend={3.1}
          color="bg-green-500"
        />
      </div>

      {/* تقرير الميزانية */}
      <div className="mb-6">
        <BudgetReport
          totalBudget={financialData.totalBudget}
          totalExpenses={financialData.totalExpenses}
          remainingBudget={financialData.remainingBudget}
        />
      </div>

      {/* تفاصيل توزيع الميزانية */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          تفاصيل توزيع الميزانية
        </h3>
        <div className="space-y-4">
          {financialData.expensesByCategory.map(
            (category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {category.category}
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900">
                      {category.amount.toLocaleString()} د.ع
                    </span>
                    <span className="text-xs text-gray-500">
                      ({category.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: 
                        index % 7 === 0
                          ? 'rgba(54, 162, 235, 0.7)'
                          : index % 7 === 1
                          ? 'rgba(255, 99, 132, 0.7)'
                          : index % 7 === 2
                          ? 'rgba(255, 206, 86, 0.7)'
                          : index % 7 === 3
                          ? 'rgba(75, 192, 192, 0.7)'
                          : index % 7 === 4
                          ? 'rgba(153, 102, 255, 0.7)'
                          : index % 7 === 5
                          ? 'rgba(255, 159, 64, 0.7)'
                          : 'rgba(199, 199, 199, 0.7)'
                    }}
                  ></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* المعاملات الأخيرة */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <RecentTransactions
          transactions={financialData.recentTransactions}
        />
      </div>
    </>
  );
};

export default OverviewTab;