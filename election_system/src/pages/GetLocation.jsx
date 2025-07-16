import React, { useState, useEffect, useCallback } from "react";
import {
  Smartphone,
  Users,
  MapPin,
  Activity,
  Wifi,
  WifiOff,
  Navigation,
  AlertCircle,
  Clock,
  Database,
} from "lucide-react";

const AndroidDataReceiver = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [androidData, setAndroidData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [serverStats, setServerStats] = useState({});

  // Enhanced tracking features
  const [trackedUsers, setTrackedUsers] = useState(new Map());
  const [selectedUser, setSelectedUser] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [offlineData, setOfflineData] = useState([]);
  const [connectionRetries, setConnectionRetries] = useState(0);
  const [lastConnectionTime, setLastConnectionTime] = useState(null);

  // Initialize socket connection with auto-reconnect
  const initializeSocket = useCallback(() => {
    const newSocket = new WebSocket("ws://192.168.100.51:5000");
    newSocket.onopen = () => {
      console.log("Connected to server");
      setConnected(true);
      setConnectionRetries(0);
      setLastConnectionTime(new Date());

      // Register as web client
      newSocket.send(
        JSON.stringify({
          type: "register",
          data: {
            userId: "web_client_" + Date.now(),
            deviceType: "web",
            deviceInfo: {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
            },
          },
        })
      );
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleServerMessage(message);
    };

    newSocket.onclose = () => {
      console.log("Disconnected from server");
      setConnected(false);

      // Auto-reconnect with exponential backoff
      const retryDelay = Math.min(5000 + connectionRetries * 2000, 30000);
      setTimeout(() => {
        setConnectionRetries((prev) => prev + 1);
        initializeSocket();
      }, retryDelay);
    };

    newSocket.onerror = (error) => {
      console.error("Socket error:", error);
      setConnected(false);
    };

    setSocket(newSocket);
  }, [connectionRetries]);

  // Handle incoming server messages
  const handleServerMessage = (message) => {
    const { type, data } = message;

    switch (type) {
      case "android-data":
        setAndroidData((prev) => [data, ...prev.slice(0, 9)]);
        break;

      case "new-location":
      case "location_update":
        handleLocationUpdate(data);
        break;

      case "sensor-data":
        setSensorData((prev) => [data, ...prev.slice(0, 9)]);
        break;

      case "connected_users":
        setConnectedUsers(data.users);
        break;

      case "server_stats":
        setServerStats(data);
        break;

      default:
        console.log("Unknown message type:", type);
    }
  };

  // Enhanced location update handler
  const handleLocationUpdate = (data) => {
    const timestamp = new Date();
    const locationUpdate = {
      ...data,
      timestamp: timestamp.toISOString(),
      receivedAt: timestamp,
    };

    // Update location data array
    setLocationData((prev) => [locationUpdate, ...prev.slice(0, 19)]);

    // Update tracked users map
    setTrackedUsers((prev) => {
      const updated = new Map(prev);
      const userId = data.userId || data.user_id;

      if (userId) {
        const existingUser = updated.get(userId) || {};
        updated.set(userId, {
          ...existingUser,
          userId,
          lastLocation: {
            latitude: data.latitude,
            longitude: data.longitude,
            accuracy: data.accuracy,
            timestamp: timestamp,
            speed: data.speed,
            heading: data.heading,
          },
          lastSeen: timestamp,
          isOnline: true,
          locationHistory: [
            ...(existingUser.locationHistory || []).slice(0, 49),
            locationUpdate,
          ],
        });
      }

      return updated;
    });

    // Add to tracking history if user is selected
    if (
      selectedUser &&
      (data.userId === selectedUser || data.user_id === selectedUser)
    ) {
      setTrackingHistory((prev) => [locationUpdate, ...prev.slice(0, 99)]);
    }
  };

  // Store data offline when connection is lost
  const storeOfflineData = (data) => {
    setOfflineData((prev) => [
      ...prev,
      {
        ...data,
        storedAt: new Date().toISOString(),
      },
    ]);
  };

  // Mark users as offline after timeout
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackedUsers((prev) => {
        const updated = new Map(prev);
        const now = new Date();

        for (const [userId, user] of updated.entries()) {
          const timeDiff = now - user.lastSeen;
          if (timeDiff > 30000) {
            // 30 seconds timeout
            updated.set(userId, {
              ...user,
              isOnline: false,
            });
          }
        }

        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initialize socket on component mount
  useEffect(() => {
    initializeSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatLocation = (location) => {
    if (
      typeof location === "object" &&
      location.latitude &&
      location.longitude
    ) {
      return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(
        6
      )}`;
    }
    if (Array.isArray(location)) {
      return `${location[1]?.toFixed(6)}, ${location[0]?.toFixed(6)}`;
    }
    return "Invalid location";
  };

  const calculateDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return 0;
    const R = 6371; // Earth's radius in km
    const dLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const dLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.latitude * Math.PI) / 180) *
        Math.cos((loc2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const selectUserForTracking = (userId) => {
    setSelectedUser(userId);
    const user = trackedUsers.get(userId);
    if (user) {
      setTrackingHistory(user.locationHistory || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Real-time Location Tracker
                </h1>
                <p className="text-gray-600">
                  Advanced tracking with offline support
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {connected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    connected ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {connected
                    ? "Connected"
                    : `Reconnecting... (${connectionRetries})`}
                </span>
              </div>
              {lastConnectionTime && (
                <div className="text-xs text-gray-500">
                  Last: {formatTimestamp(lastConnectionTime)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tracked Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {trackedUsers.size}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Online Users
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    Array.from(trackedUsers.values()).filter((u) => u.isOnline)
                      .length
                  }
                </p>
              </div>
              <Smartphone className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Location Updates
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {locationData.length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tracking History
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {trackingHistory.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Offline Data
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {offlineData.length}
                </p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tracked Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tracked Users
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {trackedUsers.size === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No users being tracked
                </p>
              ) : (
                Array.from(trackedUsers.entries()).map(([userId, user]) => (
                  <div
                    key={userId}
                    className={`bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedUser === userId ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => selectUserForTracking(userId)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">
                          {userId}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user.isOnline ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(user.lastSeen)}
                      </span>
                    </div>
                    {user.lastLocation && (
                      <div className="text-sm text-gray-600">
                        <div>📍 {formatLocation(user.lastLocation)}</div>
                        <div>
                          📏 Accuracy: {user.lastLocation.accuracy?.toFixed(1)}m
                        </div>
                        {user.lastLocation.speed && (
                          <div>
                            🏃 Speed: {user.lastLocation.speed?.toFixed(1)} m/s
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tracking History {selectedUser && `- ${selectedUser}`}
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {trackingHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  {selectedUser
                    ? "No tracking history for this user"
                    : "Select a user to view history"}
                </p>
              ) : (
                trackingHistory.map((data, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Update #{trackingHistory.length - index}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(data.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>📍 {formatLocation(data)}</div>
                      {data.accuracy && (
                        <div>📏 Accuracy: {data.accuracy}m</div>
                      )}
                      {data.speed && <div>🏃 Speed: {data.speed} m/s</div>}
                      {index > 0 && trackingHistory[index - 1] && (
                        <div className="text-xs text-blue-600 mt-1">
                          📏 Distance from last:{" "}
                          {calculateDistance(
                            {
                              latitude: data.latitude,
                              longitude: data.longitude,
                            },
                            {
                              latitude: trackingHistory[index - 1].latitude,
                              longitude: trackingHistory[index - 1].longitude,
                            }
                          ).toFixed(3)}{" "}
                          km
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Location Updates */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Location Updates
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {locationData.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No location updates received
                </p>
              ) : (
                locationData.map((data, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {data.userId || data.user_id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(data.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>📍 {formatLocation(data)}</div>
                      {data.accuracy && (
                        <div>📏 Accuracy: {data.accuracy}m</div>
                      )}
                      {data.speed && <div>🏃 Speed: {data.speed} m/s</div>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Connection Status & Offline Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              System Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {connected ? (
                    <Wifi className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium">Connection Status</span>
                </div>
                <span
                  className={`text-sm ${
                    connected ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {connected ? "Connected" : "Disconnected"}
                </span>
              </div>

              {offlineData.length > 0 && (
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">
                      Offline Data Available
                    </span>
                  </div>
                  <p className="text-xs text-orange-600">
                    {offlineData.length} updates stored while offline
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-500">
                <div>Auto-reconnect: Enabled</div>
                <div>Retry attempts: {connectionRetries}</div>
                <div>Update interval: 2 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidDataReceiver;
