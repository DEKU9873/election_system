import React, { useState } from "react";
import {
  Calendar,
  Filter,
  FileText,
  Download,
} from "lucide-react";
import Sidebar from "../../Components/Uitily/Sidebar";

// استيراد المكونات
import StatCard from "./components/StatCard";
import BudgetReport from "./components/BudgetReport";
import RecentTransactions from "./components/RecentTransactions";
import BarChartComponent from "./components/charts/BarChartComponent";
import PieChartComponent from "./components/charts/PieChartComponent";

// استيراد التبويبات
import OverviewTab from "./components/tabs/OverviewTab";
import ExpensesTab from "./components/tabs/ExpensesTab";
import BudgetTab from "./components/tabs/BudgetTab";
import RevenueTab from "./components/tabs/RevenueTab";
import AnalyticsTab from "./components/tabs/AnalyticsTab";
import TransactionsTab from "./components/tabs/TransactionsTab";

// استيراد البيانات
import { processFinancialData } from "./data/financialData";

// البيانات المالية المعالجة
const mockFinancialData = processFinancialData();

const FinancialStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [activeTab, setActiveTab] = useState("overview");
  const [transactionFilter, setTransactionFilter] = useState("all"); // 'all', 'income', 'expense'

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-full pt-4">
        <div className="p-6">
          {/* عنوان الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                الإحصائيات المالية
              </h1>
              <p className="text-sm text-gray-600">
                تحليل شامل للبيانات المالية للنظام الانتخابي
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="monthly">شهري</option>
                  <option value="quarterly">ربع سنوي</option>
                  <option value="yearly">سنوي</option>
                </select>
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button className="flex items-center space-x-1 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-300">
                  <FileText size={16} />
                  <span>تصدير التقرير</span>
                </button>
                <button className="flex items-center space-x-1 space-x-reverse bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-300">
                  <Download size={16} />
                  <span>تصدير كملف Excel</span>
                </button>
              </div>
            </div>
          </div>

          {/* تبويبات التنقل */}
          <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "expenses"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              المصروفات
            </button>
            <button
              onClick={() => setActiveTab("budget")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "budget"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              الميزانية
            </button>
            <button
              onClick={() => setActiveTab("revenue")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "revenue"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              الإيرادات
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "analytics"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              التحليلات
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === "transactions"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              المعاملات
            </button>
          </div>

          {/* محتوى التبويب: نظرة عامة */}
          {activeTab === "overview" && (
            <OverviewTab data={mockFinancialData} />
          )}

          {/* محتوى التبويب: المصروفات */}
          {activeTab === "expenses" && (
            <ExpensesTab data={mockFinancialData} />
          )}

          {/* محتوى التبويب: الميزانية */}
          {activeTab === "budget" && (
            <BudgetTab data={mockFinancialData} />
          )}


          {/* محتوى التبويب: المعاملات */}
          {activeTab === "transactions" && (
            <TransactionsTab data={mockFinancialData} />
          )}

          {/* تبويب الإيرادات */}
          {activeTab === "revenue" && (
            <RevenueTab data={mockFinancialData} />
          )}

          {/* تبويب التحليلات */}
          {activeTab === "analytics" && (
            <AnalyticsTab data={mockFinancialData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialStatistics;
