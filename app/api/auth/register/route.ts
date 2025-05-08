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
    const { name, email, password, phone } = body

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      email,
      password, // In production, this would be hashed
      name,
      phone,
    }

    users.push(newUser)

    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to register. Please try again later." },
      { status: 500 },
    )
  }
}
