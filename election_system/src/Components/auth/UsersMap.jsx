import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// تعريف أيقونة الموقع الافتراضية
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UsersMap = ({ data, selectedRows, handleSelectRow, mapCenter, mapZoom }) => {
  // أنماط CSS للخريطة
  const mapStyles = {
    height: '250px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  
  // تعديل ارتفاع الخريطة بناءً على حجم الشاشة
  useEffect(() => {
    const updateMapHeight = () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        if (window.innerWidth >= 768) {
          mapContainer.style.height = '400px';
        } else if (window.innerWidth >= 480) {
          mapContainer.style.height = '300px';
        } else {
          mapContainer.style.height = '250px';
        }
      }
    };

    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  // إضافة أنماط CSS للعلامات المخصصة
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-div-icon {
        background: transparent;
        border: none;
      }
      .marker-pin {
        width: 30px;
        height: 42px;
        background-image: url('https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png');
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .marker-pin:hover {
        transform: scale(1.2);
        transition: transform 0.2s;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // فلترة البيانات لإزالة أي عنصر بدون إحداثيات صحيحة
  const validData = Array.isArray(data)
    ? data.filter(user => user.location && user.location.lat && user.location.lng)
    : [];

  return (
    <div className="mb-4 sm:mb-6">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={mapStyles}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* إضافة العلامات فقط إذا كانت هناك بيانات صحيحة */}
        {validData.length > 0 ? (
          validData.map((user) => (
            <Marker
              key={user.id}
              position={user.location}
              eventHandlers={{
                click: () => handleSelectRow(user.id)
              }}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div class="marker-pin" data-marker-id="${user.id}"></div>`,
                iconSize: [30, 42],
                iconAnchor: [15, 42]
              })}
            >
              <Popup>
                <div className="text-right">
                  <h3 className="text-sm sm:text-base font-bold">{user.name}</h3>
                  <p className="text-xs sm:text-sm">رقم الهاتف: {user.phone}</p>
                  <p className="text-xs sm:text-sm">طريقة التسجيل: {user.registrationMethod}</p>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          // رسالة تظهر في حال عدم وجود بيانات
          <></>
        )}
      </MapContainer>

      {/* عرض رسالة أسفل الخريطة إذا لم توجد بيانات */}
      {validData.length === 0 && (
        <div className="text-center text-gray-500 mt-2 text-xs sm:text-sm">
          لا توجد بيانات لعرضها على الخريطة
        </div>
      )}
    </div>
  );
};

export default UsersMap;
