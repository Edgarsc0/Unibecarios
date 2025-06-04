const notificationData = {
  'FI6-123': {
    title: 'Bandeja de entrada',
    content: 'Tienes 3 nuevos mensajes en tu bandeja de entrada. Por favor revisa las actualizaciones de tus postulaciones.',
    date: '10 de Mayo, 2023 - 10:30 AM',
    status: 'No leída',
    actions: ['Marcar como leída', 'Archivar']
  },
  'FI6-122': {
    title: 'CV subido correctamente',
    content: 'Tu curriculum vitae ha sido procesado exitosamente y está listo para ser enviado a las empresas.',
    date: '9 de Mayo, 2023 - 3:45 PM',
    status: 'Leída',
    actions: ['Reenviar', 'Actualizar CV']
  }
};

export default function NotificationDetail({ params }) {
  const notification = notificationData[params.id] || {
    title: 'Notificación no encontrada',
    content: 'La notificación solicitada no existe o ha sido eliminada.',
    date: '',
    status: '',
    actions: []
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{notification.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${notification.status === 'Leída' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
              {notification.status}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700">{notification.content}</p>
        </div>

        <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
          {notification.actions.map((action, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${index === 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
                }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}