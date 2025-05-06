"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "NIOS Graduate",
      content:
        "Enrolling in NIOS was the best decision I made for my education. The flexibility allowed me to work part-time while completing my senior secondary education. The study materials were comprehensive and easy to understand.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Rahul Verma",
      role: "IGNOU Student",
      content:
        "IGNOU's distance learning program has been a game-changer for me. The quality of education and the support from professors is outstanding. I'm able to pursue my Master's degree while maintaining my full-time job.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Ananya Patel",
      role: "DU SOL Alumni",
      content:
        "DU SOL provided me with a prestigious Delhi University degree through distance learning. The course structure was well-organized, and the study materials were excellent. I highly recommend it to working professionals.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <Card className="border-none shadow-lg">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-nios-100">
              <Quote className="h-8 w-8 text-nios-600" />
            </div>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">{testimonials[currentIndex].content}</p>
            <div className="mb-2 h-16 w-16 overflow-hidden rounded-full">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">{testimonials[currentIndex].name}</h3>
            <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-md"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-nios-600" : "bg-slate-300"
            } transition-all duration-300`}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
