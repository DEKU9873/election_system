import React from "react";

// مكون لعرض المعاملات الأخيرة
const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white  rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        المعاملات الأخيرة
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
                النوع
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;