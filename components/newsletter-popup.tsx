"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { subscribeToNewsletter } from "@/app/actions/newsletter-actions"

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if the user has already closed the popup
    const hasClosedPopup = localStorage.getItem("newsletter_popup_closed")

    if (!hasClosedPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Remember that the user closed the popup
    localStorage.setItem("newsletter_popup_closed", "true")
  }

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
        handleClose()
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-nios-700">Stay Updated!</h3>
          <p className="mt-2 text-muted-foreground">
            Subscribe to our newsletter for the latest updates on admissions, study materials, and educational news.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline" className="w-1/2" onClick={handleClose}>
              No, thanks
            </Button>
            <Button type="submit" className="w-1/2 bg-nios-600 hover:bg-nios-700" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
