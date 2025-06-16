"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function addIdiomas(idiomas, id_usuario) {
    try {
        const valuesString = idiomas
            .map(h => `(${id_usuario}, ${h.value})`)
            .join(", ");

        await pool.query(`${querys.addIdiomas} ${valuesString}`);
        return {
            ok: true,
            message: "Idiomas actualizados"
        };
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