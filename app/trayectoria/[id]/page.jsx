import carrerasData from './Carreras.json';

const data = carrerasData

export default async function TrayectoriaPage({ params }) {  

  const { id } = await params;

  const carrera = data.carreras_academicas.find(
    (c) =>
      c.valor?.toLowerCase() === id.toLowerCase() ||
      c.id?.toLowerCase() === id.toLowerCase()
  );

  if (!carrera) {
    return <div className="p-6">Carrera no encontrada</div>;
  }

  const {
    area,
    descripcion,
    perfil_egreso,
    areas_trabajo,
    salario_promedio,
    certificaciones_recomendadas,
    trayectoria
  } = carrera;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Título y descripción */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{area}</h1>
        <p className="text-lg text-gray-700">{descripcion}</p>
      </div>

      {/* Perfil de egreso */}
      {perfil_egreso && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Perfil de Egreso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Hard Skills:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {perfil_egreso.hard_skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Soft Skills:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {perfil_egreso.soft_skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Áreas de trabajo */}
      {areas_trabajo && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Áreas de Trabajo</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Sectores:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {areas_trabajo.sectores.map((sector, i) => (
                  <li key={i}>{sector}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Puestos:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {areas_trabajo.puestos.map((puesto, i) => (
                  <li key={i}>{puesto}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Empresas:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {areas_trabajo.empresas.map((empresa, i) => (
                  <li key={i}>{empresa}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Salario y certificaciones */}
      <div className="grid md:grid-cols-2 gap-6">
        {salario_promedio && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Salario Promedio</h2>
            <p className="text-lg">{salario_promedio}</p>
          </div>
        )}
        {certificaciones_recomendadas && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Certificaciones Recomendadas</h2>
            <ul className="list-disc pl-5 space-y-1">
              {certificaciones_recomendadas.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Trayectoria académica */}
      {trayectoria && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Trayectoria Académica</h2>

          {/* Primeros semestres */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{trayectoria.primeros_semestres.titulo}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {trayectoria.primeros_semestres.materias.map((materia, i) => (
                <li key={i}>{materia}</li>
              ))}
            </ul>
          </div>

          {/* Semestres intermedios */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{trayectoria.semestres_intermedios.titulo}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {trayectoria.semestres_intermedios.materias.map((materia, i) => (
                <li key={i}>{materia}</li>
              ))}
            </ul>
          </div>

          {/* Semestres avanzados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{trayectoria.semestres_avanzados.titulo}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {trayectoria.semestres_avanzados.materias.map((materia, i) => (
                <li key={i}>{materia}</li>
              ))}
            </ul>
            {trayectoria.semestres_avanzados.culminacion && (
              <p className="mt-3 text-gray-600">
                <strong>Culminación:</strong> {trayectoria.semestres_avanzados.culminacion}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}