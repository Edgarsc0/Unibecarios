"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function getVacanteInfo(id) {
    try {
        const { rows } = await pool.query(querys.getVacanteInfo, [id]);
        return {
            ok: true,
            vacante: rows[0]
        }
    } catch (error) {

        console.log(error);

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
            message: "Ocurrió un error al obtener la informacion de la vacante.",
        };
    }
}