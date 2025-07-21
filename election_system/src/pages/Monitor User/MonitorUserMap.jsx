import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Users, MapPin, Eye, RefreshCw } from "lucide-react";
import io from "socket.io-client";
import Cookies from "js-cookie";


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

// أيقونة مخصصة
const activeUserIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MonitorUserMap = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [locationData, setLocationData] = useState([]); // بيانات الموقع الحية
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");

  // الاتصال بـ Socket.IO
  useEffect(() => {
    const newSocket = io("http://192.168.100.201:5000/", {
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

    // استقبال بيانات الموقع
    newSocket.on("new-location", (data) => {
      console.log("📡 Received location data:", data);
      setLocationData((prev) => [
        data,
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <MapPin className="text-blue-600" size={32} />
          خريطة مراقبة المستخدمين
        </h1>
        <p className="text-gray-600">
          {connected ? "🟢 متصل بالسيرفر" : "🔴 غير متصل بالسيرفر"}
        </p>
      </div>

      {/* زر التحديث */}
      <div className="mb-4">
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
      </div>

      {/* الخريطة */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 md:h-[600px]">
          <MapContainer
            center={[33.3152, 44.3661]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locationData.map((user) => (
              <Marker
                key={user.userId}
                position={[user.location[1], user.location[0]]} // <-- عكس الترتيب
                icon={activeUserIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2">
                      مستخدم {user.userId}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">آخر تحديث:</span>{" "}
                        {formatTimestamp(user.timestamp)}
                      </p>
                      <p>
                        <span className="font-semibold">الإحداثيات:</span>{" "}
                        {formatLocation(user.location)}
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
            <Eye size={20} />
            قائمة المستخدمين المتصلين
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المعرف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  آخر تحديث
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإحداثيات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locationData.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(user.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatLocation(user.location)}
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
