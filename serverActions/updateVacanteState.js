"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function updateVacanteState(vacante_id, nuevoEstado) {
    try {
        await pool.query(querys.updateStateFromVacante, [nuevoEstado, vacante_id]);
        return {
            ok: true,
            message: "Se actualizo el estado de la vacante a " + nuevoEstado
        }
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return {
                ok: false,
                message: "No se pudo conectar a la base de datos. Por favor intenta más tarde.",
            };
        }

        if (error.code === "ETIMEDOUT") {
            return {
                ok: false,
                message: "La conexión a la base de datos expiró (timeout). Intenta de nuevo más tarde.",
            };
        }

        /**ERROR DESCONOCIDO */
        return {
            ok: false,
            message: "Ocurrió un error al actualizar el estado.",
        };
    }
}