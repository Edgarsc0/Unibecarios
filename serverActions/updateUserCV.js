"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function updateCV(_prevState, formData) {

    const { idUsuario } = _prevState;
    const cvFile = formData.get("cv");

    try {

        const arrayBuffer = await cvFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Ahora es un buffer para PostgreSQL

        await pool.query(querys.updateCV, [buffer, idUsuario]);

        return {
            ok: true,
            message: "Se actualizo correctamente el cv."
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
            message: "Ocurrió un error al actualizar el cv.",
        };
    }
}