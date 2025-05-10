import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { db } from "@/lib/db"

export async function POST(request: Request) {
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

    // Get the form data
    const body = await request.json()
    const { formType, visible, session, deadline } = body

    // Update the form visibility
    const updatedVisibility = await db.formVisibility.update(
      formType,
      visible,
      session,
      deadline ? new Date(deadline) : undefined,
    )

    return NextResponse.json({
      success: true,
      message: "Form visibility updated successfully",
      visibility: updatedVisibility[0],
    })
  } catch (error) {
    console.error("Error updating form visibility:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update form visibility. Please try again later." },
      { status: 500 },
    )
  }
}
