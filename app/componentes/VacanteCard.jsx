import Link from 'next/link';

export default function VacanteCard({
  id,
  titulo,
  empresa,
  ubicacion,
  fecha,
  destacada = false
}) {
  return (
    <div className={`border rounded-lg overflow-hidden ${destacada ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
      <div className="p-4">
        <h3 className="font-bold text-lg">{titulo}</h3>
        <p className="text-gray-600">{empresa} • {ubicacion}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">{fecha}</span>
          <Link 
            href={`/vacantes/${id}`}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ver más
          </Link>
        </div>
      </div>
      {destacada && (
        <div className="bg-blue-500 text-white px-4 py-1 text-sm">
          Destacada
        </div>
      )}
    </div>
  );
}