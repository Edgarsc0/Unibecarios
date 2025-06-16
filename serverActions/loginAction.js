"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { isEnterpriseAccount } from "./isEnterpriseAccount";

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(_prevState, formData) {
    const email = formData.get("email")?.trim().toLowerCase();
    const password = formData.get("password")?.trim();

    if (!email || !password) {
        return {
            ok: false,
            message: "Porfavor llena todos los campos"
        };
    }

    try {
        const { rows } = await pool.query(querys.getUser, [email]);

        if (rows.length === 0 && !(await isEnterpriseAccount(email))) {
            return {
                ok: false,
                message: "No existe el usuario ingresado."
            }
        }

        const { account } = await isEnterpriseAccount(email);

        if (account) {
            const isValidPasswordFromEnterpriseAccount = await compare(password, account.password);

            if (!isValidPasswordFromEnterpriseAccount) {
                return {
                    ok: false,
                    message: "Contraseña incorrecta."
                }
            }

            const token = jwt.sign(
                {
                    adminId: account.id,
                    adminCompleteName: account.nombre,
                    email: account.email,
                    enterpriseId: account.empresa_id,
                    isAdmin: true
                },
                JWT_SECRET,
                { expiresIn: "2d" }
            );

            (await cookies()).set("session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24
            });

            return {
                ok: true,
                message: "Inicio de sesion exitoso.",
                isAdmin: true,
                enterpriseId: account.empresa_id
            }

        }

        const user = rows[0];
        const passwordIsValid = await compare(password, user.password);

        if (!passwordIsValid) {
            return {
                ok: false,
                message: "Contraseña incorrecta."
            }
        }

        const token = jwt.sign(
            {
                userId: user.id_usuario,
                userCompleteName: user.nombre,
                email: user.email,
                userCarrera: user.id_carrera,
                userUniversity: user.universidad_id,                
                isAdmin: false
            },
            JWT_SECRET,
            { expiresIn: "2d" }
        );

        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        return {
            ok: true,
            message: "Inicio de sesion exitoso.",
            isAdmin: false
        }
    } catch (error) {
        console.error("Error en login:", error);

        // Códigos comunes de error de red
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
            message: "Ocurrió un error inesperado. Intenta nuevamente.",
        };
    }
}