import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export async function GET(request: Request) {
  try {
    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as any

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        institution: decoded.institution,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch user data. Please try again later." },
      { status: 500 },
    )
  }
}
