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

export async function subscribeToNewsletter(email: string) {
  try {
    // In a real implementation, you would:
    // 1. Check if the email already exists in your database
    // 2. Add the email to your newsletter subscribers list

    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: email,
      subject: "Welcome to ODL Newsletter",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #006064;">Thank You for Subscribing!</h1>
          </div>
          
          <p>Dear Subscriber,</p>
          
          <p>Thank you for subscribing to the ODL Newsletter. You'll now receive regular updates on:</p>
          
          <ul style="margin: 20px 0;">
            <li>Latest admission notifications</li>
            <li>New study materials</li>
            <li>Educational tips and guidance</li>
            <li>Important deadlines and events</li>
          </ul>
          
          <p>If you have any questions or need assistance, feel free to contact us at niosdiscussion@gmail.com.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666;">
            <p>ODL - Open Distance Learning</p>
            <p>Dwarka Mor, Delhi</p>
          </div>
        </div>
      `,
    })

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: "New Newsletter Subscription",
      html: `
        <h1>New Newsletter Subscription</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    return { success: true, message: "Successfully subscribed to the newsletter!" }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Failed to subscribe. Please try again later." }
  }
}
