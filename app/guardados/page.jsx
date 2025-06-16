"use client"

import useSession from "@/hooks/useSession"
import LoadingOverlay from "../components/Loading";
import { useEffect, useState } from "react";
import { getVacantesGuardadas } from "@/serverActions/getVacantesGuardadas";
import VacanteCard from "../componentes/VacanteCard";
import toast from "react-hot-toast";

export default function () {

    const [vacantes, setVacantes] = useState(null);

    /**
     * const { ok, vacantesGuardadas , message} = await getVacantesGuardadas(session.userId);
    
                if (ok) {
                    toast.success("Se han obtenido las vacantes guardadas");
                    setVacantes(vacantesGuardadas);
                }else{
                    toast.error(message);
                }
     */

    const onSession = async (session) => {
        if (session) {
            const { ok, vacantesGuardadas, message } = await getVacantesGuardadas(session.userId);

            if (ok) {
                toast.success("Se han obtenido las vacantes guardadas");
                setVacantes(vacantesGuardadas);
            } else {
                toast.error(message);
            }
        }
    }

    const { session, loading } = useSession(onSession);

    if (loading) return <LoadingOverlay isActive={true} message="Cargando sesion..." />



    return <>
        {vacantes ? (
            <>
                {vacantes.length == 0 ? (
                    <p>No tienes vacantes guardadas</p>
                ) : (
                    <>
                        {vacantes.map(vacante => (
                            <VacanteCard key={vacante.vacante_id} vacante={vacante} isFromGuardados={true}></VacanteCard>
                        ))}
                    </>
                )}
            </>
        ) : (<p>Cargando</p>)}
    </>
}