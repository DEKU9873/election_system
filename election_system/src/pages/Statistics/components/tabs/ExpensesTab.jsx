import React from "react";
import { DollarSign, TrendingDown, Calendar, Users } from "lucide-react";
import StatCard from "../StatCard";
import PieChartComponent from "../charts/PieChartComponent";
import BarChartComponent from "../charts/BarChartComponent";

const ExpensesTab = ({ data }) => {
  // تعيين البيانات المالية
  const financialData = data;
  return (
    <>
      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="إجمالي المصروفات"
          value={`${financialData.totalExpenses.toLocaleString()} د.ع`}
          icon={DollarSign}
          trend={-2.4}
          color="bg-red-500"
        />
        <StatCard
          title="متوسط المصروفات الشهرية"
          value={`${(financialData.totalExpenses / 12).toLocaleString()} د.ع`}
          icon={Calendar}
          color="bg-amber-500"
        />
        <StatCard
          title="أعلى فئة مصروفات"
          value={financialData.expensesByCategory[0]?.category || "غير متوفر"}
          subValue={`${financialData.expensesByCategory[0]?.amount.toLocaleString() || 0} د.ع`}
          icon={TrendingDown}
          color="bg-purple-500"
        />
        <StatCard
          title="متوسط تكلفة الناخب"
          value="1,250 د.ع"
          icon={Users}
          color="bg-blue-600"
        />
      </div>

      {/* المصروفات حسب الفئة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            المصروفات حسب الفئة
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
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
                {financialData.expensesByCategory.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {category.amount.toLocaleString()} د.ع
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {category.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PieChartComponent
          data={financialData.expensesByCategory}
          title="توزيع المصروفات حسب الفئة"
        />
      </div>

      {/* المصروفات حسب المحافظة */}
      <div className="mb-6">
        <BarChartComponent
          data={financialData.expensesByGovernorate}
          title="المصروفات حسب المحافظة"
          labelKey="governorate"
          valueKey="amount"
        />
      </div>

      {/* معاملات المصروفات */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          معاملات المصروفات
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
                  الفئة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.recentTransactions
                .filter((transaction) => transaction.type === "expense")
                .map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                      -{transaction.amount.toLocaleString()} د.ع
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("ar-IQ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {transaction.category}
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

export default ExpensesTab;