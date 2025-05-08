import { NextResponse } from "next/server"

export async function GET(request) {
  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false })
  }

  // In a real implementation, you would verify the token
  // For now, we'll just return authenticated: true
  return NextResponse.json({ authenticated: true })
}
