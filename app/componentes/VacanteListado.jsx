import VacanteCard from './VacanteCard';

export default function VacanteListado({ vacantes }) {
  return (
    <section>
      {vacantes.length == 0 ? (
        null
      ) : (
        <h2 className="text-xl font-semibold mb-4">Otras vacantes disponibles</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacantes.map(vacante => (
          <VacanteCard key={vacante.vacante_id} vacante={vacante} />
        ))}
      </div>
    </section>
  );
}