import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, institution } = body

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const user = await db.users.create({
      name,
      email,
      password,
      institution,
    })

    // Send welcome email with login credentials
    try {
      await sendWelcomeEmail({
        name,
        email,
        password, // This is the plain text password before hashing
      })
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Continue with registration even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
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
