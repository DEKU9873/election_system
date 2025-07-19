import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
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
  LayoutDashboard,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
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
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["system_admin", "owner", "coordinator", "observer"],
    },
    {
      id: "voters",
      label: "الناخبين",
      icon: UserCheck,
      href: "/elected",
      roles: ["system_admin", "owner", "coordinator", "observer"],
    },
    {
      id: "monitors",
      label: "المراقبين",
      icon: UserCog,
      href: "/monitors",
      roles: ["system_admin", "owner", "coordinator"],
    },
    {
      id: "coordinators",
      label: "المرتكزين",
      icon: Briefcase,
      href: "/coordinators",
      roles: ["system_admin", "owner"],
    },
    {
      id: "centers",
      label: "إدارة المراكز",
      icon: Building,
      roles: ["system_admin", "owner", "observer", "coordinator"],
      submenu: [
        {
          id: "centers",
          label: "المراكز الانتخابية",
          href: "/centers",
          icon: Landmark,
          roles: ["system_admin", "owner", "observer", "coordinator"],
        },
        {
          id: "governorates",
          label: "المحافظات",
          href: "/governorate",
          icon: Map,
          roles: ["system_admin", "owner", "observer", "coordinator"],
        },
        {
          id: "districts",
          label: "الأقضية",
          href: "/districts",
          icon: MapPin,
          roles: ["system_admin", "owner", "observer", "coordinator"],
        },
        {
          id: "sub-districts",
          label: "النواحي",
          href: "/subdistricts",
          icon: MapPin,
          roles: ["system_admin", "owner", "observer", "coordinator"],
        },
        {
          id: "center-managers",
          label: "مدراء المراكز",
          href: "/centerManagers",
          icon: UserCog,
          roles: ["system_admin", "owner"],
        },
        {
          id: "district-managers",
          label: "مدراء الأقضية",
          href: "/districtsManagers",
          icon: UserCog,
          roles: ["system_admin", "owner"],
        },
      ],
    },
    {
      id: "electoralStrips",
      label: "الاشرطة الانتخابية",
      icon: FileText,
      href: "/electoralStrips",
      roles: ["system_admin", "owner", "observer"],
    },
    {
      id: "financial",
      label: "الحسابات",
      icon: DollarSign,
      roles: ["system_admin", "owner"],
      submenu: [
        {
          id: "FinanceCapitals",
          label: "رؤوس الاموال",
          href: "/financeCapitals",
          icon: PieChart,
          roles: ["system_admin", "owner"],
        },
        {
          id: "Expenses",
          label: "المصروفات",
          href: "/expense",
          icon: PieChart,
          roles: ["system_admin", "owner"],
        },
        {
          id: "financial-statistics",
          label: "الإحصائيات المالية",
          href: "/financial-statistics",
          icon: PieChart,
          roles: ["system_admin", "owner"],
        },
      ],
    },
    {
      id: "users",
      label: "المستخدمين",
      icon: Users,
      href: "/users",
      roles: ["system_admin", "owner"],
    },
    {
      id: "usersMap",
      label: "خريطة المستخدمين",
      icon: MapPin,
      href: "/usersMap",
      roles: ["system_admin", "owner"],
    },
    {
      id: "log",
      label: "سجل الاحداث",
      icon: FileText,
      href: "/log",
      roles: ["system_admin", "owner"],
    },
  ];

  // فلترة العناصر حسب الدور
  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    if (!userData?.role) return false;
    return item.roles.includes(userData.role);
  });

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
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    setTimeout(() => {
      closeSidebar();
    }, 150);
  };

  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [location.pathname, isMobile]);

  return (
    <div dir="rtl" className="font-['Cairo',_'Segoe_UI',_Tahoma,_sans-serif]">
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 bg-white border-b border-gray-200 z-50 py-3 transition-all duration-500 "
        style={{
          right: isOpen && !isMobile ? "16rem" : "0",
          width: "auto",
          left: "0",
        }}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-sm flex items-center justify-center"
              title="فتح القائمة"
              style={{ display: isOpen ? "none" : "flex" }}
            >
              <Menu
                size={22}
                className="text-blue-600 transition-all duration-300 transform hover:rotate-12"
              />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 font-['Cairo']">
              {filteredMenuItems.find((item) => item.id === activeItem)?.label ||
                "لوحة التحكم"}
            </h1>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-min ">
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
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black z-30 md:hidden transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-l border-gray-200 transition-all duration-500 ease-in-out flex flex-col z-40 shadow-lg ${
          isMobile
            ? `fixed right-0 top-16 h-[calc(100%-4rem)] w-64 transform ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-90"
              }`
            : `fixed right-0 top-0 h-full transform ${
                isOpen ? "w-64 translate-x-0 opacity-100" : "w-0 translate-x-16 opacity-0 overflow-hidden"
              }`
        }`}
      >
        {/* Header with Logo */}
        <div className="border-b border-gray-200 min-w-64 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={closeSidebar}
              className="absolute left-4 top-4 p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 text-blue-600 hover:scale-105 hover:shadow-sm flex items-center justify-center"
              title="إغلاق القائمة"
            >
              <X size={20} className="transform transition-all duration-300 hover:rotate-90" />
            </button>
            <div className="flex flex-col items-center gap-2 flex-1 justify-center">
              <img
                src={logo}
                alt="شعار الشركة"
                className="h-22 w-auto transition-all duration-500 hover:scale-105 filter drop-shadow-md"
              />
              <span className="font-bold text-lg text-gray-800 transition-all duration-300 hover:text-blue-600">
                نظام حملتي
              </span>
            </div>
          </div>
        </div>

        {/* Navigation with scroll */}
        <nav className="flex-1 min-w-64 overflow-y-auto pt-4">
          <div className="px-4 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;

              // فلترة العناصر الفرعية حسب الدور
              const filteredSubmenu =
                item.submenu?.filter(
                  (subItem) =>
                    !subItem.roles ||
                    (userData?.role && subItem.roles.includes(userData.role))
                ) || [];

              if (filteredSubmenu.length === 0 && item.submenu) {
                return null; // إذا لم يكن هناك عناصر فرعية مناسبة لا نعرضه
              }

              if (item.submenu && filteredSubmenu.length > 0) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                      }
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                        activeItem === item.id
                          ? "bg-blue-50 text-blue-700"
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
                        {filteredSubmenu.map((subItem) => {
                          const SubIcon = subItem.icon || null;
                          return (
                            <Link
                              key={subItem.id}
                              to={subItem.href}
                              onClick={handleMenuItemClick}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                                activeItem === subItem.id
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {SubIcon && (
                                <SubIcon
                                  size={16}
                                  className={`transition-all duration-200 ${
                                    activeItem === subItem.id
                                      ? "text-blue-600"
                                      : "text-gray-500"
                                  }`}
                                />
                              )}
                              <span className="font-medium">
                                {subItem.label}
                              </span>
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
                  onClick={handleMenuItemClick}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-700"
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
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 transition-all duration-200 cursor-pointer flex-grow">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <span className="text-gray-600 font-medium text-xs">
                  {userData?.full_name ? userData?.full_name.charAt(0) : "م"}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {userData?.full_name || "المستخدم"}
                </p>
              </div>
              <button
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("user");
                  setIsLoggedIn(false);
                  setUserData(null);
                  navigate("/login");
                }}
                className="flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:bg-red-50 text-red-600"
                title="تسجيل الخروج"
              >
                <LogOut
                  size={18}
                  className="hover:scale-110 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
