import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Uitily/Sidebar";
import NotificationToast from "../Notifications/NotificationToast";
import NotificationButton from "../Notifications/NotificationButton";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // السايد بار ستكون مغلقة دائمًا في البداية بغض النظر عن حجم الشاشة
      setSidebarOpen(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="font-cairo">
      <NotificationToast />
      <NotificationButton />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-500 ${
          sidebarOpen ? "md:mr-64" : ""
        } pt-16 relative z-30`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;