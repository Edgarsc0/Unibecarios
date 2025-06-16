"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys";
import { sendNotification } from "./sendNotification";

export async function changePostulanteEstado(cv_postulante_id, nuevoEstado, usuario_id) {
    try {
        await pool.query(querys.updatePostulanteEstado, [nuevoEstado, cv_postulante_id]);

        let titulo, mensaje;
        switch (nuevoEstado) {
            case "Aceptar":
                titulo = "La empresa ha aceptado tu CV. Felicidades."
                mensaje = "Han revisado tu cv y lo han aceptado."
                break;
            case "Descartar":
                titulo = "La empresa ha descartado tu CV."
                mensaje = "Han revisado tu cv y lo han descartado."
                break;
            case "Pendiente por revisar":
                titulo = "La empresa ha cambiado el estado de tu solicitud."
                mensaje = "La empresa ha cambiado el estado de tu cv a 'Pendiente por revisar'"
                break;
        }

        const { ok, message } = await sendNotification(titulo, mensaje, usuario_id);

        if (ok) {
            return {
                ok: true,
                message: "Se ha cambiado el estado a " + nuevoEstado
            }
        } else {
            throw new Error(message);
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
            message: "Ocurrió un error al actualizar el dato.",
        };
    }
}