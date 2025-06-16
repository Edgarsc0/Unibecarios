"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function sendNotification(titulo, mensaje, usuario_id) {
    try {
        await pool.query(querys.addNotification, [titulo, mensaje, usuario_id]);
        return {
            ok: true
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