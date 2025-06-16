"use server"

import { pool } from "@/app/api/db"
import querys from "@/app/api/querys"

export async function isEnterpriseAccount(email) {
    try {
        const { rows } = await pool.query(querys.selectAdministratorAccount, [email]);

        if (rows.length == 0) return false;

        return { ok: true, account: rows[0] };
    } catch (error) {
        console.log(error);
        return { ok: false, error }
    }
}