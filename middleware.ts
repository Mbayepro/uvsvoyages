import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger uniquement les routes sous /admin (sauf /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authCookie = request.cookies.get("admin_auth")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Si pas de cookie ou cookie invalide, rediriger vers le login
    if (!authCookie || authCookie !== adminPassword) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configurer le matcher pour ne s'exécuter que sur /admin/...
export const config = {
  matcher: ["/admin/:path*"],
};
