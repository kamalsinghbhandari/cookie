"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { submitForm } from "@/app/actions/form-actions"

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  education: z.string().min(1, { message: "Please select your education level." }),
  course: z.string().min(1, { message: "Please select a course." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender.",
  }),
  dob: z.string().min(1, { message: "Please enter your date of birth." }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  university: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface AdmissionFormProps {
  university: "NIOS" | "IGNOU" | "DU SOL"
}

export default function AdmissionForm({ university }: AdmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      course: "",
      gender: "male",
      dob: "",
      agreeToTerms: false,
      university: university,
    },
  })

  // Define courses based on university
  const getCourses = () => {
    switch (university) {
      case "NIOS":
        return [
          { value: "secondary", label: "Secondary (10th)" },
          { value: "senior-secondary", label: "Senior Secondary (12th)" },
          { value: "vocational", label: "Vocational Courses" },
        ]
      case "IGNOU":
        return [
          { value: "ba", label: "Bachelor of Arts (BA)" },
          { value: "bcom", label: "Bachelor of Commerce (BCom)" },
          { value: "bsc", label: "Bachelor of Science (BSc)" },
          { value: "mba", label: "Master of Business Administration (MBA)" },
          { value: "mca", label: "Master of Computer Applications (MCA)" },
        ]
      case "DU SOL":
        return [
          { value: "ba-program", label: "BA Program" },
          { value: "bcom", label: "BCom" },
          { value: "bcom-hons", label: "BCom (Hons)" },
          { value: "ba-english", label: "BA English (Hons)" },
          { value: "ba-political", label: "BA Political Science (Hons)" },
        ]
      default:
        return []
    }
  }

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      const result = await submitForm(data)
      if (result.success) {
        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully. We will contact you soon.",
        })
        form.reset()
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.message || "There was an error submitting your application. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
      })
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Education</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your highest education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="below10th">Below 10th</SelectItem>
                      <SelectItem value="10th">10th Pass</SelectItem>
                      <SelectItem value="12th">12th Pass</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getCourses().map((course) => (
                        <SelectItem key={course.value} value={course.value}>
                          {course.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your full address" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the terms and conditions</FormLabel>
                  <FormDescription>
                    By submitting this form, you agree to our{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
