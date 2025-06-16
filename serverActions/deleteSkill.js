"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function deleteSkill(id_usuario, id_habilidad) {
    try {
        await pool.query(querys.deleteSkill, [id_usuario, id_habilidad]);
        return {
            ok: true,
            message: `Se elimino de la base de datos la habilidad`
        };
    } catch (error) {
        console.log(error);

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
            message: "Algo salio mal al borrar la habilidad",
            error: error.message
        }
    }
}