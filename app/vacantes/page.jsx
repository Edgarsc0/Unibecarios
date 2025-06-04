import VacanteCard from '../componentes/VacanteCard';
import VacanteListado from '../componentes/VacanteListado';

const vacantesDestacadas = [
  {
    id: '1',
    titulo: 'Becario en administración',
    empresa: 'Microsoft',
    ubicacion: 'Medio City Metropolitan Area',
    fecha: 'Actualizado hace 2 días',
    destacada: true
  },
  // ... más vacantes
];

export default function VacantesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">VACANTES DESTACADAS</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Te podría interesar...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vacantesDestacadas.map(vacante => (
            <VacanteCard key={vacante.id} {...vacante} />
          ))}
        </div>
      </section>

      <VacanteListado />
    </div>
  );
}