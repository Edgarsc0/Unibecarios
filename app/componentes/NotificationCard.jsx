'use client';

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function formatearFecha(fechaISO) {
  return formatDistanceToNow(new Date(fechaISO), {
    addSuffix: true,
    locale: es,
  });
}


export default function NotificationCard({ notification }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className={`font-medium text-blue-600`}>
          {notification.titulo}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{notification.mensaje}</p>
      </div>
      <span className="text-xs text-gray-500">{formatearFecha(notification.fecha)}</span>
    </div>
  );
}

