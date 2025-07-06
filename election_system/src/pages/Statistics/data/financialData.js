// بيانات وهمية للإحصائيات المالية

// بيانات ملخص الميزانية
export const budgetSummaryAPI = {
  totalBudget: 1500000000,
  totalExpenses: 950000000,
  remainingBudget: 550000000,
  percentSpent: 63.33,
};

// بيانات المصروفات
export const expensesAPI = {
  byCategory: [
    { category: "تجهيزات مراكز الاقتراع", amount: 320000000 },
    { category: "رواتب موظفي الانتخابات", amount: 280000000 },
    { category: "تكنولوجيا المعلومات", amount: 150000000 },
    { category: "الأمن والحماية", amount: 90000000 },
    { category: "الحملات التوعوية", amount: 60000000 },
    { category: "النقل واللوجستيات", amount: 30000000 },
    { category: "مصروفات أخرى", amount: 20000000 },
  ],
  byGovernorate: [
    { governorate: "بغداد", amount: 350000000 },
    { governorate: "البصرة", amount: 120000000 },
    { governorate: "نينوى", amount: 100000000 },
    { governorate: "أربيل", amount: 90000000 },
    { governorate: "السليمانية", amount: 85000000 },
    { governorate: "النجف", amount: 70000000 },
    { governorate: "كربلاء", amount: 65000000 },
    { governorate: "محافظات أخرى", amount: 70000000 },
  ],
  monthly: [
    { month: "كانون الثاني", amount: 50000000 },
    { month: "شباط", amount: 65000000 },
    { month: "آذار", amount: 80000000 },
    { month: "نيسان", amount: 95000000 },
    { month: "أيار", amount: 110000000 },
    { month: "حزيران", amount: 120000000 },
    { month: "تموز", amount: 105000000 },
    { month: "آب", amount: 90000000 },
    { month: "أيلول", amount: 75000000 },
    { month: "تشرين الأول", amount: 60000000 },
    { month: "تشرين الثاني", amount: 55000000 },
    { month: "كانون الأول", amount: 45000000 },
  ],
};

// بيانات الإيرادات
export const revenueAPI = {
  total: 1200000000,
  bySource: [
    { source: "الميزانية الحكومية", amount: 900000000 },
    { source: "المساعدات الدولية", amount: 200000000 },
    { source: "رسوم تسجيل المرشحين", amount: 80000000 },
    { source: "مصادر أخرى", amount: 20000000 },
  ],
  transactions: [
    {
      id: 1,
      description: "دفعة من الميزانية الحكومية",
      amount: 500000000,
      date: "2023-01-15",
      type: "income",
      category: "الميزانية الحكومية",
    },
    {
      id: 2,
      description: "دفعة من الميزانية الحكومية",
      amount: 400000000,
      date: "2023-04-10",
      type: "income",
      category: "الميزانية الحكومية",
    },
    {
      id: 3,
      description: "مساعدات من الأمم المتحدة",
      amount: 150000000,
      date: "2023-02-22",
      type: "income",
      category: "المساعدات الدولية",
    },
    {
      id: 4,
      description: "مساعدات من الاتحاد الأوروبي",
      amount: 50000000,
      date: "2023-03-15",
      type: "income",
      category: "المساعدات الدولية",
    },
    {
      id: 5,
      description: "رسوم تسجيل المرشحين",
      amount: 80000000,
      date: "2023-05-20",
      type: "income",
      category: "رسوم تسجيل المرشحين",
    },
    {
      id: 6,
      description: "إيرادات متنوعة",
      amount: 20000000,
      date: "2023-06-05",
      type: "income",
      category: "مصادر أخرى",
    },
  ],
};

// معاملات المصروفات
export const expenseTransactionsAPI = [
  {
    id: 101,
    description: "شراء أجهزة التصويت الإلكتروني",
    amount: 200000000,
    date: "2023-02-10",
    type: "expense",
    category: "تكنولوجيا المعلومات",
  },
  {
    id: 102,
    description: "رواتب موظفي مراكز الاقتراع",
    amount: 150000000,
    date: "2023-03-25",
    type: "expense",
    category: "رواتب موظفي الانتخابات",
  },
  {
    id: 103,
    description: "تجهيز مراكز الاقتراع",
    amount: 120000000,
    date: "2023-04-15",
    type: "expense",
    category: "تجهيزات مراكز الاقتراع",
  },
  {
    id: 104,
    description: "حملات توعية الناخبين",
    amount: 60000000,
    date: "2023-05-05",
    type: "expense",
    category: "الحملات التوعوية",
  },
  {
    id: 105,
    description: "توفير الأمن لمراكز الاقتراع",
    amount: 90000000,
    date: "2023-06-20",
    type: "expense",
    category: "الأمن والحماية",
  },
  {
    id: 106,
    description: "نقل المعدات والموظفين",
    amount: 30000000,
    date: "2023-07-10",
    type: "expense",
    category: "النقل واللوجستيات",
  },
  {
    id: 107,
    description: "تجهيز مراكز الاقتراع الإضافية",
    amount: 200000000,
    date: "2023-08-05",
    type: "expense",
    category: "تجهيزات مراكز الاقتراع",
  },
  {
    id: 108,
    description: "رواتب إضافية للموظفين",
    amount: 130000000,
    date: "2023-09-15",
    type: "expense",
    category: "رواتب موظفي الانتخابات",
  },
  {
    id: 109,
    description: "مصروفات متنوعة",
    amount: 20000000,
    date: "2023-10-10",
    type: "expense",
    category: "مصروفات أخرى",
  },
];

// معالجة البيانات المالية
export const processFinancialData = () => {
  // حساب إجمالي الإيرادات
  const totalRevenue = revenueAPI.total;

  // حساب إجمالي المصروفات حسب الفئة
  const expensesByCategory = expensesAPI.byCategory.map((category) => {
    const percentage = Math.round(
      (category.amount / budgetSummaryAPI.totalExpenses) * 100
    );
    return {
      ...category,
      percentage,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
    };
  });

  // حساب المصروفات حسب المحافظة
  const expensesByGovernorate = expensesAPI.byGovernorate.map((governorate) => {
    const percentage = Math.round(
      (governorate.amount / budgetSummaryAPI.totalExpenses) * 100
    );
    return {
      ...governorate,
      percentage,
    };
  });

  // حساب الإيرادات حسب المصدر
  const revenueBySource = revenueAPI.bySource.map((source) => {
    const percentage = Math.round((source.amount / totalRevenue) * 100);
    return {
      ...source,
      percentage,
    };
  });

  // دمج معاملات الإيرادات والمصروفات
  const recentTransactions = [
    ...revenueAPI.transactions,
    ...expenseTransactionsAPI,
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // إعداد بيانات المصروفات الشهرية
  const monthlyExpenses = expensesAPI.monthly;

  return {
    totalBudget: budgetSummaryAPI.totalBudget,
    totalExpenses: budgetSummaryAPI.totalExpenses,
    remainingBudget: budgetSummaryAPI.remainingBudget,
    percentSpent: budgetSummaryAPI.percentSpent,
    totalRevenue,
    expensesByCategory,
    expensesByGovernorate,
    revenueBySource,
    recentTransactions,
    monthlyExpenses,
  };
};