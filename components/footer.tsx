'use client'

import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-xl mb-4">Dr. Khurram Baqai</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Providing exceptional medical care and patient education with dedication and compassion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#blog" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <a href="#videos" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Videos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:03272057338" className="text-primary-foreground/80 hover:text-accent">
                  0327-2057338
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="https://wa.me/923408749434" className="text-primary-foreground/80 hover:text-accent">
                  0340-8749434 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@drkhurram.com" className="text-primary-foreground/80 hover:text-accent">
                  info@drkhurram.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold mb-4">Location</h4>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <div className="text-primary-foreground/80">
                <p>Block H North Nazimabad</p>
                <p>Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <h4 className="font-bold mb-4 text-center">Follow Us</h4>
          <div className="flex justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground/10 hover:bg-accent p-3 rounded-full text-accent hover:text-primary transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground/10 hover:bg-accent p-3 rounded-full text-accent hover:text-primary transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground/10 hover:bg-accent p-3 rounded-full text-accent hover:text-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground/10 hover:bg-accent p-3 rounded-full text-accent hover:text-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20 bg-primary-foreground/5 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-primary-foreground/70">
          <p>
            &copy; {currentYear} Dr. Khurram Baqai. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
