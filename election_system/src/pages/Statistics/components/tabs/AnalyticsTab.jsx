import React from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import StatCard from "../StatCard";
import PieChartComponent from "../charts/PieChartComponent";
import BarChartComponent from "../charts/BarChartComponent";

const AnalyticsTab = ({ data }) => {
  // تعيين البيانات المالية
  const financialData = data;
  // حساب نسبة استهلاك الميزانية
  const budgetConsumptionPercentage = Math.round(
    (financialData.totalExpenses / financialData.totalBudget) * 100
  );

  return (
    <>
      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="إجمالي الميزانية"
          value={`${financialData.totalBudget.toLocaleString()} د.ع`}
          icon={DollarSign}
          trend={5.2}
          color="bg-blue-600"
        />
        <StatCard
          title="نسبة استهلاك الميزانية"
          value={`${budgetConsumptionPercentage}%`}
          icon={TrendingDown}
          trend={-2.4}
          color="bg-purple-500"
        />
        <StatCard
          title="إجمالي الإيرادات"
          value={`${financialData.totalRevenue.toLocaleString()} د.ع`}
          icon={TrendingUp}
          trend={3.8}
          color="bg-green-500"
        />
        <StatCard
          title="متوسط المصروفات الشهرية"
          value={`${(financialData.totalExpenses / 12).toLocaleString()} د.ع`}
          icon={Calendar}
          color="bg-amber-500"
        />
      </div>

      {/* تحليل الاتجاهات المالية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            تحليل الاتجاهات المالية
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  استهلاك الميزانية
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900">
                    {financialData.totalExpenses.toLocaleString()} د.ع
                  </span>
                  <span className="text-xs text-gray-500">
                    ({budgetConsumptionPercentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${budgetConsumptionPercentage}%`,
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  الميزانية المتبقية
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900">
                    {financialData.remainingBudget.toLocaleString()} د.ع
                  </span>
                  <span className="text-xs text-gray-500">
                    ({100 - budgetConsumptionPercentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${100 - budgetConsumptionPercentage}%`,
                    backgroundColor: "rgba(75, 192, 192, 0.7)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <BarChartComponent
          data={financialData.monthlyExpenses}
          title="المصروفات الشهرية"
          labelKey="month"
          valueKey="amount"
        />
      </div>

      {/* تحليل المصروفات حسب الفئة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            تحليل المصروفات حسب الفئة
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

        <PieChartComponent
          data={financialData.expensesByCategory}
          title="توزيع المصروفات حسب الفئة"
        />
      </div>

      {/* تحليل الإيرادات حسب المصدر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChartComponent
          data={financialData.revenueBySource}
          title="الإيرادات حسب المصدر"
          labelKey="source"
          valueKey="amount"
          colors={["rgba(75, 192, 192, 0.7)", "rgba(75, 192, 192, 1)"]}
        />

        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            تحليل الإيرادات حسب المصدر
          </h3>
          <div className="space-y-4">
            {financialData.revenueBySource.map(
              (source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {source.source}
                    </span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900">
                        {source.amount.toLocaleString()} د.ع
                      </span>
                      <span className="text-xs text-gray-500">
                        ({source.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ 
                        width: `${source.percentage}%`,
                        backgroundColor: 
                          index % 7 === 0
                            ? 'rgba(75, 192, 192, 0.7)'
                            : index % 7 === 1
                            ? 'rgba(54, 162, 235, 0.7)'
                            : index % 7 === 2
                            ? 'rgba(255, 206, 86, 0.7)'
                            : index % 7 === 3
                            ? 'rgba(153, 102, 255, 0.7)'
                            : index % 7 === 4
                            ? 'rgba(255, 159, 64, 0.7)'
                            : index % 7 === 5
                            ? 'rgba(255, 99, 132, 0.7)'
                            : 'rgba(199, 199, 199, 0.7)'
                      }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsTab;