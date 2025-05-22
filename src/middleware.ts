import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const SECRET = Buffer.from(process.env.JWT_SECRET!, "base64");
    const { payload } = await jwtVerify(token, SECRET);

    const isAdmin =
      Array.isArray(payload.role) &&
      payload.role.some((r: {authority: string}) => r.authority === "ADMIN");

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
  return;
}

export const config = {
  matcher: ["/admin/:path*"],
};
