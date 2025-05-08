import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, query } = body

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "niosdiscussion@gmail.com",
      subject: "Urgent Help Request",
      text: `
        Urgent Help Request
        
        Email: ${email}
        Query: ${query}
        
        This is an automated message from your website.
      `,
      html: `
        <h2>Urgent Help Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
        <p>This is an automated message from your website.</p>
      `,
    })

    return NextResponse.json({ success: true, message: "Urgent help request sent successfully" })
  } catch (error) {
    console.error("Urgent help error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while sending your request" },
      { status: 500 },
    )
  }
}
