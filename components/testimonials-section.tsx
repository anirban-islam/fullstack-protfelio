"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Testimonial {
  _id: string
  name: string
  city: string
  createdAt: string
  rating: number
  comment: string
  avatar?: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/admin/testimonials")
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const data = await res.json()
        setTestimonials(data)
      } catch (err) {
        console.error("Failed to load testimonials:", err)
        setError("Unable to fetch testimonials.")
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">💬</span>
          <span>Testimonials</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
        {testimonials.map((testimonial, index) => (
          <div key={testimonial._id || index} className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{testimonial.name}</h4>
                <p className="text-xs text-gray-500">{testimonial.city}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(testimonial.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>

            <div className="flex space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">"{testimonial.comment} "</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
