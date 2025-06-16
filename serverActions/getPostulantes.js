"use server";

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function getPostulantes(vacantes) {
    try {
        if (vacantes.length === 0) {
            return {
                ok: true,
                postulantes: [],
            };
        }

        const postulantes = await Promise.all(
            vacantes.map(async (vacante) => {
                const { rows } = await pool.query(querys.getPostulantes, [vacante.id]);
                return { vacante_id: vacante.id, postulantes: rows };
            })
        );

        return {
            ok: true,
            postulantes,
        };
    } catch (error) {
        console.error(error);

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
            message: "Ocurrió un error.",
        };
    }
}
