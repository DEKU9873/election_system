import React, { useState, useEffect } from 'react'
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  Filter, 
  FileText ,
  Download, 
  Activity
} from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'
import Sidebar from '../../Components/Uitily/Sidebar'

// تسجيل مكونات Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

// API لبيانات ملخص الميزانية (الميزانية الكلية، إجمالي المصروفات، المتبقي)
const budgetSummaryAPI = {
  totalBudget: 1500000,
  totalExpenses: 1250000,
  remainingBudget: 250000,
  lastUpdated: "2023-12-15"
}

// API لبيانات المصروفات (كل عملية صرف)
const expensesAPI = [
  { id: 1, description: "شراء معدات اقتراع", amount: 45000, date: "2023-07-15", category: "المعدات والتقنيات", governorate: "بغداد", status: "مكتمل" },
  { id: 2, description: "رواتب موظفين", amount: 85000, date: "2023-07-05", category: "رواتب الموظفين", governorate: "بغداد", status: "مكتمل" },
  { id: 3, description: "تكاليف تدريب", amount: 25000, date: "2023-07-01", category: "التدريب", governorate: "البصرة", status: "مكتمل" },
  { id: 4, description: "إيجار مراكز اقتراع", amount: 30000, date: "2023-06-20", category: "مراكز الاقتراع", governorate: "نينوى", status: "مكتمل" },
  { id: 5, description: "حملة إعلامية", amount: 40000, date: "2023-06-15", category: "الحملات الإعلامية", governorate: "أربيل", status: "مكتمل" },
  { id: 6, description: "صيانة أجهزة", amount: 15000, date: "2023-06-10", category: "المعدات والتقنيات", governorate: "النجف", status: "مكتمل" },
  { id: 7, description: "مستلزمات مكتبية", amount: 10000, date: "2023-06-05", category: "مراكز الاقتراع", governorate: "كركوك", status: "مكتمل" },
  { id: 8, description: "تكاليف نقل", amount: 20000, date: "2023-06-01", category: "مراكز الاقتراع", governorate: "الأنبار", status: "مكتمل" },
];

// API لبيانات الإيرادات (كل عملية حصول على أموال)
const revenueAPI = [
  { id: 1, description: "تمويل حكومي", amount: 200000, date: "2023-07-10", source: "الحكومة المركزية", status: "مستلم" },
  { id: 2, description: "تمويل دولي", amount: 150000, date: "2023-06-28", source: "منظمات دولية", status: "مستلم" },
  { id: 3, description: "تمويل حكومي إضافي", amount: 100000, date: "2023-06-15", source: "الحكومة المركزية", status: "مستلم" },
  { id: 4, description: "تبرعات", amount: 50000, date: "2023-06-01", source: "مصادر أخرى", status: "مستلم" },
  { id: 5, description: "تمويل من منظمة الأمم المتحدة", amount: 120000, date: "2023-05-20", source: "منظمات دولية", status: "مستلم" },
];

