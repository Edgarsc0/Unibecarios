'use client';
import NotificationCard from './NotificationCard';

export default function NotificationList({ notifications }) {
  return (
    <div className="divide-y divide-gray-200">
      {notifications.length == 0 ? (
        <p>No tienes notificaciones por el momento</p>
      ) : (
        <>
          {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </>
      )
      }
    </div >
  );
}

