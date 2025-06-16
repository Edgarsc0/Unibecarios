"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys";

export async function getUserCV(idUsuario) {
    try {
        const result = await pool.query(querys.getUserCV, [idUsuario]);

        const buffer = result.rows[0]?.cv;

        if (!buffer) return { ok: true, message: "No hay cv cargado en base de datos." };

        const base64 = buffer.toString("base64");

        return {
            ok: true, cv: `data:application/pdf;base64,${base64}`
        };
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

        /**ERROR DESCONOCIDO */
        return {
            ok: false,
            message: "Ocurrió un error al obtener el cv.",
        };
    }
}