// معالجة البيانات من APIs لاستخدامها في الرسوم البيانية والإحصائيات
const processFinancialData = () => {
  // حساب إجمالي الإيرادات
  const totalRevenue = revenueAPI.reduce((sum, item) => sum + item.amount, 0);
  
  // تجميع المصروفات حسب الفئة
  const expensesByCategory = [];
  const categories = {};
  const categoryColors = {
    "رواتب الموظفين": "#4F46E5",
    "مراكز الاقتراع": "#0EA5E9",
    "المعدات والتقنيات": "#10B981",
    "الحملات الإعلامية": "#F59E0B",
    "التدريب": "#6366F1"
  };
  
  expensesAPI.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = {
        category: expense.category,
        amount: 0,
        color: categoryColors[expense.category] || "#6B7280"
      };
    }
    categories[expense.category].amount += expense.amount;
  });
  
  for (const key in categories) {
    expensesByCategory.push(categories[key]);
  }
  
  // تجميع المصروفات حسب المحافظة
  const governorateExpenses = [];
  const governorates = {};
  
  expensesAPI.forEach(expense => {
    if (!governorates[expense.governorate]) {
      governorates[expense.governorate] = {
        governorate: expense.governorate,
        amount: 0
      };
    }
    governorates[expense.governorate].amount += expense.amount;
  });
  
  for (const key in governorates) {
    governorateExpenses.push(governorates[key]);
  }
  
  // تجميع مصادر التمويل
  const fundingSources = [];
  const sources = {};
  
  revenueAPI.forEach(revenue => {
    if (!sources[revenue.source]) {
      sources[revenue.source] = {
        source: revenue.source,
        amount: 0
      };
    }
    sources[revenue.source].amount += revenue.amount;
  });
  
  for (const key in sources) {
    const percentage = (sources[key].amount / totalRevenue) * 100;
    fundingSources.push({
      ...sources[key],
      percentage: parseFloat(percentage.toFixed(1))
    });
  }
  
  // إنشاء المعاملات الأخيرة (مصروفات وإيرادات)
  const allTransactions = [
    ...expensesAPI.map(expense => ({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      type: 'expense'
    })),
    ...revenueAPI.map(revenue => ({
      id: revenue.id + 1000, // لتجنب تكرار المعرفات
      description: revenue.description,
      amount: revenue.amount,
      date: revenue.date,
      type: 'income'
    }))
  ];
  
  // ترتيب المعاملات حسب التاريخ (الأحدث أولاً)
  const recentTransactions = allTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  // بيانات إضافية للرسوم البيانية
  return {
    // استخدام بيانات من API ملخص الميزانية
    totalBudget: budgetSummaryAPI.totalBudget,
    totalExpenses: budgetSummaryAPI.totalExpenses,
    remainingBudget: budgetSummaryAPI.remainingBudget,
    
    // استخدام البيانات المعالجة
    expensesByCategory,
    governorateExpenses,
    fundingSources,
    recentTransactions,
    
    // بيانات إضافية للرسوم البيانية
    monthlyExpenses: [
      { month: 'يناير', amount: 120000 },
      { month: 'فبراير', amount: 150000 },
      { month: 'مارس', amount: 180000 },
      { month: 'أبريل', amount: 220000 },
      { month: 'مايو', amount: 190000 },
      { month: 'يونيو', amount: 210000 },
      { month: 'يوليو', amount: 180000 },
    ],
    voterCostByYear: [
      { year: '2019', cost: 950 },
      { year: '2020', cost: 1050 },
      { year: '2021', cost: 1150 },
      { year: '2022', cost: 1200 },
      { year: '2023', cost: 1250 },
    ],
    budgetAllocation: [
      { year: '2019', budget: 1200000 },
      { year: '2020', budget: 1300000 },
      { year: '2021', budget: 1350000 },
      { year: '2022', budget: 1450000 },
      { year: '2023', budget: 1500000 },
    ],
    electionCostComparison: [
      { election: '2019', cost: 1200000 },
      { election: '2021', cost: 1350000 },
      { election: '2023', cost: 1500000 },
    ],
    costPerVoterByGovernorate: [
      { governorate: 'بغداد', costPerVoter: 1100 },
      { governorate: 'البصرة', costPerVoter: 1250 },
      { governorate: 'نينوى', costPerVoter: 1350 },
      { governorate: 'أربيل', costPerVoter: 1400 },
      { governorate: 'النجف', costPerVoter: 1200 },
      { governorate: 'كركوك', costPerVoter: 1300 },
      { governorate: 'الأنبار', costPerVoter: 1450 },
    ],
    monthlyBudgetVariance: [
      { month: 'يناير', planned: 130000, actual: 120000, variance: -10000 },
      { month: 'فبراير', planned: 140000, actual: 150000, variance: 10000 },
      { month: 'مارس', planned: 170000, actual: 180000, variance: 10000 },
      { month: 'أبريل', planned: 200000, actual: 220000, variance: 20000 },
      { month: 'مايو', planned: 200000, actual: 190000, variance: -10000 },
      { month: 'يونيو', planned: 200000, actual: 210000, variance: 10000 },
      { month: 'يوليو', planned: 190000, actual: 180000, variance: -10000 },
    ],
    // إضافة إجمالي الإيرادات
    totalRevenue
  };
};

// استدعاء دالة معالجة البيانات
const mockFinancialData = processFinancialData()

