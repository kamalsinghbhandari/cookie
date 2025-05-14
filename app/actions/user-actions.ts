"use server"

import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { db } from "@/lib/db"

// Login action
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    // Find user in database
    const user = await db.users.findByEmail(email)

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Verify password
    const isPasswordValid = await db.users.verifyPassword(user, password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Generate JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production",
      { expiresIn: "7d" },
    )

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

// Register action
export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const institution = (formData.get("institution") as string) || ""

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Name, email, and password are required",
    }
  }

  try {
    // Check if user already exists
    const existingUser = await db.users.findByEmail(email)

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      }
    }

    // Create user in database
    const newUser = await db.users.create({
      name,
      email,
      password,
      institution,
      role: "student", // Default role
    })

    // Generate JWT token
    const token = sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production",
      { expiresIn: "7d" },
    )

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration",
    }
  }
}

// Logout action
export async function logout() {
  cookies().delete("auth-token")
  return {
    success: true,
  }
}

// Get current user action
export async function getCurrentUser() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    // Verify the token
    const decoded = sign.verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as any

    // Get user from database
    const user = await db.users.findByEmail(decoded.email)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
