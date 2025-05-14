import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname

  // Only run this middleware for admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const cookies = request.headers.get("cookie") || ""
  const tokenCookie = cookies.split("; ").find((c) => c.startsWith("auth-token="))
  const token = tokenCookie?.split("=")[1]

  if (!token) {
    // Redirect to login page if no token is found
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify the token
    const secret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"
    const decoded = verify(token, secret) as any

    // Check if user is admin
    if (decoded.role !== "admin") {
      // Redirect to dashboard if user is not admin
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Continue to admin page if user is admin
    return NextResponse.next()
  } catch (error) {
    // Redirect to login page if token is invalid
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
