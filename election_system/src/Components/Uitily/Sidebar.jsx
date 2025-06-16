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
      {/* Overlay للموبايل */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-all duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* زر فتح الـ sidebar عندما يكون مغلق */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-3  "
        >
          <Menu size={22} className="text-gray-600" />
        </button>
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
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-w-64 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 hover:rotate-90 transition-all duration-300 order-2"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 order-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-sm">ش</span>
            </div>
            <div className="text-right">
              <h1 className="font-semibold text-gray-900">شركة الأحلام</h1>
              <p className="text-xs text-gray-500">الشركات</p>
            </div>
          </div>
        </div>

        {/* Navigation with scroll */}
        <nav className="flex-1 min-w-64 overflow-y-auto">
          <div className="p-4 space-y-1">
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
