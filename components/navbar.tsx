'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const LOGO_URL =
  'https://res.cloudinary.com/proxmaircloud/image/upload/v1774124473/products/ndg6rydh0jxbq0t3ulxi.png'

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
        <div className="flex justify-between items-center h-30 md:h-42">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
  <Image
    src={LOGO_URL}
    alt="Logo"
    width={0}
    height={0}
    sizes="(max-width: 768px) 80px, (max-width: 1200px) 120px, 160px"
    className="h-20 w-auto md:h-24 lg:h-28 xl:h-32 object-contain"
    priority
    onClick={() => scrollToSection('home')}
  />
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {['home', 'contact', 'blog', 'videos', 'leaflets'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors ${
                  activeSection === item
                    ? 'text-accent'
                    : 'hover:text-accent/80'
                }`}
              >
                {item}
              </button>
            ))}
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
            {['home', 'contact', 'blog', 'videos', 'leaflets'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-2 hover:bg-primary-foreground/10 rounded capitalize"
              >
                {item}
              </button>
            ))}
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