import { NextResponse } from "next/server";

export function middleware(request) {
    const cookieSession = request.cookies.get("session")?.value;

    if (!cookieSession) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/";
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/trayectoria/:path*",
        "/vacantes/:path*",
        "/perfil/:path*",
        "/notificaciones/:path*",
        "/guardados/:path*",
    ]
};