"use server"

import { cookies } from "next/headers"

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

// Simple token generation function
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

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
    // Find user
    const user = users.find((u) => u.email === email)

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Simple password check (in production, use proper password hashing)
    if (user.password !== password) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Generate a token
    const token = generateToken()

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
  const phone = formData.get("phone") as string

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Name, email, and password are required",
    }
  }

  try {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      }
    }

    // Create user
    const newUser = {
      id: String(users.length + 1),
      email,
      password, // In production, this would be hashed
      name,
      phone,
    }

    users.push(newUser)

    // Generate a token
    const token = generateToken()

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

  // In a real implementation, you would verify the token
  // and fetch the user from the database
  // For now, we'll just return a dummy user
  return {
    id: "1",
    name: "Test User",
    email: "test@example.com",
  }
}
