import { useState, useCallback } from 'react';
import { NotificationProps } from '../components/Notification';

export interface NotificationData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback((
    type: NotificationData['type'],
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: NotificationData = {
      id,
      type,
      title,
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((title: string, message?: string, duration?: number) => {
    addNotification('success', title, message, duration);
  }, [addNotification]);

  const showError = useCallback((title: string, message?: string, duration?: number) => {
    addNotification('error', title, message, duration);
  }, [addNotification]);

  const showWarning = useCallback((title: string, message?: string, duration?: number) => {
    addNotification('warning', title, message, duration);
  }, [addNotification]);

  const showInfo = useCallback((title: string, message?: string, duration?: number) => {
    addNotification('info', title, message, duration);
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
