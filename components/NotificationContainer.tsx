import React from 'react';
import Notification from './Notification';
import { NotificationData } from '../hooks/useNotifications';

interface NotificationContainerProps {
  notifications: NotificationData[];
  onRemoveNotification: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onRemoveNotification
}) => {
  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="flex flex-col gap-2 p-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              id={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              duration={notification.duration}
              onClose={onRemoveNotification}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
