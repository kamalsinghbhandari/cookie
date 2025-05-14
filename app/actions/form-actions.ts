"use server"

import { z } from "zod"
import { neon } from "@/lib/db"
import { sendEmail } from "./email-actions"

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  education: z.string().min(1),
  course: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
  dob: z.string().min(1),
  agreeToTerms: z.boolean(),
  university: z.string(),
})

type FormData = z.infer<typeof formSchema>

export async function submitForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Check if the form is visible/active
    const formVisibility = await neon`
      SELECT is_visible FROM form_visibility 
      WHERE university = ${validatedData.university}
    `

    if (!formVisibility.length || !formVisibility[0].is_visible) {
      return {
        success: false,
        message: `${validatedData.university} admissions are currently closed.`,
      }
    }

    // Insert form submission into database
    const result = await neon`
      INSERT INTO form_submissions (
        name, 
        email, 
        phone, 
        address, 
        education, 
        course, 
        gender, 
        dob, 
        university, 
        status
      ) VALUES (
        ${validatedData.name},
        ${validatedData.email},
        ${validatedData.phone},
        ${validatedData.address},
        ${validatedData.education},
        ${validatedData.course},
        ${validatedData.gender},
        ${validatedData.dob},
        ${validatedData.university},
        'pending'
      ) RETURNING id
    `

    // Send confirmation email
    await sendEmail({
      to: validatedData.email,
      subject: `${validatedData.university} Admission Application Received`,
      html: `
        <h1>Thank you for your application, ${validatedData.name}!</h1>
        <p>We have received your application for ${validatedData.university} admission.</p>
        <p>Your application reference number is: <strong>${result[0].id}</strong></p>
        <p>We will review your application and get back to you soon.</p>
        <p>Best regards,<br>NIOStudent Team</p>
      `,
    })

    return {
      success: true,
      message: "Form submitted successfully",
      id: result[0].id,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: "There was an error submitting your form. Please try again.",
    }
  }
}

export async function getFormVisibility() {
  try {
    const visibility = await neon`
      SELECT university, is_visible FROM form_visibility
    `

    return {
      success: true,
      data: visibility,
    }
  } catch (error) {
    console.error("Error fetching form visibility:", error)
    return {
      success: false,
      message: "Failed to fetch form visibility status",
    }
  }
}
