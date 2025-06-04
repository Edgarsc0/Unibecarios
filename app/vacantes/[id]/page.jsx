import Link from "next/link";

const vacanteData = {
  1: {
    titulo: 'Becario en administración',
    empresa: 'Microsoft',
    ubicacion: 'Medio City Metropolitan Area',
    fecha: 'Décembre 22, 2024',
    descripcion: 'You will be part of a team of ServiceNow experts delivering ServiceNow solutions...',
    requisitos: [
      'Estudiante de administración',
      'Disponibilidad de horario',
      'Inglés intermedio'
    ]
  },
  2: {
    titulo: 'Becario de marketing',
    empresa: 'DiDi',
    ubicacion: 'Ciudad de México',
    fecha: 'Décembre 22, 2024',
    descripcion: 'You will be part of a team of ServiceNow experts delivering ServiceNow solutions...',
    requisitos: [
      'Estudiante de administración',
      'Disponibilidad de horario',
      'Inglés intermedio'
    ]
  }
};

export default function VacanteDetail({ params }) {
  const vacante = vacanteData[params.id];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{vacante.titulo}</h1>
            <h2 className="text-xl text-gray-600">{vacante.empresa}</h2>
            <p className="text-gray-500 mt-2">{vacante.ubicacion}</p>
          </div>
          <span className="text-sm text-gray-500">{vacante.fecha}</span>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold">Descripción del puesto</h3>
          <p className="text-gray-700">{vacante.descripcion}</p>

          <h3 className="text-lg font-semibold mt-6">Requisitos</h3>
          <ul className="list-disc pl-5">
            {vacante.requisitos.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={`/vacantes/aplicar/${params.id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Postularse
          </Link>
        </div>
      </div>
    </div>
  );
}