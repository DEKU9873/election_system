import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Users, MapPin, Eye, RefreshCw, Phone, User, Building, MapPinned } from "lucide-react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getElectionCenters } from "../../redux/placeSlice";


// إصلاح أيقونات Leaflet الافتراضية
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// أيقونة مخصصة للمستخدمين على شكل يوزر
const activeUserIcon = L.divIcon({
  className: 'custom-user-icon',
  html: `<div style="
    width: 40px;
    height: 40px;
    background-color: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    border: 2px solid white;
  "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35]
});

// أيقونة مخصصة للمستخدم المحدد على شكل يوزر
const selectedUserIcon = L.divIcon({
  className: 'custom-selected-user-icon',
  html: `<div style="
    width: 45px;
    height: 45px;
    background-color: #ef4444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 22px;
    box-shadow: 0 3px 7px rgba(0,0,0,0.4);
    border: 3px solid white;
    animation: pulse 1.5s infinite;
  "><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
  <style>
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  </style>`,
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -40]
});

/**
 * مكون للتحكم في الخريطة والانتقال إلى موقع محدد
 * يستخدم هذا المكون للانتقال بسلاسة إلى موقع المستخدم المحدد على الخريطة
 * @param {Array} position - إحداثيات الموقع [خط العرض، خط الطول]
 * @param {Number} zoomLevel - مستوى التكبير المطلوب
 */
const MapControl = ({ position, zoomLevel }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      // انتقال بتأثير حركي إلى الموقع المحدد
      map.flyTo(position, zoomLevel || 15, {
        animate: true,
        duration: 1.5
      });
    }
  }, [map, position, zoomLevel]);

  return null;
};

const MonitorUserMap = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [locationData, setLocationData] = useState([]); // بيانات الموقع الحية
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapCenter, setMapCenter] = useState([33.3152, 44.3661]);
  const [mapZoom, setMapZoom] = useState(6);
  
  // جلب بيانات المراكز الانتخابية من Redux
  const { electionCenters } = useSelector((state) => state.place);

  const token = Cookies.get("token");

  // جلب بيانات المراكز الانتخابية عند تحميل المكون
  useEffect(() => {
    dispatch(getElectionCenters());
  }, [dispatch]);

  // الاتصال بـ Socket.IO
  useEffect(() => {
    const newSocket = io("http://185.129.7.139:2025/", {
      transports: ["websocket"],
      upgrade: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server");
      setConnected(true);

      // ✅ إرسال بيانات تعريفية للسيرفر مع التوكن
      newSocket.emit("register", {
        userId: "web_client_" + Date.now(),
        deviceType: "web",
        token: token, 
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      });
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setConnected(false);
    });

    /**
     * استقبال بيانات الموقع من السيرفر
     * يتم استقبال بيانات الموقع الجديدة وإضافتها إلى قائمة المواقع
     * مع التأكد من وجود جميع الحقول المطلوبة
     */
    newSocket.on("new-location", (data) => {
      console.log("📡 Received location data:", data);
      
      // تحويل البيانات لتشمل الحقول المطلوبة إذا لم تكن موجودة
      const enhancedData = {
        ...data,
        first_name: data.first_name || "غير متوفر",
        second_name: data.second_name || "غير متوفر",
        last_name: data.last_name || "غير متوفر",
        phone_number: data.phone_number || "غير متوفر",
        election_center_id: data.election_center_id || "غير متوفر",
      };
      
      // تحديث قائمة المواقع مع الحفاظ على الترتيب والتأكد من عدم التكرار
      setLocationData((prev) => [
        enhancedData,
        ...prev.filter((u) => u.userId !== data.userId),
      ]);
    });

    // استقبال بيانات المستخدمين المتصلين
    newSocket.on("connected_users", (data) => {
      console.log("🟢 Connected users:", data);
      setConnectedUsers(data.users);
    });

    // استقبال إحصائيات السيرفر
    newSocket.on("server_stats", (data) => {
      console.log("📊 Server stats:", data);
      setServerStats(data);
    });

    return () => {
      newSocket.close();
    };
  }, [token]);

  const refreshData = () => {
    if (socket) {
      setIsLoading(true);
      // ✅ إرسال التوكن عند طلب المستخدمين
      socket.emit("get_connected_users", { token: token });
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const sendLocationUpdate = (latitude, longitude) => {
    if (socket) {
      // ✅ إرسال التوكن مع location_update
      socket.emit("location_update", {
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString(),
        userId: "web_client_" + Date.now(),
        token: token, // ✅ التوكن هنا
      });
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatLocation = (location) => {
    if (Array.isArray(location)) {
      return `${location[1]?.toFixed(6)}, ${location[0]?.toFixed(6)}`;
    }
    return "Invalid location";
  };
  
  // دالة للحصول على اسم المركز الانتخابي حسب ID
  const getElectionCenterName = (centerId) => {
    if (!centerId || !electionCenters || electionCenters.length === 0) {
      return "غير متوفر";
    }
    
    const center = electionCenters.find(center => center.id === Number(centerId));
    return center ? center.name : "غير متوفر";
  };
  
  /**
   * وظيفة للانتقال إلى موقع المستخدم على الخريطة
   * تستخدم عند النقر على زر "عرض على الخريطة" في جدول المستخدمين
   * @param {Object} user - بيانات المستخدم المراد الانتقال إلى موقعه
   */
  const goToUserLocation = (user) => {
    if (user && Array.isArray(user.location)) {
      // تحديد المستخدم الحالي
      setSelectedUser(user);
      
      // تعيين مركز الخريطة إلى موقع المستخدم (مع مراعاة ترتيب الإحداثيات)
      setMapCenter([user.location[1], user.location[0]]);
      
      // تعيين مستوى التكبير المناسب
      setMapZoom(15);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <MapPin className="text-blue-600" size={32} />
          خريطة مراقبة المستخدمين
        </h1>
        <p className="text-gray-600 flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {connected ? "متصل بالسيرفر" : "غير متصل بالسيرفر"}
          {selectedUser && (
            <span className="mr-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              تم تحديد: {selectedUser.first_name} {selectedUser.last_name}
            </span>
          )}
        </p>
      </div>

      {/* أزرار التحكم */}
      <div className="mb-4 flex gap-3">
        <button
          onClick={refreshData}
          disabled={isLoading || !connected}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw
            className={`${isLoading ? "animate-spin" : ""}`}
            size={16}
          />
          تحديث البيانات
        </button>
        
        {selectedUser && (
          <button
            onClick={() => setSelectedUser(null)}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            إلغاء التحديد
          </button>
        )}
      </div>

      {/* الخريطة */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 md:h-[600px]">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
            
            {/* مكون التحكم في الخريطة */}
            <MapControl position={mapCenter} zoomLevel={mapZoom} />
            
            {/* استخدام أيقونات مختلفة: أزرق للمستخدمين العاديين، أحمر للمستخدم المحدد */}

            {locationData.map((user) => (
              <Marker
                key={user.userId}
                position={[user.location[1], user.location[0]]} // <-- عكس الترتيب
                icon={selectedUser?.userId === user.userId ? selectedUserIcon : activeUserIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[250px]">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <User className="text-blue-600" size={18} />
                      {user.first_name} {user.second_name} {user.last_name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Phone className="text-gray-500" size={16} />
                        <span className="font-semibold">رقم الهاتف:</span>{" "}
                        {user.phone_number}
                      </p>
                      <p className="flex items-center gap-2">
                        <Building className="text-gray-500" size={16} />
                        <span className="font-semibold">مركز الانتخاب:</span>{" "}
                        {getElectionCenterName(user.election_center_id)}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPinned className="text-gray-500" size={16} />
                        <span className="font-semibold">الإحداثيات:</span>{" "}
                        {formatLocation(user.location)}
                      </p>
                      <p className="flex items-center gap-2">
                        <RefreshCw className="text-gray-500" size={16} />
                        <span className="font-semibold">آخر تحديث:</span>{" "}
                        {formatTimestamp(user.timestamp)}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* جدول المستخدمين */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users size={20} />
            قائمة المستخدمين المتصلين
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الاسم الكامل
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  رقم الهاتف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  اسم المركز الانتخابي
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الموقع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  آخر تحديث
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locationData.map((user) => (
                <tr 
                  key={user.userId} 
                  className={`hover:bg-gray-50 ${selectedUser?.userId === user.userId ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {`${user.first_name} ${user.second_name} ${user.last_name}`}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {user.phone_number}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {getElectionCenterName(user.election_center_id)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {formatLocation(user.location)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(user.timestamp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => goToUserLocation(user)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      <MapPin size={14} />
                      عرض على الخريطة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {locationData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">لا توجد بيانات مواقع متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorUserMap;
