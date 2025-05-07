"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { registerUser } from "@/app/actions/user-actions"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    institution: "",
    course: "",
    hearAbout: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      })
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      })
      return false
    }

    if (formData.password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
      })
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return false
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
      })
      return false
    }

    return true
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for verification instructions.",
        })

        // Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000)
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message || "An error occurred during registration.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-full min-h-screen flex-col items-center justify-center py-10">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your information to create an ODL account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button className="w-full bg-nios-600 hover:bg-nios-700" onClick={handleNext}>
                Next
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Interested Institution</Label>
                <Select
                  value={formData.institution}
                  onValueChange={(value) => handleSelectChange("institution", value)}
                >
                  <SelectTrigger id="institution">
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nios">NIOS</SelectItem>
                    <SelectItem value="ignou">IGNOU</SelectItem>
                    <SelectItem value="dusol">DU SOL</SelectItem>
                    <SelectItem value="multiple">Multiple</SelectItem>
                    <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.institution && formData.institution !== "not-sure" && (
                <div className="space-y-2">
                  <Label htmlFor="course">Interested Course</Label>
                  <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.institution === "nios" && (
                        <>
                          <SelectItem value="secondary">Secondary (10th)</SelectItem>
                          <SelectItem value="senior-secondary">Senior Secondary (12th)</SelectItem>
                          <SelectItem value="vocational">Vocational</SelectItem>
                        </>
                      )}
                      {formData.institution === "ignou" && (
                        <>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                        </>
                      )}
                      {formData.institution === "dusol" && (
                        <>
                          <SelectItem value="ba">B.A. Programme</SelectItem>
                          <SelectItem value="bcom">B.Com Programme</SelectItem>
                          <SelectItem value="bcom-hons">B.Com (Hons)</SelectItem>
                        </>
                      )}
                      {formData.institution === "multiple" && (
                        <SelectItem value="multiple">Multiple Courses</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="hearAbout">How did you hear about us?</Label>
                <RadioGroup
                  value={formData.hearAbout}
                  onValueChange={(value) => handleSelectChange("hearAbout", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="search" id="search" />
                    <Label htmlFor="search">Search Engine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social" id="social" />
                    <Label htmlFor="social">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friend" id="friend" />
                    <Label htmlFor="friend">Friend/Family</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletter" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for updates on admissions and study materials
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms-of-use" className="text-nios-600 hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-nios-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2">
                  Back
                </Button>
                <Button type="submit" className="w-1/2 bg-nios-600 hover:bg-nios-700" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-nios-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <h3 className="mb-4 text-lg font-medium">Quick Admission Links</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/nios/admission/form">
            <Button variant="outline" className="border-nios-600 text-nios-600 hover:bg-nios-50">
              NIOS Admission
            </Button>
          </Link>
          <Link href="/ignou/admission/form">
            <Button variant="outline" className="border-ignou-600 text-ignou-600 hover:bg-ignou-50">
              IGNOU Admission
            </Button>
          </Link>
          <Link href="/dusol/admission/form">
            <Button variant="outline" className="border-dusol-600 text-dusol-600 hover:bg-dusol-50">
              DU SOL Admission
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
