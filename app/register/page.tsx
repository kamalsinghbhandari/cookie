"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/app/actions/user-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [institution, setInstitution] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      formData.append("institution", institution)

      const result = await register(formData)

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
        })
        router.push("/dashboard")
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.message || "Failed to create account.",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Preferred Institution</Label>
              <Select value={institution} onValueChange={setInstitution}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nios">NIOS</SelectItem>
                  <SelectItem value="ignou">IGNOU</SelectItem>
                  <SelectItem value="dusol">DU SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
