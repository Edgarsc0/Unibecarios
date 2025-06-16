"use client"

import Link from 'next/link';

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from '@/components/ui/button';
import useSession from '@/hooks/useSession';
import LoadingOverlay from '../components/Loading';
import { addVacanteToGuardados } from '@/serverActions/addVacanteToGuardados';
import toast from 'react-hot-toast';
import { deleteFromGuardados } from '@/serverActions/deleteFromGuardados';

export default function VacanteCard({ vacante, isDestacada, isFromGuardados }) {

  const { session, loading } = useSession();

  if (loading) return <LoadingOverlay isActive={true} />

  const handleSaveVacante = async () => {
    const { ok, message } = await addVacanteToGuardados(vacante.vacante_id, session.userId);

    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  const handleEliminarGuardado = async (vacante_id) => {
    const { ok, message } = await deleteFromGuardados(vacante_id, session.userId);

    if (ok) {
      toast.success(message);
      window.location.reload();
    } else {
      toast.error(message);
    }
  }

  return (
    <div className={`border rounded-lg overflow-hidden border-blue-500 shadow-lg`}>
      <div className="p-4">
        <h3 className="font-bold text-lg">{vacante.titulo}</h3>
        <p className="text-gray-600">{vacante.empresa_nombre} • {vacante.domicilio}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(vacante.fecha_publicacion), { addSuffix: true, locale: es })}</span>
          <Link
            href={`/vacantes/${vacante.vacante_id}`}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ver más
          </Link>
          {isFromGuardados ? (
            <>
              {isFromGuardados ? (
                <Button onClick={() => handleEliminarGuardado(vacante.vacante_id)}>Eliminar</Button>
              ) : null}
            </>
          ) : (
            <Button onClick={handleSaveVacante}>
              Guardar
            </Button>
          )}
        </div>
      </div>
      {isDestacada ? (
        <div className="bg-blue-500 text-white px-4 py-1 text-sm">
          Se publico recientemente.
        </div>
      ) : null}
    </div>
  );
}