"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function submitResidenciaForm(_prevState, formData) {

    const { idUsuario } = _prevState;
    const tel = formData.get("telefono")?.trim();
    const city = formData.get("Ciudad")?.trim();
    const gender = formData.get("genero")?.trim();

    try {
        await pool.query(querys.addPersonalInformation, [idUsuario, tel, city, gender]);
        return {
            ok: true,
            message: "Se ha actualizado la informacion."
        }
    } catch (error) {
        console.log("Ocurrio un error: " + error);

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
            message: "Ocurrió un error al registrar la informacion.",
        };
    }
}