import React, { useState, useEffect, useMemo } from 'react';
import { Users, Vote, UserCog, DollarSign, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AllUserHook from '../../hook/auth/all-user-hook';

// تسجيل مكونات Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, ChartDataLabels);

const DashboardPage = () => {
  const [
    allUsers,
    loading,
    system_admin,
    coordinator,
    observer,
    center_manager,
    district_manager,
    finance_auditor,
    voter,
  ] = AllUserHook();

  // حساب الإحصائيات من البيانات الحقيقية
  const stats = useMemo(() => {
    if (!allUsers || allUsers.length === 0) {
      return {
        voters: 0,
        supervisors: 0,
        coordinators: 0,
        centers: 0,
        districts: 0,
        subdistricts: 0
      };
    }

    // حساب عدد المراكز الانتخابية الفريدة
    const uniqueCenters = new Set(
      allUsers
        .filter(user => user.election_center_id)
        .map(user => user.election_center_id)
    ).size;

    // حساب عدد الأقضية الفريدة
    const uniqueDistricts = new Set(
      allUsers
        .filter(user => user.district_id)
        .map(user => user.district_id)
    ).size;

    // حساب عدد النواحي الفريدة
    const uniqueSubdistricts = new Set(
      allUsers
        .filter(user => user.subdistrict_id)
        .map(user => user.subdistrict_id)
    ).size;

    return {
      voters: voter.length,
      supervisors: observer.length,
      coordinators: coordinator.length,
      centers: uniqueCenters,
      districts: uniqueDistricts,
      subdistricts: uniqueSubdistricts
    };
  }, [allUsers, voter, observer, coordinator]);

  // بيانات للرسوم البيانية بناءً على البيانات الحقيقية
  const chartData = useMemo(() => {
    if (!allUsers || allUsers.length === 0) {
      return {
        votersByGovernorate: { labels: [], datasets: [] },
        voterParticipation: { labels: [], datasets: [] },
        votersByAge: { labels: [], datasets: [] },
        votersByRole: { labels: [], datasets: [] }
      };
    }

    // توزيع المستخدمين حسب الأدوار
    const roleData = {
      'ناخبين': voter.length,
      'منسقين': coordinator.length,
      'مراقبين': observer.length,
      'مدراء مراكز': center_manager.length,
      'مدراء أقضية': district_manager.length,
      'مدققين ماليين': finance_auditor.length,
      'مدراء نظام': system_admin.length
    };

    // حساب توزيع الناخبين حسب الفئة العمرية
    const currentYear = new Date().getFullYear();
    const ageGroups = {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-55': 0,
      '56-65': 0,
      '65+': 0
    };

    voter.forEach(user => {
      if (user.birth_year) {
        const age = currentYear - user.birth_year;
        if (age >= 18 && age <= 25) ageGroups['18-25']++;
        else if (age >= 26 && age <= 35) ageGroups['26-35']++;
        else if (age >= 36 && age <= 45) ageGroups['36-45']++;
        else if (age >= 46 && age <= 55) ageGroups['46-55']++;
        else if (age >= 56 && age <= 65) ageGroups['56-65']++;
        else if (age > 65) ageGroups['65+']++;
      }
    });

    // حساب نسبة المشاركة (الذين صوتوا)
    const votedUsers = allUsers.filter(user => user.has_voted).length;
    const totalEligibleVoters = allUsers.filter(user => user.can_vote).length;
    const participationRate = totalEligibleVoters > 0 ? Math.round((votedUsers / totalEligibleVoters) * 100) : 0;

    return {
      votersByRole: {
        labels: Object.keys(roleData),
        datasets: [
          {
            label: 'عدد المستخدمين',
            data: Object.values(roleData),
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
        labels: ['نسبة المشاركة', 'لم يشاركوا'],
        datasets: [
          {
            label: 'المشاركة في التصويت',
            data: [participationRate, 100 - participationRate],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 99, 132, 0.7)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      votersByAge: {
        labels: Object.keys(ageGroups),
        datasets: [
          {
            label: 'عدد الناخبين حسب الفئة العمرية',
            data: Object.values(ageGroups),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
    };
  }, [allUsers, voter, coordinator, observer, center_manager, district_manager, finance_auditor, system_admin]);

  return (
    <div className="min-h-screen ">
      <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* عنوان الصفحة */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        </div>
        
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard 
            title="الناخبين" 
            value={stats.voters} 
            icon={<Vote size={20} className="sm:w-6 sm:h-6" />} 
            color="blue"
          />
          <StatCard 
            title="المشرفين" 
            value={stats.supervisors} 
            icon={<UserCog size={20} className="sm:w-6 sm:h-6" />} 
            color="green"
          />
          <StatCard 
            title="المرتكزين" 
            value={stats.coordinators} 
            icon={<Users size={20} className="sm:w-6 sm:h-6" />} 
            color="purple"
          />
        </div>

        {/* المراكز والمناطق */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard 
            title="المراكز الانتخابية" 
            value={stats.centers} 
            icon={<Vote size={20} className="sm:w-6 sm:h-6" />} 
            color="orange"
          />
          <StatCard 
            title="الأقضية" 
            value={stats.districts} 
            icon={<Vote size={20} className="sm:w-6 sm:h-6" />} 
            color="teal"
          />
          <StatCard 
            title="النواحي" 
            value={stats.subdistricts} 
            icon={<Vote size={20} className="sm:w-6 sm:h-6" />} 
            color="indigo"
          />
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">توزيع المستخدمين حسب الأدوار</h2>
            <div className="h-48 sm:h-64">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">جاري تحميل البيانات...</div>
                </div>
              ) : (
                <Bar 
                  data={chartData.votersByRole}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        font: {
                          family: 'Cairo',
                          size: window.innerWidth < 640 ? 10 : 12,
                        },
                        padding: window.innerWidth < 640 ? 10 : 20,
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
                          size: window.innerWidth < 640 ? 10 : 12,
                        },
                      },
                      title: {
                        display: true,
                        text: 'عدد الناخبين',
                        font: {
                          family: 'Cairo',
                          size: window.innerWidth < 640 ? 11 : 14,
                        },
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          family: 'Cairo',
                          size: window.innerWidth < 640 ? 10 : 12,
                        },
                        maxRotation: window.innerWidth < 640 ? 45 : 0,
                        minRotation: window.innerWidth < 640 ? 45 : 0,
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">نسبة المشاركة في التصويت</h2>
            <div className="flex flex-col items-center mb-3">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 text-center">
                إجمالي المؤهلين للتصويت: {allUsers?.filter(user => user.can_vote).length || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 text-center">
                عدد الذين صوتوا: {allUsers?.filter(user => user.has_voted).length || 0}
              </div>
            </div>
            <div className="h-48 sm:h-64">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">جاري تحميل البيانات...</div>
                </div>
              ) : (
                <Pie 
                  data={chartData.voterParticipation}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            family: 'Cairo',
                            size: window.innerWidth < 640 ? 10 : 12,
                          },
                          padding: window.innerWidth < 640 ? 10 : 20,
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                          }
                        }
                      },
                      datalabels: {
                        formatter: (value) => {
                          return value + '%';
                        },
                        color: '#fff',
                        font: {
                          weight: 'bold',
                          family: 'Cairo',
                          size: window.innerWidth < 640 ? 10 : 12,
                        },
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* رسم بياني إضافي */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">توزيع الناخبين حسب الفئة العمرية</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3">
            يوضح هذا المخطط توزيع الناخبين المسجلين حسب الفئات العمرية المختلفة (إجمالي الناخبين: {voter.length})
          </p>
          <div className="h-48 sm:h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">جاري تحميل البيانات...</div>
              </div>
            ) : (
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
                        size: window.innerWidth < 640 ? 10 : 12,
                      },
                      padding: window.innerWidth < 640 ? 10 : 20,
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
                      return window.innerWidth < 640 ? value.toLocaleString().replace(/,/g, 'ك') : value.toLocaleString();
                    },
                    color: '#666',
                    font: {
                      weight: 'bold',
                      family: 'Cairo',
                      size: window.innerWidth < 640 ? 9 : 11,
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
                        size: window.innerWidth < 640 ? 10 : 12,
                      },
                    },
                    title: {
                      display: true,
                      text: 'عدد الناخبين',
                      font: {
                        family: 'Cairo',
                        size: window.innerWidth < 640 ? 11 : 14,
                      },
                    },
                  },
                  x: {
                    ticks: {
                      font: {
                        family: 'Cairo',
                        size: window.innerWidth < 640 ? 10 : 12,
                      },
                    },
                    title: {
                      display: true,
                      text: 'الفئة العمرية',
                      font: {
                        family: 'Cairo',
                        size: window.innerWidth < 640 ? 11 : 14,
                      },
                    },
                  },
                },
              }}
            />
            )}
          </div>
        </div>

        {/* آخر النشاطات */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">إحصائيات النظام</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">جاري تحميل البيانات...</div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <ActivityItem 
                title="إجمالي المستخدمين المسجلين" 
                time={`${allUsers?.length || 0} مستخدم`}
                description={`منهم ${voter.length} ناخب و ${coordinator.length} منسق`}
              />
              <ActivityItem 
                title="المستخدمين النشطين" 
                time={`${allUsers?.filter(user => user.is_active).length || 0} مستخدم`}
                description="المستخدمين الذين يمكنهم الوصول للنظام حالياً"
              />
              <ActivityItem 
                title="المستخدمين الذين صوتوا" 
                time={`${allUsers?.filter(user => user.has_voted).length || 0} مستخدم`}
                description="من إجمالي المؤهلين للتصويت"
              />
              <ActivityItem 
                title="المستخدمين الذين حدثوا بطاقاتهم" 
                time={`${allUsers?.filter(user => user.has_updated_card).length || 0} مستخدم`}
                description="المستخدمين الذين قاموا بتحديث بطاقاتهم الانتخابية"
              />
            </div>
          )}
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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 truncate">{title}</h3>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${colorClasses[color]} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// مكون عنصر النشاط
const ActivityItem = ({ title, time, description }) => {
  return (
    <div className="border-b border-gray-100 pb-3 sm:pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-medium text-gray-800 text-sm sm:text-base flex-1">{title}</h4>
        <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{time}</span>
      </div>
      <p className="text-gray-600 mt-1 text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default DashboardPage;