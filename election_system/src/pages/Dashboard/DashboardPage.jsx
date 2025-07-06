import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Uitily/Sidebar';
import { Users, Vote, UserCog, DollarSign, BarChart as BarChartIcon, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// تسجيل مكونات Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, ChartDataLabels);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    voters: 12500,
    supervisors: 450,
    coordinators: 850,
    centers: 320,
    districts: 45,
    subdistricts: 120
  });


  // بيانات للرسوم البيانية
  const chartData = {
    votersByGovernorate: {
      labels: ['بغداد', 'البصرة', 'نينوى', 'أربيل', 'السليمانية', 'كركوك', 'ديالى'],
      datasets: [
        {
          label: 'عدد الناخبين',
          data: [4500, 2800, 1900, 1600, 1700, 1200, 1400],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)'
          ],
          borderWidth: 1,
        },
      ],
    },
    voterParticipation: {
      labels: ['بغداد', 'البصرة', 'نينوى', 'أربيل', 'السليمانية', 'كركوك', 'ديالى'],
      datasets: [
        {
          label: 'نسبة المشاركة',
          data: [75, 68, 62, 80, 72, 65, 70],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)'
          ],
          borderWidth: 1,
        },
        {
          label: 'المتوسط الوطني',
          data: [70, 70, 70, 70, 70, 70, 70],
          type: 'line',
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
        }
      ],
    },
    votersByAge: {
      labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
      datasets: [
        {
          label: 'عدد الناخبين حسب الفئة العمرية',
          data: [3200, 4500, 2800, 1900, 1200, 900],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <div className="flex-1 p-8 pt-20">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">لوحة التحكم</h1> */}
        
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="الناخبين" 
            value={stats.voters} 
            icon={<Vote size={24} />} 
            color="blue"
          />
          <StatCard 
            title="المشرفين" 
            value={stats.supervisors} 
            icon={<UserCog size={24} />} 
            color="green"
          />
          <StatCard 
            title="المرتكزين" 
            value={stats.coordinators} 
            icon={<Users size={24} />} 
            color="purple"
          />
        </div>

        {/* المراكز والمناطق */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="المراكز الانتخابية" 
            value={stats.centers} 
            icon={<Vote size={24} />} 
            color="orange"
          />
          <StatCard 
            title="الأقضية" 
            value={stats.districts} 
            icon={<Vote size={24} />} 
            color="teal"
          />
          <StatCard 
            title="النواحي" 
            value={stats.subdistricts} 
            icon={<Vote size={24} />} 
            color="indigo"
          />
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">توزيع الناخبين حسب المحافظة</h2>
            <div className="h-64 flex items-center justify-center">
              <Bar 
                data={chartData.votersByGovernorate}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        font: {
                          family: 'Cairo',
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: ${context.raw.toLocaleString()} ناخب`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return value.toLocaleString();
                        },
                        font: {
                          family: 'Cairo',
                        },
                      },
                      title: {
                        display: true,
                        text: 'عدد الناخبين',
                        font: {
                          family: 'Cairo',
                          size: 14,
                        },
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          family: 'Cairo',
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">نسبة المشاركة في الانتخابات حسب المحافظات</h2>
            <div className="flex flex-col items-center mb-3">
              <div className="text-sm text-gray-500 mb-2">متوسط نسبة المشاركة الوطنية: 70%</div>
              <div className="text-sm text-gray-500">أعلى نسبة مشاركة: أربيل (80%)</div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Bar 
                data={chartData.voterParticipation}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        font: {
                          family: 'Cairo',
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: ${context.raw}%`;
                        }
                      }
                    },
                    datalabels: {
                      formatter: (value) => {
                        return value + '%';
                      },
                      color: function(context) {
                        return context.dataset.type === 'line' ? context.dataset.borderColor : '#fff';
                      },
                      display: function(context) {
                        return context.dataset.type !== 'line';
                      },
                      font: {
                        weight: 'bold',
                        family: 'Cairo',
                        size: 12
                      },
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return value + '%';
                        },
                        font: {
                          family: 'Cairo',
                        },
                      },
                      title: {
                        display: true,
                        text: 'نسبة المشاركة',
                        font: {
                          family: 'Cairo',
                          size: 14,
                        },
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          family: 'Cairo',
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* رسم بياني إضافي */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">توزيع الناخبين حسب الفئة العمرية</h2>
          <p className="text-gray-600 mb-3">يوضح هذا المخطط توزيع الناخبين المسجلين حسب الفئات العمرية المختلفة</p>
          <div className="h-64">
            <Bar 
              data={chartData.votersByAge}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        family: 'Cairo',
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()} ناخب`;
                      }
                    }
                  },
                  datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: (value) => {
                      return value.toLocaleString();
                    },
                    color: '#666',
                    font: {
                      weight: 'bold',
                      family: 'Cairo',
                    },
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString();
                      },
                      font: {
                        family: 'Cairo',
                      },
                    },
                    title: {
                      display: true,
                      text: 'عدد الناخبين',
                      font: {
                        family: 'Cairo',
                        size: 14,
                      },
                    },
                  },
                  x: {
                    ticks: {
                      font: {
                        family: 'Cairo',
                      },
                    },
                    title: {
                      display: true,
                      text: 'الفئة العمرية',
                      font: {
                        family: 'Cairo',
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* آخر النشاطات */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">آخر النشاطات</h2>
          <div className="space-y-4">
            <ActivityItem 
              title="تسجيل ناخب جديد" 
              time="منذ 10 دقائق" 
              description="تم تسجيل ناخب جديد في محافظة بغداد" 
            />
            <ActivityItem 
              title="تعيين مشرف جديد" 
              time="منذ 30 دقيقة" 
              description="تم تعيين مشرف جديد لمركز الكرخ الانتخابي" 
            />
            <ActivityItem 
              title="تحديث بيانات مركز" 
              time="منذ ساعة" 
              description="تم تحديث بيانات مركز الرصافة الانتخابي" 
            />
            <ActivityItem 
              title="إضافة ناحية جديدة" 
              time="منذ 3 ساعات" 
              description="تمت إضافة ناحية جديدة في محافظة البصرة" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون بطاقة الإحصائيات
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// مكون عنصر النشاط
const ActivityItem = ({ title, time, description }) => {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default DashboardPage;