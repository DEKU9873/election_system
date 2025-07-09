import React, { useState, useEffect } from "react";
import { Calendar, Filter, FileText, Download } from "lucide-react";
// استيراد التبويبات
import OverviewTab from "./components/tabs/OverviewTab";
import ExpensesTab from "./components/tabs/ExpensesTab";
import RevenueTab from "./components/tabs/RevenueTab";
import AnalyticsTab from "./components/tabs/AnalyticsTab";
import TransactionsTab from "./components/tabs/TransactionsTab";

// استيراد الهوكات
import GetAllBudgetsHook from "../../hook/finance/get-all-budgets-hook";
import GetAllExpenseHook from "../../hook/finance/get-all-expense-hook";
import GetAllFinanceCapitalsHook from "../../hook/finance/get-all-finance-capitals-hook";

// لا نستخدم بيانات ثابتة

const FinancialStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [activeTab, setActiveTab] = useState("overview");
  const [transactionFilter, setTransactionFilter] = useState("all"); // 'all', 'income', 'expense'

  // استخدام الهوكات لجلب البيانات
  const [budgets, budgetsLoading] = GetAllBudgetsHook();
  const [expenses, expensesLoading] = GetAllExpenseHook();
  const [financeCapitals, financeCapitalsLoading] = GetAllFinanceCapitalsHook();

  console.log("Budgets:", budgets);
  console.log("Expenses:", expenses);
  console.log("Finance Capitals:", financeCapitals);

  // حالة البيانات المالية المعالجة
  const [financialData, setFinancialData] = useState(null);

  // معالجة البيانات الديناميكية
  useEffect(() => {
    // تحويل البيانات إلى مصفوفات إذا لم تكن كذلك
    const budgetsArray = Array.isArray(budgets)
      ? budgets
      : budgets
      ? [budgets]
      : [];
    const expensesArray = Array.isArray(expenses)
      ? expenses
      : expenses
      ? [expenses]
      : [];
    const financeCapitalsArray = Array.isArray(financeCapitals)
      ? financeCapitals
      : financeCapitals
      ? [financeCapitals]
      : [];

    console.log("Budgets Array:", budgetsArray);
    console.log("Expenses Array:", expensesArray);
    console.log("Finance Capitals Array:", financeCapitalsArray);

    if (
      budgetsArray.length > 0 &&
      expensesArray.length >= 0 &&
      financeCapitalsArray.length >= 0
    ) {
      const processedData = processFinancialData(
        budgetsArray,
        expensesArray,
        financeCapitalsArray
      );
      setFinancialData(processedData);
    }
  }, [budgets, expenses, financeCapitals]);

  // وظيفة معالجة البيانات المالية
  const processFinancialData = (budgets, expenses, financeCapitals) => {
    // التحقق من وجود البيانات
    if (!budgets || !Array.isArray(budgets) || budgets.length === 0) {
      console.log("بيانات الميزانية غير كافية أو غير صالحة");
      return null;
    }

    // استخدام أول ميزانية (يمكن تعديل هذا حسب المتطلبات)
    const budget = budgets[0];
    console.log("Budget being used:", budget);

    // حساب إجمالي الإيرادات (من رؤوس الأموال)
    const totalRevenue =
      Array.isArray(financeCapitals) && financeCapitals.length > 0
        ? financeCapitals.reduce(
            (sum, item) => sum + (Number(item.amount) || 0),
            0
          )
        : 0;

    console.log("Total Revenue:", totalRevenue);

    // تجميع المصروفات حسب العنوان (كفئات)
    const expensesByCategory = [];
    const expenseTitles = {};

    if (Array.isArray(expenses) && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (!expense || typeof expense !== "object") {
          console.log("Invalid expense object:", expense);
          return;
        }

        const title = expense.title || "مصروفات أخرى";
        const amount = Number(expense.amount) || 0;

        if (!expenseTitles[title]) {
          expenseTitles[title] = 0;
        }
        expenseTitles[title] += amount;
      });
    } else {
      console.log("No expenses data available");
    }

    console.log("Expense Titles:", expenseTitles);
    // تحويل المصروفات المجمعة إلى مصفوفة
    for (const [title, amount] of Object.entries(expenseTitles)) {
      const totalExpenses = Number(budget.total_expenses) || 0;
      // التأكد من أن النسبة المئوية لا تتجاوز 100%
      const percentage =
        totalExpenses > 0
          ? Math.min(100, Math.round((amount / totalExpenses) * 100))
          : 0;
      expensesByCategory.push({
        category: title,
        amount,
        percentage,
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
      });
    }

    console.log("Expenses By Category:", expensesByCategory);

    // ترتيب المصروفات حسب المبلغ تنازلياً
    expensesByCategory.sort((a, b) => b.amount - a.amount);

    // إنشاء بيانات الإيرادات حسب المصدر (من البيانات الديناميكية)
    // نفترض أن كل رأس مال هو مصدر إيراد منفصل
    const revenueBySource = [];

    if (Array.isArray(financeCapitals) && financeCapitals.length > 0) {
      financeCapitals.forEach((capital) => {
        if (!capital || typeof capital !== "object") {
          console.log("Invalid capital object:", capital);
          return;
        }

        const source = capital.title || "مصدر إيراد";
        const amount = Number(capital.amount) || 0;
        // التأكد من أن النسبة المئوية لا تتجاوز 100%
        const percentage =
          totalRevenue > 0
            ? Math.min(100, Math.round((amount / totalRevenue) * 100))
            : 0;

        revenueBySource.push({
          source,
          amount,
          percentage,
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
        });
      });
    } else {
      console.log("No finance capitals data available");
    }

    console.log("Revenue By Source:", revenueBySource);

    // تحويل المصروفات إلى معاملات
    const expenseTransactions = [];

    if (Array.isArray(expenses) && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (!expense || typeof expense !== "object") {
          return;
        }

        expenseTransactions.push({
          id: expense.id || `exp-${Math.random().toString(36).substr(2, 9)}`,
          description: expense.title || "مصروفات",
          amount: Number(expense.amount) || 0,
          date: expense.createdAt || new Date().toISOString(),
          type: "expense",
          category: expense.description || "مصروفات متنوعة",
        });
      });
    }

    console.log("Expense Transactions:", expenseTransactions);

    // تحويل رؤوس الأموال إلى معاملات
    const capitalTransactions = [];

    if (Array.isArray(financeCapitals) && financeCapitals.length > 0) {
      financeCapitals.forEach((capital) => {
        if (!capital || typeof capital !== "object") {
          return;
        }

        capitalTransactions.push({
          id: capital.id || `cap-${Math.random().toString(36).substr(2, 9)}`,
          description: capital.title || "إيرادات",
          amount: Number(capital.amount) || 0,
          date: capital.createdAt || new Date().toISOString(),
          type: "income",
          category: capital.description || "إيرادات متنوعة",
        });
      });
    }

    console.log("Capital Transactions:", capitalTransactions);

    // دمج معاملات الإيرادات والمصروفات
    const recentTransactions = [
      ...capitalTransactions,
      ...expenseTransactions,
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("Recent Transactions:", recentTransactions);

    // إعداد بيانات المصروفات الشهرية (من البيانات الديناميكية)
    const months = [
      "كانون الثاني",
      "شباط",
      "آذار",
      "نيسان",
      "أيار",
      "حزيران",
      "تموز",
      "آب",
      "أيلول",
      "تشرين الأول",
      "تشرين الثاني",
      "كانون الأول",
    ];

    // تجميع المصروفات حسب الشهر
    const expensesByMonth = {};
    months.forEach((month) => {
      expensesByMonth[month] = 0;
    });

    // توزيع المصروفات على الأشهر بناءً على تاريخ إنشائها
    if (Array.isArray(expenses) && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (!expense || !expense.createdAt) {
          return;
        }

        try {
          const date = new Date(expense.createdAt);
          if (isNaN(date.getTime())) {
            console.log("Invalid date:", expense.createdAt);
            return;
          }

          const monthIndex = date.getMonth();
          const monthName = months[monthIndex];

          if (monthName) {
            expensesByMonth[monthName] += Number(expense.amount) || 0;
          }
        } catch (error) {
          console.log("Error processing expense date:", error);
        }
      });
    }

    console.log("Expenses By Month:", expensesByMonth);

    // تحويل البيانات إلى المصفوفة المطلوبة
    const monthlyExpenses = months.map((month) => ({
      month,
      amount: expensesByMonth[month] || 0,
    }));

    return {
      totalBudget: Number(budget.total_capital) || 0,
      totalExpenses: Number(budget.total_expenses) || 0,
      remainingBudget: Number(budget.remaining_balance) || 0,
      percentSpent:
        budget.total_capital > 0
          ? Math.round(
              (Number(budget.total_expenses) / Number(budget.total_capital)) *
                100
            )
          : 0,
      totalRevenue,
      expensesByCategory,
      revenueBySource,
      recentTransactions,
      monthlyExpenses,
    };
  };

  // التحقق من حالة التحميل
  const isLoading = budgetsLoading || expensesLoading || financeCapitalsLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
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

          {/* عرض حالة التحميل */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mr-3 text-gray-600">جاري تحميل البيانات...</p>
            </div>
          ) : !financialData ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">لا توجد بيانات متاحة</p>
            </div>
          ) : (
            <>
              {/* محتوى التبويب: نظرة عامة */}
              {activeTab === "overview" && <OverviewTab data={financialData} />}

              {/* محتوى التبويب: المصروفات */}
              {activeTab === "expenses" && <ExpensesTab data={financialData} />}

              {/* محتوى التبويب: الميزانية */}
              {activeTab === "budget" && <BudgetTab data={financialData} />}

              {/* محتوى التبويب: المعاملات */}
              {activeTab === "transactions" && (
                <TransactionsTab data={financialData} />
              )}

              {/* تبويب الإيرادات */}
              {activeTab === "revenue" && <RevenueTab data={financialData} />}

              {/* تبويب التحليلات */}
              {activeTab === "analytics" && (
                <AnalyticsTab data={financialData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialStatistics;
