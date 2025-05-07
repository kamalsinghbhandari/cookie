"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { subscribeToNewsletter } from "@/app/actions/newsletter-actions"

export default function NewsletterForm({ variant = "default" }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        toast({
          title: "Subscription Successful",
          description: "Thank you for subscribing to our newsletter!",
        })
        setEmail("")
      } else {
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: result.message || "An error occurred. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "footer") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Subscribe to Our Newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Get the latest updates on admissions, study materials, and educational news.
        </p>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="max-w-xs"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-nios-50 p-6">
      <h3 className="mb-2 text-xl font-semibold text-nios-700">Subscribe to Our Newsletter</h3>
      <p className="mb-4 text-muted-foreground">
        Stay updated with the latest information on admissions, study materials, and educational news.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" className="bg-nios-600 hover:bg-nios-700" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}
