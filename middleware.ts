import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/whatsapp", "/voice"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!PROTECTED.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const supabaseAuth = req.cookies.get("sb-access-token")?.value;
  const supabaseSession = [...req.cookies.getAll()].some((c) =>
    /^sb-.*-auth-token/.test(c.name),
  );
  const demoSession = req.cookies.get("splitko-demo-session")?.value;

  if (supabaseAuth || supabaseSession || demoSession) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/whatsapp/:path*", "/voice/:path*"],
};
