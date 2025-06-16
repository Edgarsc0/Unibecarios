"use server"

import { pool } from "@/app/api/db";
import querys from "@/app/api/querys";

export async function getUserInfo(id_usuario) {
    try {
        const { rows } = await pool.query(querys.callGetUserFunction, [id_usuario]);
        return {
            ok: true,
            userInfo: rows[0]
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: `Algo salio mal: ${error}`
        }
    };
}