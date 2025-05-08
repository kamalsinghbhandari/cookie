import { NextResponse } from "next/server"

// Simple in-memory user database
const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123", // In production, this would be hashed
    name: "Admin User",
  },
  {
    id: "2",
    email: "niosdiscussion@gmail.com",
    password: "admin123", // In production, this would be hashed
    name: "NIOS Admin",
  },
]

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find user
    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Simple password check (in production, use proper password hashing)
    if (user.password !== password) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Create a simple token
    const token = Buffer.from(`${user.id}:${user.email}`).toString("base64")

    // Set cookie in the response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
