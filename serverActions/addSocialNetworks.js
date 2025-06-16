"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function addSocialNetworks(id_usuario, { redSocial, link }) {
    try {
        await pool.query(querys.addSocialNetWorks, [id_usuario, redSocial, link]);
        return {
            ok: true,
            message: "Se ha añadido la red social"
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