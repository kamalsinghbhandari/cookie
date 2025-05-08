import { NextResponse } from "next/server"

// Simple in-memory urgent queries database
const urgentQueries = []

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, query, timestamp } = body

    // Store the urgent query
    const newQuery = {
      id: String(urgentQueries.length + 1),
      email,
      query,
      timestamp: new Date(timestamp),
      resolved: false,
    }

    urgentQueries.push(newQuery)

    return NextResponse.json({
      success: true,
      message: "Urgent query sent successfully",
    })
  } catch (error) {
    console.error("Error sending urgent query:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send urgent query. Please try again later." },
      { status: 500 },
    )
  }
}
