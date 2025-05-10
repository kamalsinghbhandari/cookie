import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as any

    // Check if user is admin
    if (decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Get all forms
    const forms = await db.forms.findAll(limit, offset)

    return NextResponse.json({
      success: true,
      forms,
    })
  } catch (error) {
    console.error("Error fetching forms:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch forms. Please try again later." },
      { status: 500 },
    )
  }
}
