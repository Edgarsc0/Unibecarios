"use client"

import useSession from '@/hooks/useSession';
import NotificationList from '../componentes/NotificationList';
import { getUserNotifications } from '@/serverActions/getUserNotifications';
import { useState } from 'react';
import LoadingOverlay from '../components/Loading';
import toast from 'react-hot-toast';

export default function Notificaciones() {

  const [notifications, setNotifications] = useState(null);

  const onSession = async (session) => {
    if (session) {
      const { ok, notifications } = await getUserNotifications(session.userId);
      if (ok) {
        console.log(notifications);
        toast.success("Se han cargado las notificaciones")
        setNotifications(notifications);
      } else {
        toast.error(message);
      }
    }
  };

  const { session, loading } = useSession(onSession);

  if (loading || !notifications)
    return <LoadingOverlay isActive={true} message="Cargando..." />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">NOTIFICACIONES</h1>

      {notifications ? (
        <div className="bg-white rounded-lg shadow">
          <NotificationList notifications={notifications} />
        </div>
      ) : (<p>Cargando... </p>)}
    </div>
  );
}