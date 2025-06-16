import VacanteCard from '../componentes/VacanteCard';
import VacanteListado from '../componentes/VacanteListado';


function filtrarVacantesRecientes(vacantes, horas = 5) {
  const ahora = new Date();
  const limite = new Date(ahora.getTime() - horas * 60 * 60 * 1000); // horas → ms

  return vacantes.filter(vacante => {
    const fechaPublicacion = new Date(vacante.fecha_publicacion);
    return fechaPublicacion >= limite;
  });
}

export default function VacantesPage({ vacantes }) {

  const vacantesRecientes = filtrarVacantesRecientes(vacantes);

  const vacantesNoRecientes = vacantes.filter(
    v => !vacantesRecientes.some(r => r.vacante_id === v.vacante_id)
  );


  return (
    <div className="container mx-auto py-8 px-4">
      {vacantesRecientes.length !== 0 && (
        <>
          <h1 className="text-3xl font-bold mb-6">Vacantes publicadas recientemente</h1>
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vacantesRecientes.map(vacante => (
                <VacanteCard key={vacante.vacante_id} vacante={vacante} isDestacada={true} />
              ))}
            </div>
          </section>
        </>
      )}
      <VacanteListado vacantes={vacantesNoRecientes} />
    </div>
  );
}