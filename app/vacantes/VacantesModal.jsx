"use client"

import { useState } from 'react';
import VacanteCard from '../componentes/VacanteCard';
import VacanteListado from '../componentes/VacanteListado';

function filtrarVacantesRecientes(vacantes, horas = 5) {
  const ahora = new Date();
  const limite = new Date(ahora.getTime() - horas * 60 * 60 * 1000);
  return vacantes.filter(vacante => {
    const fechaPublicacion = new Date(vacante.fecha_publicacion);
    return fechaPublicacion >= limite;
  });
}

export default function VacantesPage({ vacantes }) {
  const [busqueda, setBusqueda] = useState('');

  const vacantesFiltradas = vacantes.filter((vacante) => {
    const query = busqueda.toLowerCase();
    return (
      vacante.titulo.toLowerCase().includes(query) ||
      vacante.descripcion.toLowerCase().includes(query) ||
      vacante.domicilio.toLowerCase().includes(query) ||
      vacante.empresa_nombre.toLowerCase().includes(query)
    );
  });

  const vacantesRecientes = filtrarVacantesRecientes(vacantesFiltradas);
  const vacantesNoRecientes = vacantesFiltradas.filter(
    v => !vacantesRecientes.some(r => r.vacante_id === v.vacante_id)
  );

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar vacantes por título, empresa, descripción..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vacantes recientes */}
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

      {/* Vacantes no recientes */}
      <VacanteListado vacantes={vacantesNoRecientes} />
    </div>
  );
}
