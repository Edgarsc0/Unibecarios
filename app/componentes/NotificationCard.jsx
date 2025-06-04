'use client';
import Link from 'next/link';

export default function NotificationCard({
  id,
  title,
  description,
  date,
  read
}) {
  return (
    <Link
      href={`/notificaciones/${id}`}
      className={`block p-4 border-b hover:bg-gray-50 transition ${read ? 'bg-white' : 'bg-blue-50'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium ${read ? 'text-gray-700' : 'text-blue-600'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </Link>
  );
}

