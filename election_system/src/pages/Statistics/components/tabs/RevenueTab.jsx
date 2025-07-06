import React from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import StatCard from "../StatCard";
import BarChartComponent from "../charts/BarChartComponent";

const RevenueTab = ({ data }) => {
  // تعيين البيانات المالية
  const financialData = data;
  return (
    <>
      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="إجمالي الإيرادات"
          value={`${financialData.totalRevenue.toLocaleString()} د.ع`}
          icon={TrendingUp}
          trend={3.8}
          color="bg-green-500"
        />
        <StatCard
          title="إجمالي المصروفات"
          value={`${financialData.totalExpenses.toLocaleString()} د.ع`}
          icon={TrendingDown}
          trend={-2.4}
          color="bg-red-500"
        />
        <StatCard
          title="عدد المعاملات"
          value={financialData.recentTransactions.length}
          icon={Calendar}
          color="bg-blue-500"
        />
      </div>

      {/* تفاصيل الإيرادات حسب المصدر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            تفاصيل الإيرادات حسب المصدر
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المصدر
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النسبة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {financialData.revenueBySource.map((source, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {source.source}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {source.amount.toLocaleString()} د.ع
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {source.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <BarChartComponent
          data={financialData.revenueBySource}
          title="الإيرادات حسب المصدر"
          labelKey="source"
          valueKey="amount"
          colors={["rgba(75, 192, 192, 0.7)", "rgba(75, 192, 192, 1)"]}
        />
      </div>

      {/* المصروفات الشهرية */}
      <div className="mb-6">
        <BarChartComponent
          data={financialData.monthlyExpenses}
          title="المصروفات الشهرية"
          labelKey="month"
          valueKey="amount"
          colors={["rgba(255, 99, 132, 0.7)", "rgba(255, 99, 132, 1)"]}
        />
      </div>

      {/* تحليل الإيرادات والمصروفات */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          تحليل الإيرادات والمصروفات
        </h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                إجمالي الإيرادات
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {financialData.totalRevenue.toLocaleString()} د.ع
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: "100%",
                  backgroundColor: "rgba(75, 192, 192, 0.7)",
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                إجمالي المصروفات
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {financialData.totalExpenses.toLocaleString()} د.ع
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(financialData.totalExpenses / financialData.totalRevenue) * 100}%`,
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                الرصيد المتبقي
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {(financialData.totalRevenue - financialData.totalExpenses).toLocaleString()} د.ع
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${((financialData.totalRevenue - financialData.totalExpenses) / financialData.totalRevenue) * 100}%`,
                  backgroundColor: "rgba(54, 162, 235, 0.7)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* معاملات الإيرادات */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          معاملات الإيرادات
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوصف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.recentTransactions
                .filter((transaction) => transaction.type === "income")
                .map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                      +{transaction.amount.toLocaleString()} د.ع
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("ar-IQ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        مكتمل
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RevenueTab;