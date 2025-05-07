"use server"

import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendUrgentQuery(data: { query: string; timestamp: string }) {
  try {
    // Send urgent query notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: "URGENT: Chatbot Query Requires Immediate Attention",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px; background-color: #ffebee; padding: 10px; border-radius: 5px;">
            <h1 style="color: #c62828;">Urgent Chatbot Query</h1>
          </div>
          
          <p><strong>Query:</strong> ${data.query}</p>
          <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          
          <p>This query has been marked as urgent and requires immediate attention.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
            <p>ODL - Open Distance Learning</p>
            <p>Dwarka Mor, Delhi</p>
          </div>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending urgent query:", error)
    return { success: false }
  }
}
