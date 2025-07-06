import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/urlogo.png";
import useNotificationsHook from "../../hook/notifications/use-notifications-hook";
import Cookies from "js-cookie";

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
  DollarSign,
  BarChart,
  User,
  Building,
  Map,
  MapPin,
  Landmark,
  UserCheck,
  FileText,
  PieChart,
  Settings,
  ChevronDown,
  Briefcase,
  ClipboardList,
  LayoutDashboard
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const { unreadCount } = useNotificationsHook();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item.href === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location]);

  // التحقق من وجود بيانات المستخدم في الكوكيز
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUserData(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("خطأ في تحليل بيانات المستخدم:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard, href: "/dashboard" },
    { id: "voters", label: "الناخبين", icon: UserCheck, href: "/elected" },
    {
      id: "supervisors",
      label: "المشرفين",
      icon: UserCog,
      href: "/monitors",
    },
    {
      id: "coordinators",
      label: "المرتكزين",
      icon: Briefcase,
      href: "/coordinators",
    },
    {
      id: "centers",
      label: "إدارة المراكز",
      icon: Building,
      submenu: [
        {
          id: "centers",
          label: "المراكز الانتخابية",
          href: "/centers",
          icon: Landmark,
        },
        { id: "governorates", label: "المحافظات", href: "/governorate", icon: Map },
        { id: "districts", label: "الأقضية", href: "/districts", icon: MapPin },
        { id: "sub-districts", label: "النواحي", href: "/subdistricts", icon: MapPin },
        {
          id: "center-managers",
          label: "مدراء المراكز",
          href: "/centerManagers",
          icon: UserCog,
        },
        {
          id: "district-managers",
          label: "مدراء الأقضية",
          href: "/districtsManagers",
          icon: UserCog,
        },
      ],
    },
    {
      id: "electoralStrips",
      label: "الاشرطة الانتخابية",
      icon: FileText,
      href: "/electoralStrips",
    },
    {
      id: "financial",
      label: "الحسابات",
      icon: DollarSign,
      submenu: [
        {
          id: "financial-statistics",
          label: "الإحصائيات المالية",
          href: "/financial-statistics",
          icon: PieChart,
        },
        // يمكن إضافة المزيد من أنواع الإحصائيات هنا في المستقبل
      ],
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
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="فتح القائمة"
              >
                <Menu size={22} className="text-blue-600" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 font-['Cairo']">
              {menuItems.find((item) => item.id === activeItem)?.label ||
                "لوحة التحكم"}
            </h1>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center gap-4">
              <Link
                to="/notifications"
                className="p-2 hover:bg-blue-50 rounded-full relative transition-colors duration-200"
                title="الإشعارات"
              >
                <Bell size={22} className="text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="p-2.5 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  title="الملف الشخصي"
                >
                  <User size={22} className="text-blue-600" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="p-2.5 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  title="تسجيل الدخول"
                >
                  <LogIn size={22} className="text-blue-600" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay للموبايل */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden transition-all duration-300"
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
              className="p-1.5 rounded-lg hover:bg-blue-50 hover:rotate-90 transition-all duration-300"
            >
              <X size={20} className="text-blue-600" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col items-center gap-2 flex-1 justify-center">
              <img src={logo} alt="شعار الشركة" className="h-20 w-auto" />
              <span className="font-bold text-lg text-gray-800">
                نظام حملتي
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
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSubmenu === item.id ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSubmenu === item.id && (
                      <div className="mt-1 mr-4 space-y-1">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon || null;
                          return (
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
                              {SubIcon && (
                                <SubIcon
                                  size={16}
                                  className={`transition-all duration-200 ${
                                    activeItem === subItem.id ? "text-blue-600" : "text-gray-500"
                                  }`}
                                />
                              )}
                              <span className="font-medium">{subItem.label}</span>
                            </Link>
                          );
                        })}
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
        <div className="p-2 border-t border-gray-200 min-w-64 flex-shrink-0">
          {isLoggedIn && userData ? (
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 transition-all duration-200 cursor-pointer flex-grow">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 flex-shrink-0">
                  <span className="text-gray-600 font-medium text-xs">
                    {userData.full_name ? userData.full_name.charAt(0) : "م"}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {userData.full_name || "المستخدم"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Handle logout
                    Cookies.remove("token");
                    Cookies.remove("user");
                    setIsLoggedIn(false);
                    setUserData(null);
                    navigate("/login");
                  }}
                  className="flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:bg-red-50 text-red-600"
                  title="تسجيل الخروج"
                >
                  <LogOut size={18} className="hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-1">
              <Link 
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-md"
              >
                <LogIn size={16} className="animate-pulse" />
                <span className="font-medium">تسجيل الدخول</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
