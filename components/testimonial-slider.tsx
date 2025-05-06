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
      role: "NIOS Class 12 Graduate",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "NIOS gave me the flexibility to continue my education while pursuing my passion for classical dance. The study materials were comprehensive and easy to understand.",
    },
    {
      name: "Rahul Verma",
      role: "IGNOU BCA Student",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "IGNOU's BCA program has been a game-changer for me. I can work full-time and still pursue my degree. The online resources and faculty support have been exceptional.",
    },
    {
      name: "Amit Patel",
      role: "DU SOL B.Com Graduate",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "DU SOL provided me with a quality education at an affordable cost. The course materials were well-structured, and the flexibility allowed me to manage my family business alongside my studies.",
    },
    {
      name: "Sneha Gupta",
      role: "NIOS to IGNOU Pathway Student",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I completed my 12th through NIOS and then joined IGNOU for my bachelor's degree. The transition was smooth, and both institutions provided excellent support throughout my educational journey.",
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
            <Quote className="mb-6 h-12 w-12 text-nios-500 opacity-50" />
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
            className={`h-2 w-2 rounded-full p-0 ${index === currentIndex ? "bg-nios-600" : "bg-slate-300"}`}
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
