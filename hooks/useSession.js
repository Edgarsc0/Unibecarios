// hooks/useSession.js
"use client";

import { useEffect, useState } from "react";

export default function useSession(onSession) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (onSession) {
            const run = async () => {
                try {
                    await onSession(session);
                } catch (error) {
                    console.error("Error en onSession:", error);
                }
            };
            run();
        }
    }, [session]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/session");
                if (res.ok) {
                    const data = await res.json();
                    setSession(data.user);
                } else {
                    setSession(null);
                }
            } catch (error) {
                console.error("Error al comprobar sesión:", error);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return { session, loading, isAuthenticated: !!session };
}
