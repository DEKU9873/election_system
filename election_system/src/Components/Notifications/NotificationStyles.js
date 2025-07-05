// أنماط مكونات الإشعارات
// يمكن استيراد هذا الملف في أي مكون إشعارات لاستخدام الأنماط الموحدة

// أنماط حاوية الإشعارات
export const notificationContainerStyles = {
  fixed: 'fixed top-20 left-4 z-50 max-w-sm',
  toast: 'bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 transform translate-y-0 opacity-100',
  content: 'p-4',
};

// أنماط أيقونات الإشعارات حسب النوع
export const notificationIconStyles = {
  container: 'w-8 h-8 rounded-full flex items-center justify-center',
  icon: {
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    voter: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    center: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
    report: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    monitor: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
    system: {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
    },
  },
};

// أنماط عناصر الإشعارات
export const notificationElementStyles = {
  container: 'flex items-start',
  iconContainer: 'flex-shrink-0',
  contentContainer: 'mr-3 flex-1',
  header: 'flex items-center justify-between',
  title: {
    base: 'text-sm font-medium',
    read: 'text-gray-900',
    unread: 'text-blue-800',
  },
  message: 'mt-1 text-sm text-gray-600',
  time: 'text-xs text-gray-500',
  actions: 'mt-2 flex space-x-3 rtl:space-x-reverse',
  actionButton: 'text-xs font-medium text-blue-600 hover:text-blue-500',
  deleteButton: 'text-xs font-medium text-red-600 hover:text-red-500',
  closeButton: 'flex-shrink-0 text-gray-400 hover:text-gray-500',
  actionButtons: 'mr-4 flex-shrink-0 flex items-center space-x-2 rtl:space-x-reverse',
  iconButton: 'p-1 rounded-full hover:bg-gray-200 transition-colors duration-200',
  checkIcon: 'text-green-600',
  trashIcon: 'text-red-600',
};

// أنماط قائمة الإشعارات
export const notificationListStyles = {
  wrapper: 'bg-white shadow rounded-lg overflow-hidden',
  container: 'space-y-4',
  list: 'divide-y divide-gray-200',
  listItem: 'p-4 hover:bg-gray-50 transition-colors duration-200',
  unreadItem: 'bg-blue-50',
  readItem: 'opacity-70',
  emptyContainer: 'p-8 text-center',
  emptyIconContainer: 'mx-auto w-16 h-16 mb-4 flex items-center justify-center',
  emptyTitle: 'text-lg font-medium text-gray-900 mb-1',
  emptyText: 'text-gray-500',
  borderColors: {
    info: 'border-blue-500',
    warning: 'border-yellow-500',
    success: 'border-green-500',
    error: 'border-red-500',
    voter: 'border-blue-500',
    center: 'border-purple-500',
    report: 'border-green-500',
    monitor: 'border-orange-500',
    system: 'border-red-500',
    default: 'border-gray-500'
  },
  item: {
    base: 'p-4 hover:bg-gray-50 transition-colors duration-200',
    unread: 'bg-blue-50',
  },
};

// أنماط شارة الإشعارات (للعرض في الشريط الجانبي)
export const notificationBadgeStyles = {
  container: 'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center',
};

// أنماط زر إضافة إشعار تجريبي
export const notificationButtonStyles = {
  container: 'fixed bottom-4 left-4 z-50',
  button: 'bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors duration-200',
  icon: 'h-6 w-6',
};

// أنماط صفحة الإشعارات
export const notificationPageStyles = {
  pageContainer: 'min-h-screen bg-gray-50',
  pageContent: 'pt-16 pb-12 px-4 sm:px-6 lg:px-8',
  contentWrapper: 'max-w-4xl mx-auto',
  container: 'container mx-auto px-4 py-8',
  header: 'flex items-center justify-between mb-6',
  title: 'text-2xl font-bold text-gray-900',
  headerActions: 'flex items-center space-x-4 rtl:space-x-reverse',
  unreadCount: 'text-sm text-gray-500',
  markAllButton: 'text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200',
};

// دالة مساعدة للحصول على أنماط الأيقونة حسب النوع
export const getIconStylesByType = (type) => {
  const iconType = notificationIconStyles.icon[type] || notificationIconStyles.icon.default;
  return {
    container: `${notificationIconStyles.container} ${iconType.bg}`,
    icon: iconType.text,
  };
};