"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi there! 👋 How can I help you with your ODL queries today? For urgent assistance, you can also reach us on Telegram: @niosdelhibot",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUrgentDialogOpen, setIsUrgentDialogOpen] = useState(false)
  const [urgentEmail, setUrgentEmail] = useState("")
  const [urgentQuery, setUrgentQuery] = useState("")
  const messagesEndRef = useRef(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Process the query
    try {
      const response = await processQuery(input)
      setMessages((prev) => [...prev, { role: "bot", content: response.message }])

      // If it's an urgent query, open the urgent dialog
      if (response.isUrgent) {
        setUrgentQuery(input)
        setIsUrgentDialogOpen(true)
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I'm having trouble processing your request. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const processQuery = async (query) => {
    // Simple keyword-based response system
    const lowerQuery = query.toLowerCase()

    // Check for urgent keywords
    const urgentKeywords = ["urgent", "emergency", "immediately", "asap", "deadline", "today", "tomorrow"]
    const isUrgent = urgentKeywords.some((keyword) => lowerQuery.includes(keyword))

    // NIOS related queries
    if (lowerQuery.includes("nios") && lowerQuery.includes("admission")) {
      return {
        message:
          "NIOS admissions are currently open! You can apply through our website. The fee structure includes a base fee plus our service charge of ₹200. Would you like me to guide you through the application process?",
        isUrgent: isUrgent,
      }
    }

    // IGNOU related queries
    if (lowerQuery.includes("ignou") && lowerQuery.includes("admission")) {
      return {
        message:
          "IGNOU admissions for the July 2025 session are open now. The fee varies by program, and our service charge is ₹1000. Would you like to know more about specific programs or the application process?",
        isUrgent: isUrgent,
      }
    }

    // DU SOL related queries
    if (
      (lowerQuery.includes("du") || lowerQuery.includes("sol") || lowerQuery.includes("dusol")) &&
      lowerQuery.includes("admission")
    ) {
      return {
        message:
          "DU SOL admissions for the 2025-26 academic year are currently open. The fee depends on your chosen program, plus our service charge of ₹1000. Can I help you with specific program information?",
        isUrgent: isUrgent,
      }
    }

    // Study material queries
    if (lowerQuery.includes("study") && lowerQuery.includes("material")) {
      return {
        message:
          "We offer study materials for NIOS (₹10/subject), IGNOU (₹100/subject), and DU SOL (₹100/subject). Previous year questions are available for free download. Would you like to browse our study material section?",
        isUrgent: isUrgent,
      }
    }

    // Fee related queries
    if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price")) {
      return {
        message:
          "Our fee structure varies by institution. NIOS has a service charge of ₹200, while IGNOU and DU SOL have a service charge of ₹1000. The base fee depends on your chosen program and category. Would you like specific fee details for a particular program?",
        isUrgent: isUrgent,
      }
    }

    // Contact related queries
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("email") ||
      lowerQuery.includes("address")
    ) {
      return {
        message:
          "You can reach us at niosdiscussion@gmail.com or visit our office at Dwarka Mor, Delhi. Would you like me to connect you with our support team?",
        isUrgent: isUrgent,
      }
    }

    // If urgent but no specific response
    if (isUrgent) {
      return {
        message:
          "I understand this is urgent. Let me connect you with our support team who can help you immediately. Please contact us on Telegram: @niosdelhibot or email us at niosdiscussion@gmail.com.",
        isUrgent: true,
      }
    }

    // Default response
    return {
      message:
        "Thank you for your query. I can help you with information about NIOS, IGNOU, and DU SOL admissions, study materials, fees, and more. Could you please provide more details about what you're looking for?",
      isUrgent: false,
    }
  }

  const handleUrgentRequest = () => {
    setUrgentQuery("User requested urgent assistance through chatbot")
    setIsUrgentDialogOpen(true)
  }

  const handleUrgentSubmit = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/urgent-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: urgentEmail,
          query: urgentQuery,
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "I've notified our support team about your urgent request. Someone will contact you shortly. For immediate assistance, please contact us on Telegram: @niosdelhibot or email us at niosdiscussion@gmail.com.",
          },
        ])

        toast({
          title: "Urgent Request Sent",
          description: "Our team has been notified and will contact you soon.",
        })

        setIsUrgentDialogOpen(false)
        setUrgentEmail("")
      } else {
        toast({
          variant: "destructive",
          title: "Request Failed",
          description: "Failed to send urgent request. Please try again or email us directly.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "Failed to send urgent request. Please try again or email us directly.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-nios-600 text-white shadow-lg hover:bg-nios-700"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-nios-600 p-4 text-white">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              <h3 className="font-medium">ODL Assistant</h3>
            </div>
            <button onClick={toggleChat} className="rounded-full p-1 hover:bg-nios-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-nios-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Urgent request button */}
          <div className="border-t border-gray-200 px-4 py-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleUrgentRequest}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Request Urgent Assistance
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => window.open("https://t.me/niosdelhibot", "_blank")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact on Telegram
            </Button>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-nios-600 hover:bg-nios-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Urgent Request Dialog */}
      <Dialog open={isUrgentDialogOpen} onOpenChange={setIsUrgentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Urgent Assistance Request</DialogTitle>
            <DialogDescription>
              Please provide your email so our team can contact you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="urgent-email">Your Email</Label>
              <Input
                id="urgent-email"
                value={urgentEmail}
                onChange={(e) => setUrgentEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Your Query</Label>
              <p className="text-sm text-muted-foreground">{urgentQuery}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUrgentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUrgentSubmit} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Urgent Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
