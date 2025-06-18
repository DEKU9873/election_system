import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  ChevronLeft,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: Home, href: "#" },
    { id: "analytics", label: "التحليلات", icon: BarChart3, href: "#" },
    { id: "users", label: "المستخدمون", icon: Users, href: "#" },
    { id: "documents", label: "المستندات", icon: FileText, href: "#" },
    { id: "calendar", label: "التقويم", icon: Calendar, href: "#" },
    { id: "mail", label: "البريد", icon: Mail, href: "#" },
    { id: "settings", label: "الإعدادات", icon: Settings, href: "#" },
  ];

  // تحديد حجم الشاشة
  React.useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // إغلاق الـ sidebar في الموبايل عند تغيير الحجم
  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <div dir="rtl" className="font-['Cairo',_'Segoe_UI',_Tahoma,_sans-serif]">
      {/* Main Content Wrapper */}
      <div className="pt-16">{/* Content goes here */}</div>

      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 bg-white border-b border-gray-200 shadow-sm z-40 py-3 transition-all duration-500 ${
          isOpen ? "right-64" : "right-0"
        }`}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {!isOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="فتح القائمة"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 font-['Cairo']">
              {menuItems.find((item) => item.id === activeItem)?.label ||
                "لوحة التحكم"}
            </h1>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
              title="الإشعارات"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>
      {/* Overlay للموبايل */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-all duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-l border-gray-200 transition-all duration-500 ease-out flex flex-col shadow-2xl z-50 ${
          isMobile
            ? `fixed right-0 top-0 h-full ${
                isOpen ? "w-64 translate-x-0" : "w-64 translate-x-full"
              }`
            : `fixed right-0 top-0 h-full ${
                isOpen ? "w-64" : "w-0 overflow-hidden"
              }`
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 min-w-64 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 hover:rotate-90 transition-all duration-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation with scroll */}
        <nav className="flex-1 min-w-64 overflow-y-auto pt-4">
          <div className="px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    closeSidebar();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md group ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft
                    size={16}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-[-2px] transition-all duration-200 order-2"
                  />
                  <div className="flex items-center gap-3 order-1">
                    <Icon
                      size={20}
                      className={`transition-all duration-200 ${
                        activeItem === item.id
                          ? "text-blue-600 scale-110"
                          : "group-hover:scale-105"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 min-w-64 flex-shrink-0">
          <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 cursor-pointer">
            <div className="flex-1 min-w-0 text-right order-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                أحمد محمد
              </p>
              <p className="text-xs text-gray-500 truncate">
                ahmed@example.com
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center order-2 hover:scale-105 transition-transform duration-200">
              <span className="text-gray-600 font-medium text-sm">أم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
