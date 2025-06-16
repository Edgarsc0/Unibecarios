"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function addVacante(vacanteInfo, enterpriseId) {
    const { titulo, domicilio, descripcion, fechaCierre, requisitos, estado } = vacanteInfo;

    try {
        await pool.query(querys.addVacante, [titulo, domicilio, descripcion, JSON.stringify(requisitos), fechaCierre, enterpriseId, estado]);

        return {
            ok: true,
            message: "Se ha añadido la vacante"
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