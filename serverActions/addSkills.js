"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function addSkills(skills, id_usuario) {   
    try {
        const valuesString = skills
            .map(h => `(${id_usuario}, ${h.value})`)
            .join(", ");        
        await pool.query(`${querys.addSkills} ${valuesString}`);
        return {
            ok: true,
            message: "Habilidades actualizadas"
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