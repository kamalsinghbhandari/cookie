"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 12 Graduate",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "NIOS gave me the flexibility to continue my education while pursuing my passion for classical dance. The study materials were comprehensive and easy to understand.",
    },
    {
      name: "Rahul Verma",
      role: "Class 10 Student",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "After struggling in traditional schooling, NIOS was a breath of fresh air. I could learn at my own pace and the online resources helped me understand difficult concepts better. I'm now confident about my future education.",
    },
    {
      name: "Amit Patel",
      role: "Working Professional",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I had to drop out of school due to financial constraints. Years later, NIOS gave me a second chance to complete my education while working full-time. The flexible examination schedule was perfect for my situation.",
    },
    {
      name: "Sneha Gupta",
      role: "Aspiring College Student",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The quality of education at NIOS surprised me. The study materials were on par with regular schools, and the practical approach to learning helped me develop a deeper understanding of subjects.",
    },
  ]

  useEffect(() => {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col items-center text-center">
            <Quote className="mb-6 h-12 w-12 text-blue-500 opacity-50" />
            <p className="mb-6 text-lg md:text-xl">{testimonials[currentIndex].quote}</p>
            <div className="mb-4 h-16 w-16 overflow-hidden rounded-full">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">{testimonials[currentIndex].name}</h3>
            <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`h-2 w-2 rounded-full p-0 ${index === currentIndex ? "bg-blue-600" : "bg-slate-300"}`}
            onClick={() => {
              setAutoplay(false)
              setCurrentIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
