"use server"

import nodemailer from "nodemailer"
import { hash } from "bcrypt"

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function registerUser(userData) {
  try {
    // In a real implementation, you would:
    // 1. Hash the password
    // 2. Store user data in a database
    // 3. Generate a verification token

    // For now, we'll just simulate these steps
    const hashedPassword = await hash(userData.password, 10)
    const verificationToken = Math.random().toString(36).substring(2, 15)

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: userData.email,
      subject: "Welcome to ODL - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #006064;">Welcome to ODL!</h1>
          </div>
          
          <p>Dear ${userData.name},</p>
          
          <p>Thank you for registering with Open Distance Learning (ODL). We're excited to have you join our community!</p>
          
          <p>To complete your registration and verify your email address, please click the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://your-website.com/verify-email?token=${verificationToken}" style="background-color: #006064; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
          </div>
          
          <p>If you didn't create this account, you can safely ignore this email.</p>
          
          <p>For any questions or assistance, please contact us at niosdiscussion@gmail.com.</p>
          
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
      subject: "New User Registration",
      html: `
        <h1>New User Registration</h1>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Interested Institution:</strong> ${userData.institution || "Not specified"}</p>
        <p><strong>Interested Course:</strong> ${userData.course || "Not specified"}</p>
        <p><strong>Source:</strong> ${userData.hearAbout || "Not specified"}</p>
      `,
    })

    return { success: true, message: "Registration successful! Please check your email to verify your account." }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Failed to register. Please try again later." }
  }
}
