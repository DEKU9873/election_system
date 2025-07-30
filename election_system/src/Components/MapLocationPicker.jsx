import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, MapPin } from "lucide-react";

// إصلاح أيقونات Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const MapLocationPicker = ({ onLocationSelect, initialPosition = null }) => {
  const [position, setPosition] = useState(
    initialPosition || [33.3152, 44.3661]
  ); // بغداد كموقع افتراضي
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (selectedPosition && onLocationSelect) {
      onLocationSelect(selectedPosition[0], selectedPosition[1]);
    }
  }, [selectedPosition, onLocationSelect]);

  // إغلاق نتائج البحث عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePositionChange = (newPosition) => {
    setSelectedPosition(newPosition);
  };

  // البحث عن الأماكن باستخدام Nominatim API
  const searchLocation = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&accept-language=ar,en&countrycodes=iq`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("خطأ في البحث:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // التعامل مع تغيير نص البحث
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // البحث التلقائي بعد توقف الكتابة لمدة 500ms
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      searchLocation(value);
    }, 500);
  };

  // اختيار موقع من نتائج البحث
  const selectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const newPosition = [lat, lon];

    setSelectedPosition(newPosition);
    setPosition(newPosition);
    setSearchQuery(result.display_name);
    setShowResults(false);

    // تحريك الخريطة إلى الموقع المحدد
    if (mapRef) {
      mapRef.setView(newPosition, 15);
    }
  };

  return (
    <div className="w-full">
      {/* شريط البحث */}
      <div className="relative mb-3" ref={searchContainerRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث عن موقع (مثال: بغداد، النجف، البصرة...)"
            className="w-full pr-10 pl-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 text-right"
            dir="rtl"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* نتائج البحث */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto mt-1">
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => selectSearchResult(result)}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-2 text-right">
                  <MapPin
                    size={16}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {result.display_name.split(",")[0]}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {result.display_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showResults &&
          searchResults.length === 0 &&
          !isSearching &&
          searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 text-center text-gray-500 text-sm mt-1">
              لم يتم العثور على نتائج
            </div>
          )}
      </div>

      {/* الخريطة */}
      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 relative z-0">
        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          ref={setMapRef}
        >
          <LayersControl position="topright">
            {/* خرائط جوجل */}
            <LayersControl.BaseLayer checked name="خرائط جوجل">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>

            {/* الطبقة الأساسية - OpenStreetMap */}
            <LayersControl.BaseLayer name="خريطة الشوارع">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <LocationMarker
            position={selectedPosition}
            setPosition={handlePositionChange}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapLocationPicker;
