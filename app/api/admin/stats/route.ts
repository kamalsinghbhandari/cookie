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

    // Get admin stats
    const stats = await db.admin.getStats()
    const recentForms = await db.admin.getRecentForms()

    return NextResponse.json({
      success: true,
      stats,
      recentForms,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin stats. Please try again later." },
      { status: 500 },
    )
  }
}
