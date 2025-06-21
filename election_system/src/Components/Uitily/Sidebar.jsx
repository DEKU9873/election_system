import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/urlogo.png";

import {
  Menu,
  X,
  Home,
  Users,
  LogOut,
  UserCog,
  Vote,
  Bell,
  LogIn,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  React.useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item.href === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location]);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: Home, href: "/dashboard" },
    { id: "voters", label: "الناخبين", icon: Vote, href: "/elected" },
    {
      id: "supervisors",
      label: "المشرفين",
      icon: UserCog,
      href: "/monitors",
    },
    {
      id: "coordinators",
      label: "المرتكزين",
      icon: Vote,
      href: "/coordinators",
    },
    {
      id: "centers",
      label: "إدارة المراكز",
      icon: UserCog,
      submenu: [
        {
          id: "election-centers",
          label: "المراكز الانتخابية",
          href: "/election-centers",
        },
        { id: "governorates", label: "المحافظات", href: "/governorate" },
        { id: "districts", label: "الأقضية", href: "/districts" },
        { id: "sub-districts", label: "النواحي", href: "/subdistricts" },
        {
          id: "center-managers",
          label: "مدراء المراكز",
          href: "/centerManagers",
        },
        {
          id: "district-managers",
          label: "مدراء الأقضية",
          href: "/districtsManagers",
        },
      ],
    },
    {
      id: "electoralStrips",
      label: "الاشرطة الانتخابية",
      icon: Vote,
      href: "/electoralStrips",
    },
    { id: "users", label: "الموظفين", icon: Users, href: "/users" },
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
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
                title="الإشعارات"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <Link
                to="/login"
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                title="تسجيل الدخول"
              >
                <LogIn size={22} className="text-gray-700" />
              </Link>
            </div>
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
        {/* Header with Logo */}
        <div className="border-b border-gray-200 min-w-64 flex-shrink-0">
          <div className="flex justify-end m-4">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 hover:rotate-90 transition-all duration-300"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col items-center gap-2 flex-1 justify-center">
              <img src={logo} alt="شعار الشركة" className="h-20 w-auto" />
              <span className="font-bold text-lg text-gray-800">
                نظام الانتخابات
              </span>
            </div>
          </div>
        </div>

        {/* Navigation with scroll */}
        <nav className="flex-1 min-w-64 overflow-y-auto pt-4">
          <div className="px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              if (item.submenu) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                      }
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                        activeItem === item.id
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={20}
                          className={`transition-all duration-200 ${
                            activeItem === item.id ? "text-blue-600" : ""
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSubmenu === item.id ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openSubmenu === item.id && (
                      <div className="mt-1 mr-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.href}
                            onClick={closeSidebar}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                              activeItem === subItem.id
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "text-gray-700"
                            }`}
                          >
                            <span className="font-medium">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={closeSidebar}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-gray-700"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-all duration-200 ${
                      activeItem === item.id ? "text-blue-600" : ""
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 min-w-64 flex-shrink-0">
          <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 cursor-pointer">
            <div className="flex-1 min-w-0 text-right order-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                الحسن محمد
              </p>
              <p className="text-xs text-gray-500 truncate">
                alhassan@gmail.com
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center order-2 hover:scale-105 transition-transform duration-200">
              <span className="text-gray-600 font-medium text-sm">أم</span>
            </div>
          </div>
          <button
            onClick={() => {
              // Handle logout
            }}
            className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg transition-all duration-300 hover:bg-red-50 text-red-600"
          >
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
