'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'contact', 'blog', 'videos', 'leaflets']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl">
            Dr. Khurram
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`transition-colors ${
                activeSection === 'home' ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors ${
                activeSection === 'contact' ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className={`transition-colors ${
                activeSection === 'blog' ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className={`transition-colors ${
                activeSection === 'videos' ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection('leaflets')}
              className={`transition-colors ${
                activeSection === 'leaflets' ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              Leaflets
            </button>
          </div>

          {/* Admin Login Button */}
          <div className="hidden md:block">
            <Button
              variant="secondary"
              className="bg-secondary text-primary hover:bg-secondary/90"
            >
              Admin Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded"
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection('leaflets')}
              className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded"
            >
              Leaflets
            </button>
            <div className="px-4 pt-2">
              <Button
                variant="secondary"
                className="w-full bg-secondary text-primary hover:bg-secondary/90"
              >
                Admin Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
