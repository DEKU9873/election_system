import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { notificationsReducer } from '../../../redux/notificationSlice';
import { NotificationProvider } from '../NotificationProvider';
import NotificationButton from '../NotificationButton';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// إعداد المتجر
const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

// تغليف المكونات بمزود Redux والإشعارات
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <NotificationProvider>
        {ui}
      </NotificationProvider>
    </Provider>
  );
};

describe('اختبار تكامل نظام الإشعارات مع الباك اند', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('يجب إرسال الإشعار بالتنسيق الصحيح إلى الباك اند', async () => {
    // تهيئة استجابة وهمية من الباك اند
    axios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        name: 'إشعار اختبار',
        message: 'هذا إشعار اختبار',
        type: 'info',
        send_to: 'all',
        created_at: new Date().toISOString(),
        read: false
      }
    });

    // عرض مكون زر الإشعارات
    renderWithProviders(<NotificationButton />);

    // فتح نموذج إضافة إشعار جديد
    const addButton = screen.getByTitle('إضافة إشعار جديد');
    fireEvent.click(addButton);

    // ملء النموذج
    const titleInput = screen.getByLabelText('عنوان الإشعار');
    const messageInput = screen.getByLabelText('رسالة الإشعار');
    const typeSelect = screen.getByLabelText('نوع الإشعار');
    const submitButton = screen.getByText('إرسال الإشعار');

    fireEvent.change(titleInput, { target: { value: 'إشعار اختبار' } });
    fireEvent.change(messageInput, { target: { value: 'هذا إشعار اختبار' } });
    fireEvent.change(typeSelect, { target: { value: 'info' } });

    // إرسال النموذج
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // التحقق من أن axios.post تم استدعاؤها بالبيانات الصحيحة
    expect(axios.post).toHaveBeenCalledWith('/api/notifications/', expect.objectContaining({
      name: 'إشعار اختبار',
      message: 'هذا إشعار اختبار',
      type: 'info',
      send_to: 'all',
      created_at: expect.any(String)
    }));
  });
});