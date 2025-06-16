"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function addVacanteToGuardados(vacante_id, usuario_id) {
    try {
        await pool.query(querys.addVacanteToGuardados, [usuario_id, vacante_id]);

        return {
            ok: true,
            message: "Se ha añadido la vacante a guardados"
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

        return {
            ok: false,
            message: "Ocurrio un error."
        }
    }
}