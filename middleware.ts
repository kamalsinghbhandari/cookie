import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected routes
  const isAdminRoute = path.startsWith("/admin")
  const isApiAdminRoute = path.startsWith("/api/admin")
  const isUserRoute = path.startsWith("/dashboard")

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // If it's a protected route and there's no token, redirect to login
  if ((isAdminRoute || isUserRoute) && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }

  // For API routes, return 401 if no token
  if (isApiAdminRoute && !token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // If there's a token, verify it
  if (token && (isAdminRoute || isApiAdminRoute)) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as any

      // Check if user is admin for admin routes
      if ((isAdminRoute || isApiAdminRoute) && decoded.role !== "admin") {
        if (isApiAdminRoute) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        } else {
          return NextResponse.redirect(new URL("/", request.url))
        }
      }
    } catch (error) {
      // If token is invalid, redirect to login
      if (isApiAdminRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      } else {
        const url = new URL("/login", request.url)
        url.searchParams.set("callbackUrl", path)
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/dashboard/:path*"],
}
