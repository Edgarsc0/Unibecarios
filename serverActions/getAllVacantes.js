import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function getAllVacantes() {
    try {
        const { rows } = await pool.query(querys.getAllVacantes);
        return {
            ok: true,
            vacantes: rows
        }
    } catch (error) {

        /**ERRORES TIPICOS DE RED RELACIONADOS CON BASE DE DATOS */
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

        return {
            ok: false,
            message: "Algo salio mal al obtener las vacantes",
            error: error.message
        }
    }
}