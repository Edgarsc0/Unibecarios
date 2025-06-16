"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";
import { hash } from "bcrypt";

export async function submitRegisterForm(_prevState, formData) {
    const nombre = formData.get("nombre")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    const cv = formData.get("cv");
    const id_universidad = JSON.parse(formData.get("universidad"))?.value;
    const id_carrera = JSON.parse(formData.get("carrera"))?.value;
    const habilidades = JSON.parse(formData.get("habilidades"))?.map(({ value }) => value);

    if (!cv || cv.type !== "application/pdf") {
        return { ok: false, message: "Solo se permiten archivos PDF" };
    }

    const hashedPassword = await hash(password, 10);
    const arrayBuffer = await cv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        await pool.query(querys.callProcedureUsuarioHabilidades, [nombre, email, hashedPassword, buffer, id_universidad, id_carrera, habilidades]);
        return {
            ok: true,
            message: "Registro correcto"
        };
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
            message: "Ocurrió un error al registrar el usuario.",
        };
    }
}