'use client';
import NotificationCard from './NotificationCard';

const mockNotifications = [
  {
    id: 'FI6-123',
    title: 'Bandeja de entrada',
    description: 'Tienes nuevos mensajes sin leer',
    date: 'Hoy, 10:30 AM',
    read: false
  },
  {
    id: 'FI6-122',
    title: 'CV subido correctamente',
    description: 'Tu CV ha sido procesado exitosamente',
    date: 'Ayer, 3:45 PM',
    read: true
  },
  {
    id: 'FI6-121',
    title: 'CV recibido por la empresa',
    description: 'Microsoft ha recibido tu aplicación',
    date: 'Ayer, 1:20 PM',
    read: true
  }
];

export default function NotificationList() {
  return (
    <div className="divide-y divide-gray-200">
      {mockNotifications.map(notification => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
}

