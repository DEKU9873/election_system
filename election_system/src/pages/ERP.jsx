import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, ComposedChart } from 'recharts';
import { TrendingUp, Users, Clock, Target, Award, BarChart3, Database, ShoppingCart, Package, UserCheck, DollarSign, Settings, Shield, Activity, Zap, CheckCircle, AlertCircle, TrendingDown, Server, Layers, Globe } from 'lucide-react';

const ERPSuccessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedValues, setAnimatedValues] = useState({});

  // تحريك القيم عند التحميل
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({ loaded: true });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // بيانات مكونات ERP الرئيسية
  const erpModules = [
    { 
      name: 'إدارة المالية', 
      performance: 92, 
      adoption: 88, 
      satisfaction: 85,
      color: '#10b981',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'المحاسبة العامة، الحسابات الدائنة والمدينة، إدارة الأصول'
    },
    { 
      name: 'إدارة المبيعات', 
      performance: 87, 
      adoption: 92, 
      satisfaction: 89,
      color: '#3b82f6',
      icon: <ShoppingCart className="w-6 h-6" />,
      description: 'إدارة الفرص، عروض الأسعار، الطلبات، إدارة العملاء'
    },
    { 
      name: 'إدارة المخزون', 
      performance: 84, 
      adoption: 85, 
      satisfaction: 82,
      color: '#8b5cf6',
      icon: <Package className="w-6 h-6" />,
      description: 'تتبع المخزون، إدارة المستودعات، التحكم في الجودة'
    },
    { 
      name: 'الموارد البشرية', 
      performance: 79, 
      adoption: 76, 
      satisfaction: 81,
      color: '#f59e0b',
      icon: <UserCheck className="w-6 h-6" />,
      description: 'إدارة الموظفين، الرواتب، التدريب، الأداء'
    },
    { 
      name: 'إدارة الإنتاج', 
      performance: 86, 
      adoption: 83, 
      satisfaction: 78,
      color: '#ef4444',
      icon: <Settings className="w-6 h-6" />,
      description: 'التخطيط، الجدولة، مراقبة الإنتاج، إدارة الجودة'
    },
    { 
      name: 'إدارة المشتريات', 
      performance: 88, 
      adoption: 89, 
      satisfaction: 86,
      color: '#06b6d4',
      icon: <Package className="w-6 h-6" />,
      description: 'طلبات الشراء، إدارة الموردين، المناقصات'
    }
  ];

  // بيانات الأداء التشغيلي للنظام
  const systemPerformance = [
    { metric: 'سرعة الاستجابة', current: 94, target: 95, status: 'excellent' },
    { metric: 'وقت التشغيل', current: 99.2, target: 99, status: 'excellent' },
    { metric: 'استخدام المساحة', current: 67, target: 80, status: 'good' },
    { metric: 'أمان البيانات', current: 96, target: 95, status: 'excellent' },
    { metric: 'سرعة النسخ الاحتياطي', current: 88, target: 90, status: 'good' },
    { metric: 'التكامل مع الأنظمة', current: 82, target: 85, status: 'warning' }
  ];

  // بيانات اتجاهات الأداء الشهرية
  const monthlyTrends = [
    { month: 'يناير', efficiency: 72, userAdoption: 65, dataAccuracy: 88, systemStability: 91 },
    { month: 'فبراير', efficiency: 76, userAdoption: 71, dataAccuracy: 89, systemStability: 92 },
    { month: 'مارس', efficiency: 79, userAdoption: 74, dataAccuracy: 91, systemStability: 93 },
    { month: 'أبريل', efficiency: 83, userAdoption: 78, dataAccuracy: 92, systemStability: 94 },
    { month: 'مايو', efficiency: 86, userAdoption: 82, dataAccuracy: 94, systemStability: 95 },
    { month: 'يونيو', efficiency: 89, userAdoption: 85, dataAccuracy: 95, systemStability: 96 }
  ];

  // بيانات تحليل المستخدمين حسب الأقسام
  const userAnalytics = [
    { department: 'المالية', activeUsers: 85, totalUsers: 92, usage: 92 },
    { department: 'المبيعات', activeUsers: 78, totalUsers: 82, usage: 95 },
    { department: 'المخزون', activeUsers: 45, totalUsers: 52, usage: 87 },
    { department: 'الموارد البشرية', activeUsers: 32, totalUsers: 38, usage: 84 },
    { department: 'الإنتاج', activeUsers: 67, totalUsers: 75, usage: 89 },
    { department: 'المشتريات', activeUsers: 28, totalUsers: 31, usage: 90 }
  ];

  // بيانات تحليل الأعطال والمشاكل
  const issuesData = [
    { category: 'أخطاء النظام', resolved: 45, pending: 5, critical: 2 },
    { category: 'طلبات التطوير', resolved: 28, pending: 12, critical: 3 },
    { category: 'مشاكل الأداء', resolved: 15, pending: 3, critical: 1 },
    { category: 'أمان البيانات', resolved: 8, pending: 2, critical: 0 },
    { category: 'التكامل', resolved: 22, pending: 8, critical: 2 }
  ];

  // تحليل العائد على الاستثمار
  const roiAnalysis = [
    { area: 'توفير الوقت', impact: 'عالي', value: 'مرتفع' },
    { area: 'تقليل الأخطاء', impact: 'عالي جداً', value: 'مرتفع جداً' },
    { area: 'تحسين اتخاذ القرارات', impact: 'عالي', value: 'مرتفع' },
    { area: 'تقليل التكاليف التشغيلية', impact: 'متوسط', value: 'متوسط' },
    { area: 'تحسين رضا العملاء', impact: 'عالي', value: 'مرتفع' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي المحسن */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            لوحة مؤشرات نجاح نظام ERP
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تحليل شامل ومتطور لأداء نظام تخطيط موارد المؤسسة ومكوناته الأساسية
          </p>
        </div>

        {/* التبويبات المحسنة */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'modules', label: 'مكونات النظام', icon: <Layers className="w-5 h-5" /> },
              { id: 'performance', label: 'الأداء التقني', icon: <Server className="w-5 h-5" /> },
              { id: 'analytics', label: 'تحليل المستخدمين', icon: <Users className="w-5 h-5" /> },
              { id: 'trends', label: 'الاتجاهات', icon: <TrendingUp className="w-5 h-5" /> },
              { id: 'roi', label: 'العائد والتأثير', icon: <Target className="w-5 h-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div className="space-y-8">
          
          {/* نظرة عامة */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* مؤشرات الأداء الرئيسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'معدل تبني النظام', value: 'مرتفع', percentage: '87%', icon: <Users className="w-8 h-8" />, color: 'from-blue-500 to-blue-600', change: '+5%' },
                  { title: 'استقرار النظام', value: 'ممتاز', percentage: '99.2%', icon: <Shield className="w-8 h-8" />, color: 'from-green-500 to-green-600', change: '+2.1%' },
                  { title: 'دقة البيانات', value: 'عالية جداً', percentage: '95%', icon: <Target className="w-8 h-8" />, color: 'from-purple-500 to-purple-600', change: '+3%' },
                  { title: 'العائد على الاستثمار', value: 'إيجابي قوي', percentage: 'ROI+', icon: <TrendingUp className="w-8 h-8" />, color: 'from-yellow-500 to-orange-500', change: '+12%' }
                ].map((card, index) => (
                  <div key={index} className="group hover:scale-105 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl">
                      <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                        <span className="text-sm text-green-600 font-medium">{card.change}</span>
                      </div>
                      <div className="text-sm text-gray-600">{card.percentage}</div>
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000`}
                          style={{ width: card.percentage }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* مخطط الأداء العام المحسن */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">الأداء العام لمكونات النظام</h3>
                    <p className="text-gray-600 mt-2">تقييم شامل لجميع وحدات النظام الأساسية</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">الأداء</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">التبني</span>
                    </div>
                  </div>
                </div>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={erpModules} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                                <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                                <div className="space-y-1">
                                  <p className="text-blue-600">الأداء: {data.performance}%</p>
                                  <p className="text-green-600">التبني: {data.adoption}%</p>
                                  <p className="text-purple-600">الرضا: {data.satisfaction}%</p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* مكونات النظام */}
          {activeTab === 'modules' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {erpModules.map((module, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div style={{ color: module.color }} className="p-3 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform duration-300">
                        {module.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{module.performance}%</div>
                        <div className="text-sm text-gray-600">الأداء العام</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{module.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{module.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">الأداء</span>
                        <span className="font-bold" style={{ color: module.color }}>{module.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${module.performance}%`, 
                            backgroundColor: module.color 
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">معدل التبني</span>
                        <span className="font-bold text-green-600">{module.adoption}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${module.adoption}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">رضا المستخدمين</span>
                        <span className="font-bold text-purple-600">{module.satisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${module.satisfaction}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* الأداء التقني */}
          {activeTab === 'performance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Server className="w-6 h-6 text-blue-600" />
                    مؤشرات الأداء التقني
                  </h3>
                  <div className="space-y-4">
                    {systemPerformance.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{item.metric}</div>
                            <div className="text-sm text-gray-600">الهدف: {item.target}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">{item.current}%</div>
                          <div className={`text-sm ${item.current >= item.target ? 'text-green-600' : 'text-red-600'}`}>
                            {item.current >= item.target ? `+${(item.current - item.target).toFixed(1)}` : (item.current - item.target).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-purple-600" />
                    تحليل المشاكل والأعطال
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={issuesData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={11}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            value, 
                            name === 'resolved' ? 'تم الحل' : 
                            name === 'pending' ? 'قيد المعالجة' : 'حرجة'
                          ]}
                        />
                        <Bar dataKey="resolved" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="critical" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* تحليل المستخدمين */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">استخدام النظام حسب الأقسام</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userAnalytics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} fontSize={11} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            value, 
                            name === 'activeUsers' ? 'المستخدمون النشطون' : 'إجمالي المستخدمين'
                          ]}
                        />
                        <Area type="monotone" dataKey="totalUsers" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorTotal)" />
                        <Area type="monotone" dataKey="activeUsers" stackId="2" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">معدل الاستخدام النشط</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userAnalytics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="usage"
                        >
                          {userAnalytics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={erpModules[index]?.color || '#8884d8'} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'معدل الاستخدام']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* الاتجاهات */}
          {activeTab === 'trends' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">الاتجاهات الشهرية للأداء</h3>
                  <p className="text-gray-600 mt-2">تتبع تطور مؤشرات الأداء الرئيسية على مدار الأشهر</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'الكفاءة', color: '#3b82f6' },
                    { label: 'التبني', color: '#10b981' },
                    { label: 'الدقة', color: '#8b5cf6' },
                    { label: 'الاستقرار', color: '#f59e0b' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}%`, 
                        name === 'efficiency' ? 'الكفاءة' : 
                        name === 'userAdoption' ? 'التبني' : 
                        name === 'dataAccuracy' ? 'الدقة' : 'الاستقرار'
                      ]}
                    />
                    <Area type="monotone" dataKey="efficiency" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEfficiency)" strokeWidth={3} />
                    <Area type="monotone" dataKey="userAdoption" stroke="#10b981" fillOpacity={1} fill="url(#colorAdoption)" strokeWidth={3} />
                    <Area type="monotone" dataKey="dataAccuracy" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAccuracy)" strokeWidth={3} />
                    <Area type="monotone" dataKey="systemStability" stroke="#f59e0b" fillOpacity={1} fill="url(#colorStability)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* العائد والتأثير */}
          {activeTab === 'roi' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-green-600" />
                    تحليل العائد على الاستثمار
                  </h3>
                  <div className="space-y-6">
                    {roiAnalysis.map((item, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-800">{item.area}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.impact === 'عالي جداً' ? 'bg-green-100 text-green-800' :
                            item.impact === 'عالي' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          القيمة المحققة: <span className="font-medium text-gray-800">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-purple-600" />
                    الفوائد الرئيسية المحققة
                  </h3>
                  <div className="space-y-4">
                    {[
                      { benefit: 'تحسين سرعة اتخاذ القرارات', impact: 'عالي جداً', description: 'تقارير فورية ومتطورة' },
                      { benefit: 'توحيد العمليات والإجراءات', impact: 'عالي', description: 'معايير موحدة عبر الأقسام' },
                      { benefit: 'تقليل الأخطاء البشرية', impact: 'عالي جداً', description: 'أتمتة شاملة للعمليات' },
                      { benefit: 'تحسين خدمة العملاء', impact: 'عالي', description: 'استجابة أسرع وأكثر دقة' },
                      { benefit: 'زيادة الشفافية والمساءلة', impact: 'متوسط', description: 'تتبع شامل للعمليات' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 flex-1">{item.benefit}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                            item.impact === 'عالي جداً' ? 'bg-green-100 text-green-800' :
                            item.impact === 'عالي' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ملخص نهائي */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">التقييم الإجمالي لنجاح النظام</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">ممتاز</div>
                      <div className="text-blue-100">الأداء التقني</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">مرتفع</div>
                      <div className="text-blue-100">معدل التبني</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">إيجابي قوي</div>
                      <div className="text-blue-100">العائد على الاستثمار</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">متطور</div>
                      <div className="text-blue-100">مستوى النضج</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                    <p className="text-lg leading-relaxed">
                      يُظهر تحليل مؤشرات الأداء أن نظام ERP يحقق نتائج متميزة في جميع الجوانب الأساسية، 
                      مع إمكانيات كبيرة للتطوير والتحسين المستمر لتحقيق أقصى استفادة من الاستثمار.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ERPSuccessDashboard;