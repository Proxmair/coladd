'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', contact: '', message: '' })
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Get In Touch</h2>
            </div>
            <p className="text-lg text-foreground/80">
              Have questions? Send me a message and I'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <Card className="p-8 md:p-12 bg-card border-2 border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none"
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label htmlFor="contact" className="block text-sm font-semibold text-foreground mb-2">
                  Contact Number
                </label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="+92-300-1234567"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none resize-none bg-background text-foreground"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 text-lg rounded-lg transition-colors"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
