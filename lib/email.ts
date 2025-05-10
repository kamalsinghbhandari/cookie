import nodemailer from "nodemailer"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Function to send welcome email with login credentials
export async function sendWelcomeEmail({ name, email, password }: { name: string; email: string; password: string }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Student Portal Login",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Welcome to ODL Student Portal</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering with our Open Distance Learning portal. Here are your login details:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        <p>Please log in here: <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://niostudent-website.vercel.app"}/login" style="color: #0070f3; text-decoration: none;">Student Portal Login</a></p>
        <p>For security reasons, we recommend changing your password after your first login.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>ODL Student Portal Team</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// Function to send form submission confirmation
export async function sendFormConfirmation({
  name,
  email,
  formType,
}: { name: string; email: string; formType: string }) {
  const formTypeMap: Record<string, string> = {
    nios: "NIOS",
    ignou: "IGNOU",
    dusol: "DU SOL",
  }

  const formName = formTypeMap[formType] || formType.toUpperCase()

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${formName} Form Submission Confirmation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">${formName} Form Submission Confirmation</h2>
        <p>Hello ${name},</p>
        <p>We have received your ${formName} admission form. Our team will review your application and get back to you soon.</p>
        <p>You can check the status of your application by logging into your account.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>ODL Student Portal Team</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// Function to send admin notification for new form submission
export async function sendAdminFormNotification({ studentName, formType }: { studentName: string; formType: string }) {
  const formTypeMap: Record<string, string> = {
    nios: "NIOS",
    ignou: "IGNOU",
    dusol: "DU SOL",
  }

  const formName = formTypeMap[formType] || formType.toUpperCase()

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || "niosdiscussion@gmail.com",
    subject: `New ${formName} Form Submission`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">New ${formName} Form Submission</h2>
        <p>A new ${formName} form has been submitted by ${studentName}.</p>
        <p>Please log in to the admin panel to review the submission.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://niostudent-website.vercel.app"}/admin" style="color: #0070f3; text-decoration: none;">Admin Panel</a></p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}
