"use server";

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";
import { sendNotification } from "./sendNotification";
import { getVacanteInfo } from "./getVacanteInfo";

export async function addPostulante(cv, aboutMe, userId, vacanteId) {
    try {
        if (!cv) {
            return {
                ok: false,
                message: "No se proporcionó ningún CV.",
            };
        }

        // Extraer base64 y convertirlo a buffer
        const base64Data = cv.split(",")[1];
        const cvBuffer = Buffer.from(base64Data, "base64");

        await pool.query(querys.addPostulante, [
            userId,
            vacanteId,
            cvBuffer,
            aboutMe,
        ]);

        const { ok } = await sendNotification(`CV enviado a la empresa ${(await getVacanteInfo(vacanteId)).vacante.empresa_nombre}`, "Recibiras una notificacion cuando la empresa revise tu CV.", userId);

        if (ok) {
            return {
                ok: true,
                message: "Se ha añadido tu registro.",
            };
        } else {
            throw new Error("Algo salio mal.");
        }


    } catch (error) {
        // Manejo de errores comunes de red
        if (error.code === "ECONNREFUSED") {
            return {
                ok: false,
                message:
                    "No se pudo conectar a la base de datos. Por favor intenta más tarde.",
            };
        }

        if (error.code === "ETIMEDOUT") {
            return {
                ok: false,
                message:
                    "La conexión a la base de datos expiró (timeout). Intenta de nuevo más tarde.",
            };
        }

        return {
            ok: false,
            message: "Algo salió mal.",
            error: error.message,
        };
    }
}
