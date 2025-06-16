"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function getUniversidades() {
    try {
        const { rows } = await pool.query(querys.getUniversidades);
        return {
            ok: true,
            response: rows
        };
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

        return {
            ok: false,
            message: "Algo salio mal al obtener las universidades",
            error: error.message
        }
    }
}
