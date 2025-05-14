import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Delete the auth token cookie
  cookies().delete("auth-token")

  // Redirect to the home page
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"))
}
