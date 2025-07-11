import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// وظيفة تصدير البيانات إلى ملف Excel
const exportToExcel = (financialData, callbacks) => {
  const { setIsExporting, setExportType, setExportSuccess, setExportError } = callbacks;
  
  if (!financialData) return;
  
  setIsExporting(true);
  setExportType("Excel");
  setExportSuccess(false);
  setExportError(false);

  try {
    // إنشاء مصفوفات البيانات للتصدير
    const overviewData = [
      ["الإحصائيات المالية - نظرة عامة"],
      ["الميزانية الإجمالية", financialData.totalBudget],
      ["إجمالي المصروفات", financialData.totalExpenses],
      ["الميزانية المتبقية", financialData.remainingBudget],
      ["نسبة الإنفاق", `${financialData.percentSpent}%`],
      ["إجمالي الإيرادات", financialData.totalRevenue],
    ];

    const expensesData = [
      ["المصروفات حسب الفئة"],
      ["النسبة المئوية", "المبلغ", "الفئة"],
      ...financialData.expensesByCategory.map((item) => [
        item.category,
        item.amount,
        `${item.percentage}%`,
      ]),
    ];

    const revenueData = [
      ["الإيرادات حسب المصدر"],
      ["النسبة المئوية", "المبلغ", "المصدر"],
      ...financialData.revenueBySource.map((item) => [
        item.source,
        item.amount,
        `${item.percentage}%`,
      ]),
    ];

    const monthlyExpensesData = [
      ["المصروفات الشهرية"],
      ["المبلغ", "الشهر"],
      ...financialData.monthlyExpenses.map((item) => [
        item.month,
        item.amount,
      ]),
    ];

    const transactionsData = [
      ["المعاملات الأخيرة"],
      ["الفئة", "النوع", "التاريخ", "المبلغ", "الوصف"],
      ...financialData.recentTransactions.map((item) => [
        item.description,
        item.amount,
        new Date(item.date).toLocaleDateString("ar-SA"),
        item.type === "income" ? "إيرادات" : "مصروفات",
        item.category,
      ]),
    ];

    // إنشاء مصنف Excel جديد
    const wb = XLSX.utils.book_new();

    // وظيفة مساعدة لإنشاء ورقة عمل مع ضبط الاتجاه من اليمين إلى اليسار
    const createRTLSheet = (data) => {
      const sheet = XLSX.utils.aoa_to_sheet(data);

      // إضافة خصائص RTL للورقة
      if (!sheet["!cols"]) sheet["!cols"] = [];
      if (!sheet["!rows"]) sheet["!rows"] = [];

      // ضبط عرض الأعمدة ليكون مناسباً
      sheet["!cols"] = data[0].map(() => ({ wch: 20 })); // عرض كل عمود 20 حرف

      // إضافة خاصية الاتجاه من اليمين إلى اليسار
      sheet["!rightToLeft"] = true;

      return sheet;
    };

    // إضافة أوراق العمل مع ضبط الاتجاه من اليمين إلى اليسار
    XLSX.utils.book_append_sheet(
      wb,
      createRTLSheet(overviewData),
      "نظرة عامة"
    );
    XLSX.utils.book_append_sheet(
      wb,
      createRTLSheet(expensesData),
      "المصروفات"
    );
    XLSX.utils.book_append_sheet(
      wb,
      createRTLSheet(revenueData),
      "الإيرادات"
    );
    XLSX.utils.book_append_sheet(
      wb,
      createRTLSheet(monthlyExpensesData),
      "المصروفات الشهرية"
    );
    XLSX.utils.book_append_sheet(
      wb,
      createRTLSheet(transactionsData),
      "المعاملات"
    );

    // تحويل المصنف إلى ملف Excel وتنزيله
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      data,
      `الإحصائيات_المالية_${new Date().toLocaleDateString("ar-SA")}.xlsx`
    );
    setIsExporting(false);
    setExportSuccess(true);

    // إخفاء رسالة النجاح بعد 3 ثوان
    setTimeout(() => {
      setExportSuccess(false);
    }, 3000);
  } catch (error) {
    console.error("خطأ في تصدير ملف Excel:", error);
    setExportError(true);
    // إخفاء رسالة الخطأ بعد 3 ثوان
    setTimeout(() => {
      setExportError(false);
    }, 3000);
  } finally {
    setIsExporting(false);
  }
};

export default exportToExcel;