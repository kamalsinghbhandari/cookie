import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real implementation, you would:
    // 1. Retrieve the user from the database
    // 2. Compare the password with the stored hash
    // 3. Generate a session token or JWT

    // For now, we'll just simulate these steps with a hardcoded check
    if (email === "admin@example.com" && password === "password123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
        },
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
