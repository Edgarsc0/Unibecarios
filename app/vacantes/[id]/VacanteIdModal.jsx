import Link from "next/link";

export default function VacanteDetail({ vacanteInfo }) {

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{vacanteInfo.titulo}</h1>
            <h2 className="text-xl text-gray-600">{vacanteInfo.empresa_nombre}</h2>
            <p className="text-gray-500 mt-2">{vacanteInfo.domicilio}</p>
          </div>
          {/*<span className="text-sm text-gray-500">{formatDistanceToNow(new Date(vacanteInfo.fecha_publicacion), { addSuffix: true, locale: es })}</span>*/}
        </div>

        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold">Descripción del puesto</h3>
          <p className="text-gray-700">{vacanteInfo.descripcion}</p>

          <h3 className="text-lg font-semibold mt-6">Requisitos</h3>
          <ul className="list-disc pl-5">
            {JSON.parse(vacanteInfo.requisitos).map((req, index) => (
              <li key={index} className="text-gray-700">{req.texto}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={`/vacantes/aplicar/${vacanteInfo.vacante_id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Postularse
          </Link>
        </div>
      </div>
    </div>
  );
}