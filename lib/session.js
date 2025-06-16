// lib/session.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, SECRET);        
        return decoded;
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}
