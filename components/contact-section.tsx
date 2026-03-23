'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import { myToast } from '@/lib/utils'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // 🔒 Basic validation
      if (!formData.fullName || !formData.email || !formData.message) {
        return myToast.error('Please fill all required fields')
      }

      setLoading(true)

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      myToast.success('Message sent successfully!')

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        message: '',
      })
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">

          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Get In Touch
              </h2>
            </div>
            <p className="text-lg text-foreground/80">
              Have questions? Send a message and get a response soon.
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 md:p-12 bg-card border-2 border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contact Number
                </label>
                <Input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+92-300-1234567"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none resize-none bg-background"
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg rounded-lg"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>

            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}