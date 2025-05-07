"use server"

import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password", // Use app password for Gmail
  },
})

export async function sendAdmissionFormEmail(formData: any) {
  try {
    // Format the form data for email
    const formattedData = Object.entries(formData)
      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
      .join("<br>")

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: "New Admission Form Submission",
      html: `
        <h1>New Admission Form Submission</h1>
        <p>A new admission form has been submitted with the following details:</p>
        <div>${formattedData}</div>
      `,
      // Attachments would be handled here for document uploads
    })

    return { success: true, message: "Form submitted successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to submit form" }
  }
}

export async function sendContactFormEmail(formData: any) {
  try {
    const { name, email, phone, subject, message } = formData

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return { success: true, message: "Message sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send message" }
  }
}

export async function sendOrderConfirmationEmail(orderData: any) {
  try {
    const { customerEmail, orderItems, totalAmount } = orderData

    // Format order items for email
    const formattedItems = orderItems
      .map((item: any) => `<li>${item.title} - ₹${item.price} x ${item.quantity}</li>`)
      .join("")

    // Send email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: customerEmail,
      subject: "Your ODL Order Confirmation",
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase! Your order has been confirmed.</p>
        <h2>Order Details:</h2>
        <ul>${formattedItems}</ul>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p>You will receive download links for your purchased materials shortly.</p>
      `,
    })

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "niosdiscussion@gmail.com",
      to: "niosdiscussion@gmail.com",
      subject: "New Study Material Order",
      html: `
        <h1>New Order Received</h1>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <h2>Order Items:</h2>
        <ul>${formattedItems}</ul>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      `,
    })

    return { success: true, message: "Order confirmation sent" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send order confirmation" }
  }
}
