import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import prisma from "@/lib/db"

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, query, timestamp } = body

    // Store the urgent query in the database
    await prisma.urgentQuery.create({
      data: {
        email,
        query,
        timestamp: new Date(timestamp),
      },
    })

    // Send email notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: "Urgent Query from Website",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #006064;">Urgent Query Received</h1>
          
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Query:</strong> ${query}</p>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
          
          <p>Please respond to this query as soon as possible.</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Urgent query sent successfully",
    })
  } catch (error) {
    console.error("Error sending urgent query:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send urgent query. Please try again later." },
      { status: 500 },
    )
  }
}