// مكون لعرض البطاقات الإحصائية
const StatCard = ({ title, value, icon, trend, color }) => {
  const Icon = icon
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-xs font-medium mr-1">{Math.abs(trend)}%</span>
              <span className="text-xs text-gray-500">من الشهر الماضي</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  )
}

// مكون لعرض الرسم البياني الدائري
const PieChartComponent = ({ data }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
          },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += new Intl.NumberFormat('ar-IQ').format(context.parsed) + ' د.ع';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">توزيع المصروفات حسب الفئة</h3>
      <div style={{ height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}

// مكون لعرض الرسم البياني الشريطي
const BarChartComponent = ({ data, title, valueKey = 'amount', labelKey = 'month', valueSuffix = 'د.ع', colors = ['#3b82f6', '#2563eb'] }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item[labelKey] || item.governorate || item.month || item.year || item.election || item.source),
    datasets: [
      {
        data: data.map(item => item[valueKey]),
        backgroundColor: colors[0],
        hoverBackgroundColor: colors[1],
        borderColor: colors[0],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('ar-IQ').format(context.parsed.y) + ' ' + valueSuffix;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('ar-IQ').format(value) + ' ' + valueSuffix;
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

// مكون لعرض المعاملات الأخيرة
const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">المعاملات الأخيرة</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toLocaleString()} د.ع
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('ar-IQ')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {transaction.type === 'income' ? 'إيراد' : 'مصروف'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// مكون لعرض تقرير الميزانية
const BudgetReport = ({ totalBudget, totalExpenses, remainingBudget }) => {
  const percentSpent = (totalExpenses / totalBudget) * 100
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">تقرير الميزانية</h3>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">الميزانية المستهلكة</span>
        <span className="text-sm font-medium text-gray-900">{percentSpent.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${percentSpent > 90 ? 'bg-red-500' : percentSpent > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
          style={{ width: `${percentSpent}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">الميزانية الكلية</p>
          <p className="text-lg font-bold text-gray-900">{totalBudget.toLocaleString()} د.ع</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">المصروفات</p>
          <p className="text-lg font-bold text-red-600">{totalExpenses.toLocaleString()} د.ع</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">المتبقي</p>
          <p className="text-lg font-bold text-green-600">{remainingBudget.toLocaleString()} د.ع</p>
        </div>
      </div>
    </div>
  )
}

// مكون لعرض مقارنة الميزانية الشهرية (المخطط والفعلي)
const BudgetVarianceChart = ({ data }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'المخطط',
        data: data.map(item => item.planned),
        backgroundColor: '#93c5fd', // bg-blue-300
        borderColor: '#60a5fa', // bg-blue-400
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'الفعلي',
        data: data.map(item => item.actual),
        backgroundColor: data.map(item => item.variance >= 0 ? '#10b981' : '#ef4444'), // bg-green-500 or bg-red-500
        borderColor: data.map(item => item.variance >= 0 ? '#059669' : '#dc2626'), // bg-green-600 or bg-red-600
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('ar-IQ').format(context.parsed.y) + ' د.ع';
            }
            return label;
          },
          afterBody: function(tooltipItems) {
            const dataIndex = tooltipItems[0].dataIndex;
            const variance = data[dataIndex].variance;
            const isPositive = variance >= 0;
            return `الفرق: ${isPositive ? '+' : ''}${new Intl.NumberFormat('ar-IQ').format(variance)} د.ع`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('ar-IQ').format(value) + ' د.ع';
          }
        }
      },
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">مقارنة الميزانية الشهرية (المخطط والفعلي)</h3>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

// مكون لعرض مصادر التمويل
const FundingSourcesChart = ({ data }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item.source),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
        borderColor: ['#4f46e5', '#7c3aed', '#9333ea', '#c026d3'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
          },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = data[context.dataIndex];
            return [
              `${item.amount.toLocaleString()} د.ع`,
              `${item.percentage}% من إجمالي التمويل`
            ];
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">مصادر التمويل</h3>
      <div style={{ height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}

// مكون لعرض مقارنة تكلفة الانتخابات
const ElectionCostComparisonChart = ({ data }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item.election),
    datasets: [
      {
        label: 'تكلفة الانتخابات',
        data: data.map(item => item.cost),
        backgroundColor: '#a855f7', // bg-purple-500
        hoverBackgroundColor: '#9333ea', // bg-purple-600
        borderColor: '#a855f7',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('ar-IQ').format(context.parsed.y) + ' د.ع';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('ar-IQ').format(value) + ' د.ع';
          }
        }
      },
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">مقارنة تكلفة الانتخابات</h3>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

// مكون لعرض تكلفة الناخب حسب المحافظة
const VoterCostByGovernorateChart = ({ data }) => {
  // تحويل البيانات إلى الصيغة المطلوبة لمكتبة Chart.js
  const chartData = {
    labels: data.map(item => item.governorate),
    datasets: [
      {
        label: 'تكلفة الناخب',
        data: data.map(item => item.costPerVoter),
        backgroundColor: '#10b981', // bg-green-500
        borderColor: '#059669', // bg-green-600
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== undefined) {
              label += new Intl.NumberFormat('ar-IQ').format(context.parsed.x) + ' د.ع';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('ar-IQ').format(value) + ' د.ع';
          }
        }
      },
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">تكلفة الناخب حسب المحافظة</h3>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

const FinancialStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('yearly')
  const [selectedYear, setSelectedYear] = useState('2023')
  const [activeTab, setActiveTab] = useState('overview')
  const [transactionFilter, setTransactionFilter] = useState('all') // 'all', 'income', 'expense'

  return (
    <div className="min-h-screen bg-gray-50">
        <Sidebar/>
      <div className="w-full pt-4">
        <div className="p-6">
          {/* عنوان الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">الإحصائيات المالية</h1>
              <p className="text-sm text-gray-600">تحليل شامل للبيانات المالية للنظام الانتخابي</p>
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
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
              onClick={() => setActiveTab('overview')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              نظرة عامة
            </button>
            <button 
              onClick={() => setActiveTab('expenses')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'expenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              المصروفات
            </button>
            <button 
              onClick={() => setActiveTab('budget')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'budget' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              الميزانية
            </button>
            <button 
              onClick={() => setActiveTab('revenue')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'revenue' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              الإيرادات
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              التحليلات
            </button>
            <button 
              onClick={() => setActiveTab('comparison')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'comparison' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              المقارنات
            </button>
            <button 
              onClick={() => setActiveTab('transactions')} 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              المعاملات
            </button>
          </div>

          {/* محتوى التبويب: نظرة عامة */}
          {activeTab === 'overview' && (
            <>
              {/* البطاقات الإحصائية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard 
                  title="إجمالي الميزانية" 
                  value={`${mockFinancialData.totalBudget.toLocaleString()} د.ع`} 
                  icon={DollarSign} 
                  trend={5.2} 
                  color="bg-blue-600" 
                />
                <StatCard 
                  title="إجمالي المصروفات" 
                  value={`${mockFinancialData.totalExpenses.toLocaleString()} د.ع`} 
                  icon={TrendingDown} 
                  trend={-2.4} 
                  color="bg-red-500" 
                />
                <StatCard 
                  title="المتبقي من الميزانية" 
                  value={`${mockFinancialData.remainingBudget.toLocaleString()} د.ع`} 
                  icon={TrendingUp} 
                  trend={3.1} 
                  color="bg-green-500" 
                />
                <StatCard 
                  title="متوسط تكلفة الناخب" 
                  value="1,250 د.ع" 
                  icon={Users} 
                  color="bg-purple-500" 
                />
              </div>

              {/* تقرير الميزانية */}
              <div className="mb-6">
                <BudgetReport 
                  totalBudget={mockFinancialData.totalBudget}
                  totalExpenses={mockFinancialData.totalExpenses}
                  remainingBudget={mockFinancialData.remainingBudget}
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تفاصيل توزيع الميزانية</h3>
                <div className="space-y-4">
                  {mockFinancialData.expensesByCategory.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{category.category}</span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900">{category.amount.toLocaleString()} د.ع</span>
                          <span className="text-xs text-gray-500">({category.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${index % 5 === 0 ? 'bg-blue-600' : index % 5 === 1 ? 'bg-purple-600' : index % 5 === 2 ? 'bg-green-600' : index % 5 === 3 ? 'bg-amber-500' : 'bg-red-600'}`} 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* الرسوم البيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <PieChartComponent data={mockFinancialData.expensesByCategory} />
                <BarChartComponent 
                  data={mockFinancialData.monthlyExpenses} 
                  title="المصروفات الشهرية" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.governorateExpenses} 
                  title="المصروفات حسب المحافظة" 
                />
                <RecentTransactions transactions={mockFinancialData.recentTransactions} />
              </div>
            </>
          )}

          {/* محتوى التبويب: المصروفات */}
          {activeTab === 'expenses' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard 
                  title="إجمالي المصروفات" 
                  value={`${mockFinancialData.totalExpenses.toLocaleString()} د.ع`} 
                  icon={TrendingDown} 
                  trend={-2.4} 
                  color="bg-red-500" 
                />
                <StatCard 
                  title="أعلى فئة مصروفات" 
                  value="رواتب الموظفين" 
                  icon={Users} 
                  color="bg-indigo-500" 
                />
                <StatCard 
                  title="نسبة المصروفات من الميزانية" 
                  value={`${((mockFinancialData.totalExpenses / mockFinancialData.totalBudget) * 100).toFixed(1)}%`} 
                  icon={PieChartIcon} 
                  color="bg-amber-500" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">المصروفات حسب الفئة</h3>
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النسبة</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockFinancialData.expensesByCategory.map((category, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-red-600">{category.amount.toLocaleString()} د.ع</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{category.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <PieChartComponent data={mockFinancialData.expensesByCategory} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.monthlyExpenses} 
                  title="المصروفات الشهرية" 
                />
                <BarChartComponent 
                  data={mockFinancialData.governorateExpenses} 
                  title="المصروفات حسب المحافظة" 
                />
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">معاملات المصروفات</h3>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockFinancialData.recentTransactions
                        .filter(transaction => transaction.type === 'expense')
                        .map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-semibold">{transaction.amount.toLocaleString()} د.ع</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              مكتمل
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <BudgetVarianceChart data={mockFinancialData.monthlyBudgetVariance} />
            </>
          )}

          {/* محتوى التبويب: الميزانية */}
          {activeTab === 'budget' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard 
                  title="إجمالي الميزانية" 
                  value={`${mockFinancialData.totalBudget.toLocaleString()} د.ع`} 
                  icon={DollarSign} 
                  trend={5.2} 
                  color="bg-blue-600" 
                />
                <StatCard 
                  title="المتبقي من الميزانية" 
                  value={`${mockFinancialData.remainingBudget.toLocaleString()} د.ع`} 
                  icon={TrendingUp} 
                  trend={3.1} 
                  color="bg-green-500" 
                />
                <StatCard 
                  title="نسبة استهلاك الميزانية" 
                  value={`${((mockFinancialData.totalExpenses / mockFinancialData.totalBudget) * 100).toFixed(1)}%`} 
                  icon={PieChartIcon} 
                  color="bg-amber-500" 
                />
              </div>

              <div className="mb-6">
                <BudgetReport 
                  totalBudget={mockFinancialData.totalBudget}
                  totalExpenses={mockFinancialData.totalExpenses}
                  remainingBudget={mockFinancialData.remainingBudget}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.budgetAllocation} 
                  title="تخصيص الميزانية عبر السنوات" 
                  valueKey="budget"
                  labelKey="year"
                />
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">مصادر التمويل</h3>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {mockFinancialData.fundingSources.map((source, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{source.source}</p>
                          <p className="text-sm text-gray-500">{source.percentage}% من إجمالي التمويل</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">{source.amount.toLocaleString()} د.ع</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: '200px' }}>
                    <Pie 
                      data={{
                        labels: mockFinancialData.fundingSources.map(item => item.source),
                        datasets: [{
                          data: mockFinancialData.fundingSources.map(item => item.amount),
                          backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
                          borderColor: ['#4f46e5', '#7c3aed', '#9333ea', '#c026d3'],
                          borderWidth: 1,
                        }]
                      }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              font: { size: 11 },
                              color: '#374151',
                            },
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                const item = mockFinancialData.fundingSources[context.dataIndex];
                                return [
                                  `${item.amount.toLocaleString()} د.ع`,
                                  `${item.percentage}% من إجمالي التمويل`
                                ];
                              }
                            }
                          }
                        },
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BudgetVarianceChart data={mockFinancialData.monthlyBudgetVariance} />
                <ElectionCostComparisonChart data={mockFinancialData.electionCostComparison} />
              </div>
            </>
          )}

          {/* محتوى التبويب: المقارنات */}
          {activeTab === 'comparison' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard 
                  title="متوسط تكلفة الناخب" 
                  value="1,250 د.ع" 
                  icon={Users} 
                  trend={4.2}
                  color="bg-purple-500" 
                />
                <StatCard 
                  title="أعلى تكلفة للناخب" 
                  value="1,450 د.ع" 
                  icon={TrendingUp} 
                  color="bg-red-500" 
                />
                <StatCard 
                  title="أقل تكلفة للناخب" 
                  value="1,100 د.ع" 
                  icon={TrendingDown} 
                  color="bg-green-500" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.voterCostByYear} 
                  title="تكلفة الناخب عبر السنوات" 
                  valueKey="cost"
                  labelKey="year"
                  colors={['bg-purple-500', 'hover:bg-purple-600']}
                />
                <VoterCostByGovernorateChart data={mockFinancialData.costPerVoterByGovernorate} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ElectionCostComparisonChart data={mockFinancialData.electionCostComparison} />
                <BarChartComponent 
                  data={mockFinancialData.governorateExpenses} 
                  title="المصروفات حسب المحافظة" 
                  colors={['bg-teal-500', 'hover:bg-teal-600']}
                />
              </div>
            </>
          )}

          {/* محتوى التبويب: المعاملات */}
          {activeTab === 'transactions' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard 
                  title="إجمالي الإيرادات" 
                  value={`${mockFinancialData.totalRevenue.toLocaleString()} د.ع`} 
                  icon={TrendingUp} 
                  trend={8.5}
                  color="bg-green-500" 
                />
                <StatCard 
                  title="إجمالي المصروفات" 
                  value={`${mockFinancialData.totalExpenses.toLocaleString()} د.ع`} 
                  icon={TrendingDown} 
                  trend={-2.4} 
                  color="bg-red-500" 
                />
                <StatCard 
                  title="عدد المعاملات" 
                  value="42" 
                  icon={DollarSign} 
                  color="bg-blue-500" 
                />
              </div>

              <div className="mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">المعاملات المالية</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <button 
                        onClick={() => setTransactionFilter('all')} 
                        className={`px-3 py-1 text-xs font-medium rounded-md ${transactionFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        الكل
                      </button>
                      <button 
                        onClick={() => setTransactionFilter('income')} 
                        className={`px-3 py-1 text-xs font-medium rounded-md ${transactionFilter === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        الإيرادات
                      </button>
                      <button 
                        onClick={() => setTransactionFilter('expense')} 
                        className={`px-3 py-1 text-xs font-medium rounded-md ${transactionFilter === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        المصروفات
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* عرض المعاملات حسب التصفية المحددة */}
                        {mockFinancialData.recentTransactions
                          .filter(transaction => transactionFilter === 'all' || transaction.type === transactionFilter)
                          .map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toLocaleString()} د.ع
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString('ar-IQ')}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {transaction.type === 'income' ? 'إيراد' : 'مصروف'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {transaction.type === 'income' ? 'مستلم' : 'مكتمل'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.monthlyExpenses} 
                  title="المصروفات الشهرية" 
                  colors={['bg-red-500', 'hover:bg-red-600']}
                />
                <FundingSourcesChart data={mockFinancialData.fundingSources} />
              </div>
            </>
          )}
          
          {/* تبويب الإيرادات */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="إجمالي الإيرادات" 
                  value={`${mockFinancialData.totalRevenue.toLocaleString()} د.ع`}
                  icon={TrendingUp} 
                  trend={8.5}
                  color="bg-green-500" 
                />
                <StatCard 
                  title="إجمالي المصروفات" 
                  value={`${mockFinancialData.totalExpenses.toLocaleString()} د.ع`}
                  icon={TrendingDown} 
                  trend={-2.4} 
                  color="bg-red-500" 
                />
                <StatCard 
                  title="عدد المعاملات" 
                  value="42"
                  icon={DollarSign} 
                  color="bg-blue-500" 
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">تفاصيل الإيرادات حسب المصدر</h3>
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المصدر</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النسبة</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockFinancialData.fundingSources.map((source, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{source.source}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-green-600">{source.amount.toLocaleString()} د.ع</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{source.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">توزيع مصادر التمويل</h3>
                  <div style={{ height: '300px' }}>
                    <Pie 
                      data={{
                        labels: mockFinancialData.fundingSources.map(item => item.source),
                        datasets: [{
                          data: mockFinancialData.fundingSources.map(item => item.amount),
                          backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'],
                          borderColor: ['#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777'],
                          borderWidth: 1,
                        }]
                      }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              font: { size: 12 },
                              color: '#374151',
                            },
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                const item = mockFinancialData.fundingSources[context.dataIndex];
                                return [
                                  `${item.amount.toLocaleString()} د.ع`,
                                  `${item.percentage}% من إجمالي التمويل`
                                ];
                              }
                            }
                          }
                        },
                      }} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <BarChartComponent 
                  data={mockFinancialData.monthlyExpenses} 
                  title="المصروفات الشهرية" 
                  valueKey="amount"
                  labelKey="month"
                />
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">تحليل الإيرادات والمصروفات</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">إجمالي الإيرادات</span>
                      <span className="text-sm font-semibold text-green-600">{mockFinancialData.totalRevenue.toLocaleString()} د.ع</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">إجمالي المصروفات</span>
                      <span className="text-sm font-semibold text-red-600">{mockFinancialData.totalExpenses.toLocaleString()} د.ع</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(mockFinancialData.totalExpenses / mockFinancialData.totalRevenue) * 100}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">الرصيد المتبقي</span>
                      <span className="text-sm font-semibold text-blue-600">{(mockFinancialData.totalRevenue - mockFinancialData.totalExpenses).toLocaleString()} د.ع</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((mockFinancialData.totalRevenue - mockFinancialData.totalExpenses) / mockFinancialData.totalRevenue) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">معاملات الإيرادات</h3>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المصدر</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockFinancialData.recentTransactions
                        .filter(transaction => transaction.type === 'income')
                        .map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-semibold">{transaction.amount.toLocaleString()} د.ع</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{transaction.category || 'غير محدد'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              مستلم
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* تبويب التحليلات */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* بطاقات مؤشرات الأداء الرئيسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="معدل الإنفاق الشهري" 
                  value={`${(mockFinancialData.totalExpenses / 12).toFixed(2).toLocaleString()} د.ع`}
                  icon={Activity} 
                  trend={-1.2}
                  color="bg-blue-600" 
                />
                <StatCard 
                  title="نسبة استهلاك الميزانية" 
                  value={`${((mockFinancialData.totalExpenses / mockFinancialData.totalBudget) * 100).toFixed(1)}%`}
                  icon={PieChartIcon} 
                  trend={+2.3}
                  color="bg-purple-500" 
                />
                <StatCard 
                  title="متوسط قيمة المعاملة" 
                  value={`${(mockFinancialData.totalExpenses / mockFinancialData.recentTransactions.filter(t => t.type === 'expense').length).toFixed(2).toLocaleString()} د.ع`}
                  icon={DollarSign} 
                  trend={+0.8}
                  color="bg-green-500" 
                />
                <StatCard 
                  title="عدد المعاملات" 
                  value={mockFinancialData.recentTransactions.length.toString()}
                  icon={FileText} 
                  trend={+12.5}
                  color="bg-amber-500" 
                />
              </div>

              {/* تحليل الاتجاهات المالية */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تحليل الاتجاهات المالية</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">توزيع الإيرادات والمصروفات</h4>
                    <div style={{ height: '300px' }}>
                      <Pie 
                        data={{
                          labels: ['الإيرادات', 'المصروفات'],
                          datasets: [{
                            data: [mockFinancialData.totalRevenue, mockFinancialData.totalExpenses],
                            backgroundColor: ['#10B981', '#EF4444'],
                            borderColor: ['#059669', '#DC2626'],
                            borderWidth: 1,
                          }]
                        }} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                font: { size: 12 },
                                color: '#374151',
                              },
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  const value = context.raw;
                                  const total = mockFinancialData.totalRevenue + mockFinancialData.totalExpenses;
                                  const percentage = ((value / total) * 100).toFixed(1);
                                  return [
                                    `${value.toLocaleString()} د.ع`,
                                    `${percentage}% من الإجمالي`
                                  ];
                                }
                              }
                            }
                          },
                        }} 
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">تحليل الميزانية</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">استهلاك الميزانية</span>
                          <span className="text-sm font-medium text-gray-700">
                            {((mockFinancialData.totalExpenses / mockFinancialData.totalBudget) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${(mockFinancialData.totalExpenses / mockFinancialData.totalBudget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">الميزانية المتبقية</span>
                          <span className="text-sm font-medium text-gray-700">
                            {((mockFinancialData.remainingBudget / mockFinancialData.totalBudget) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${(mockFinancialData.remainingBudget / mockFinancialData.totalBudget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-800 mb-3">مؤشرات مالية رئيسية</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">نسبة الإيرادات إلى المصروفات</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">
                            {(mockFinancialData.totalRevenue / mockFinancialData.totalExpenses).toFixed(2)}x
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">متوسط تكلفة الناخب</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">
                            1,250 د.ع
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">معدل النمو في المصروفات</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">
                            +4.2%
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">معدل النمو في الإيرادات</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">
                            +6.8%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* تحليل المصروفات حسب الفئة */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تحليل المصروفات حسب الفئة</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">توزيع المصروفات</h4>
                    <div style={{ height: '300px' }}>
                      <Pie 
                        data={{
                          labels: mockFinancialData.expensesByCategory.map(item => item.category),
                          datasets: [{
                            data: mockFinancialData.expensesByCategory.map(item => item.amount),
                            backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'],
                            borderColor: ['#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48'],
                            borderWidth: 1,
                          }]
                        }} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                font: { size: 11 },
                                color: '#374151',
                              },
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  const item = mockFinancialData.expensesByCategory[context.dataIndex];
                                  return [
                                    `${item.amount.toLocaleString()} د.ع`,
                                    `${item.percentage}% من إجمالي المصروفات`
                                  ];
                                }
                              }
                            }
                          },
                        }} 
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">تحليل الفئات</h4>
                    <div className="space-y-4">
                      {mockFinancialData.expensesByCategory.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{category.category}</span>
                            <span className="text-sm font-medium text-gray-700">
                              {category.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${category.percentage}%`,
                                backgroundColor: index % 6 === 0 ? '#6366f1' : index % 6 === 1 ? '#8b5cf6' : index % 6 === 2 ? '#a855f7' : index % 6 === 3 ? '#d946ef' : index % 6 === 4 ? '#ec4899' : '#f43f5e'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* تحليل الاتجاهات الشهرية */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تحليل الاتجاهات الشهرية</h3>
                <div style={{ height: '350px' }}>
                  <Line 
                    data={{
                      labels: mockFinancialData.monthlyExpenses.map(item => item.month),
                      datasets: [
                        {
                          label: 'المصروفات',
                          data: mockFinancialData.monthlyExpenses.map(item => item.amount),
                          borderColor: '#EF4444',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          borderWidth: 2,
                          tension: 0.3,
                          fill: true,
                        },
                        {
                          label: 'الميزانية المخططة',
                          data: mockFinancialData.monthlyExpenses.map(item => item.amount * 1.2),
                          borderColor: '#3B82F6',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          borderWidth: 2,
                          borderDash: [5, 5],
                          tension: 0.3,
                          fill: false,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: { size: 12 },
                            color: '#374151',
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.dataset.label}: ${context.raw.toLocaleString()} د.ع`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return value.toLocaleString() + ' د.ع';
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* مؤشرات الأداء الرئيسية حسب المحافظة */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">مؤشرات الأداء حسب المحافظة</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المحافظة</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المصروفات (د.ع)</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد الناخبين</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تكلفة الناخب (د.ع)</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النسبة من الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockFinancialData.governorateExpenses.map((gov, index) => {
                        const voterCount = Math.floor(gov.amount / 12.5);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{gov.governorate}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">{gov.amount.toLocaleString()} د.ع</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{voterCount.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">12.5 د.ع</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {((gov.amount / mockFinancialData.totalExpenses) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FinancialStatistics
