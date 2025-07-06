import React, { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import StatCard from "../StatCard";

const TransactionsTab = ({ data }) => {
  // تعيين البيانات المالية
  const financialData = data;
  
  const [filter, setFilter] = useState("all");

  // تصفية المعاملات حسب النوع المحدد
  const filteredTransactions = financialData.recentTransactions.filter(
    (transaction) => {
      if (filter === "all") return true;
      return transaction.type === filter;
    }
  );

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

      {/* المعاملات المالية */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            المعاملات المالية
          </h3>
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${filter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter("income")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${filter === "income" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
            >
              الإيرادات
            </button>
            <button
              onClick={() => setFilter("expense")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${filter === "expense" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
            >
              المصروفات
            </button>
          </div>
        </div>
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
                  النوع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {transaction.amount.toLocaleString()} د.ع
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString("ar-IQ")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "income" ? "إيراد" : "مصروف"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
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

export default TransactionsTab;