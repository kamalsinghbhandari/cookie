import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { db } from "@/lib/db"
import { sendFormConfirmation, sendAdminFormNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as any

    // Get the form data
    const body = await request.json()
    const { formType, formData } = body

    // Create the form
    const form = await db.forms.create({
      userId: decoded.id,
      formType,
      formData,
    })

    // Get user details for email
    const user = await db.users.findByEmail(decoded.email)

    // Send confirmation email to user
    try {
      await sendFormConfirmation({
        name: user.name,
        email: user.email,
        formType,
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Continue with form submission even if email fails
    }

    // Send notification to admin
    try {
      await sendAdminFormNotification({
        studentName: user.name,
        formType,
      })
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError)
      // Continue with form submission even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      form,
    })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit form. Please try again later." },
      { status: 500 },
    )
  }
}
