import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const formVisibility = await db.formVisibility.getAll()

    return NextResponse.json({
      success: true,
      formVisibility,
    })
  } catch (error) {
    console.error("Error fetching form visibility:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch form visibility. Please try again later." },
      { status: 500 },
    )
  }
}
