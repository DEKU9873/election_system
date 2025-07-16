import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Users, MapPin, Eye, Filter, Search, RefreshCw } from 'lucide-react';

// إصلاح أيقونات Leaflet الافتراضية
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// أيقونة مخصصة للمستخدمين النشطين
const activeUserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// أيقونة مخصصة للمستخدمين غير النشطين
const inactiveUserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// بيانات وهمية للمستخدمين مع إحداثياتهم
const mockUsers = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'مراقب',
    position: [33.3152, 44.3661], // بغداد
    status: 'نشط',
    lastSeen: '2024-01-15 10:30',
    district: 'الكرخ',
    phone: '07901234567'
  },
  {
    id: 2,
    name: 'فاطمة علي',
    role: 'منسق',
    position: [36.1900, 43.9928], // الموصل
    status: 'نشط',
    lastSeen: '2024-01-15 11:15',
    district: 'نينوى',
    phone: '07801234567'
  },
  {
    id: 3,
    name: 'محمد حسن',
    role: 'مدير مركز',
    position: [30.5852, 47.7971], // البصرة
    status: 'غير نشط',
    lastSeen: '2024-01-15 09:45',
    district: 'البصرة',
    phone: '07701234567'
  },
  {
    id: 4,
    name: 'زينب كريم',
    role: 'مراقب',
    position: [32.0617, 45.6611], // كربلاء
    status: 'نشط',
    lastSeen: '2024-01-15 11:00',
    district: 'كربلاء',
    phone: '07601234567'
  },
  {
    id: 5,
    name: 'عمر سالم',
    role: 'منسق',
    position: [31.9686, 44.3392], // النجف
    status: 'نشط',
    lastSeen: '2024-01-15 10:45',
    district: 'النجف',
    phone: '07501234567'
  }
];

const MonitorUserMap = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [roleFilter, setRoleFilter] = useState('الكل');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // تصفية المستخدمين بناءً على البحث والفلاتر
  useEffect(() => {
    let filtered = users;

    // تصفية بالاسم
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // تصفية بالحالة
    if (statusFilter !== 'الكل') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // تصفية بالدور
    if (roleFilter !== 'الكل') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, roleFilter]);

  // تحديث البيانات
  const refreshData = () => {
    setIsLoading(true);
    // محاكاة استدعاء API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // إحصائيات المستخدمين
  const activeUsers = users.filter(user => user.status === 'نشط').length;
  const inactiveUsers = users.filter(user => user.status === 'غير نشط').length;
  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان الرئيسي */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <MapPin className="text-blue-600" size={32} />
          خريطة مراقبة المستخدمين
        </h1>
        <p className="text-gray-600">عرض مواقع وإحداثيات جميع المستخدمين في النظام</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المستخدمون غير النشطين</p>
              <p className="text-2xl font-bold text-red-600">{inactiveUsers}</p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`${isLoading ? 'animate-spin' : ''}`} size={16} />
            تحديث البيانات
          </button>
        </div>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* البحث */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم أو المنطقة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* تصفية بالحالة */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="الكل">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
            </select>
          </div>

          {/* تصفية بالدور */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="الكل">جميع الأدوار</option>
              <option value="مراقب">مراقب</option>
              <option value="منسق">منسق</option>
              <option value="مدير مركز">مدير مركز</option>
            </select>
          </div>

          {/* عدد النتائج */}
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-600">
              عرض {filteredUsers.length} من {totalUsers} مستخدم
            </span>
          </div>
        </div>
      </div>

      {/* الخريطة */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 md:h-[600px]">
          <MapContainer
            center={[33.3152, 44.3661]} // مركز العراق
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredUsers.map((user) => (
              <Marker
                key={user.id}
                position={user.position}
                icon={user.status === 'نشط' ? activeUserIcon : inactiveUserIcon}
                eventHandlers={{
                  click: () => setSelectedUser(user)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2">{user.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-semibold">الدور:</span> {user.role}</p>
                      <p><span className="font-semibold">المنطقة:</span> {user.district}</p>
                      <p><span className="font-semibold">الهاتف:</span> {user.phone}</p>
                      <p>
                        <span className="font-semibold">الحالة:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          user.status === 'نشط' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </p>
                      <p><span className="font-semibold">آخر ظهور:</span> {user.lastSeen}</p>
                      <p><span className="font-semibold">الإحداثيات:</span> {user.position[0].toFixed(4)}, {user.position[1].toFixed(4)}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* قائمة المستخدمين */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Eye size={20} />
            قائمة المستخدمين
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدور</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنطقة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإحداثيات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر ظهور</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="text-blue-600" size={20} />
                        </div>
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'نشط' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.position[0].toFixed(4)}, {user.position[1].toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">لا توجد نتائج مطابقة لمعايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorUserMap;