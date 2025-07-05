import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../../../redux/notificationsSlice';
import { NotificationProvider } from '../NotificationProvider';
import NotificationToast from '../NotificationToast';
import NotificationIcon from '../NotificationIcon';
import NotificationsPage from '../../../pages/Notifications/NotificationsPage';

// إنشاء متجر Redux للاختبار
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState,
  });
};

// مكون للاختبار يستخدم useNotifications
const TestComponent = () => {
  const { createNotification } = useNotifications();
  
  return (
    <button 
      onClick={() => createNotification({
        type: 'info',
        title: 'عنوان اختبار',
        message: 'رسالة اختبار',
      })}
      data-testid="add-notification-btn"
    >
      إضافة إشعار
    </button>
  );
};

// غلاف للاختبار
const renderWithProviders = (ui, { preloadedState = {}, ...renderOptions } = {}) => {
  const store = createTestStore(preloadedState);
  
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </Provider>
    );
  };
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

describe('نظام الإشعارات', () => {
  test('يجب أن يعرض NotificationIcon الأيقونة الصحيحة بناءً على النوع', () => {
    render(<NotificationIcon type="info" />);
    const iconContainer = screen.getByRole('generic');
    expect(iconContainer).toHaveClass('bg-blue-100');
  });
  
  test('يجب أن يضيف TestComponent إشعارًا جديدًا عند النقر على الزر', async () => {
    const { store } = renderWithProviders(<TestComponent />);
    
    const button = screen.getByTestId('add-notification-btn');
    fireEvent.click(button);
    
    const state = store.getState().notifications;
    expect(state.notifications.length).toBe(1);
    expect(state.notifications[0].title).toBe('عنوان اختبار');
    expect(state.unreadCount).toBe(1);
  });
  
  test('يجب أن يعرض NotificationToast الإشعار الأحدث غير المقروء', async () => {
    const preloadedState = {
      notifications: {
        notifications: [
          {
            id: 1,
            title: 'إشعار قديم',
            message: 'هذا إشعار قديم',
            type: 'info',
            read: true,
            time: '2023-01-01',
          },
          {
            id: 2,
            title: 'إشعار جديد',
            message: 'هذا إشعار جديد',
            type: 'success',
            read: false,
            time: '2023-01-02',
          },
        ],
        unreadCount: 1,
      },
    };
    
    renderWithProviders(<NotificationToast />, { preloadedState });
    
    // انتظار ظهور الإشعار
    await screen.findByText('إشعار جديد');
    expect(screen.getByText('هذا إشعار جديد')).toBeInTheDocument();
  });
  
  test('يجب أن تعرض NotificationsPage قائمة الإشعارات', async () => {
    const preloadedState = {
      notifications: {
        notifications: [
          {
            id: 1,
            title: 'إشعار 1',
            message: 'محتوى الإشعار 1',
            type: 'info',
            read: false,
            time: '2023-01-01',
          },
          {
            id: 2,
            title: 'إشعار 2',
            message: 'محتوى الإشعار 2',
            type: 'warning',
            read: true,
            time: '2023-01-02',
          },
        ],
        unreadCount: 1,
      },
    };
    
    renderWithProviders(<NotificationsPage />, { preloadedState });
    
    expect(screen.getByText('إشعار 1')).toBeInTheDocument();
    expect(screen.getByText('محتوى الإشعار 1')).toBeInTheDocument();
    expect(screen.getByText('إشعار 2')).toBeInTheDocument();
    expect(screen.getByText('محتوى الإشعار 2')).toBeInTheDocument();
    expect(screen.getByText('1 إشعارات غير مقروءة')).toBeInTheDocument();
  });
  
  test('يجب أن تعمل وظيفة تحديد الكل كمقروء', async () => {
    const preloadedState = {
      notifications: {
        notifications: [
          { id: 1, title: 'إشعار 1', read: false },
          { id: 2, title: 'إشعار 2', read: false },
        ],
        unreadCount: 2,
      },
    };
    
    const { store } = renderWithProviders(<NotificationsPage />, { preloadedState });
    
    const markAllAsReadButton = screen.getByText('تحديد الكل كمقروء');
    fireEvent.click(markAllAsReadButton);
    
    const state = store.getState().notifications;
    expect(state.notifications.every(n => n.read)).toBe(true);
    expect(state.unreadCount).toBe(0);
  });
});