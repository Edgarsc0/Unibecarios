"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function updateVacante(vacante) {
    const { id, titulo, domicilio, descripcion, requisitos, fecha_cierre } = vacante;

    try {
        await pool.query(querys.updateVacante, [titulo, domicilio, descripcion, requisitos, fecha_cierre, id]);
        return {
            ok: true,
            message: "Se ha actualizado la vacante"
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