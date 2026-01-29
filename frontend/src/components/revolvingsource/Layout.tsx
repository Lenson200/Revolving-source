'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  ShoppingBag,
  Briefcase,
  Shirt,
  Apple,
}from 'lucide-react'
import { Button } from '@/components/ui/button'
import { html } from 'framer-motion/client'

const navLinks = [
  {
    label: 'Services',
    href: '#services',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Fresh Produce', icon: Apple, href: '#produce' },
      { label: 'E-Commerce', icon: ShoppingBag, href: '#ecommerce' },
      { label: 'Business Services', icon: Briefcase, href: '#services' },
      { label: 'Fashion & Apparel', icon: Shirt, href: '#apparel' },
    ],
  },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-900/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-600/30">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                REVOLVINGSOURCE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleSmoothScroll(link.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors ${
                      scrolled
                        ? 'text-slate-700 hover:text-teal-600 hover:bg-teal-50'
                        : 'text-slate-700 hover:text-teal-600'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden"
                      >
                        <div className="p-2">
                          {link.dropdownItems?.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleSmoothScroll(item.href)}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-teal-50 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-teal-100 flex items-center justify-center transition-colors">
                                <item.icon className="w-5 h-5 text-slate-600 group-hover:text-teal-600 transition-colors" />
                              </div>
                              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700">
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:text-teal-600"
              >
                <Globe className="w-4 h-4 mr-2" />
                EN
              </Button>
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 shadow-lg shadow-teal-600/25"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="w-full text-left px-4 py-3 text-lg font-medium text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50 transition-colors"
                    >
                      {link.label}
                    </button>
                    {link.hasDropdown && (
                      <div className="pl-4 mt-2 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleSmoothScroll(item.href)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-100">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-12">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">REVOLVINGSOURCE</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                A diversified trading and e-commerce company connecting global markets with quality products and services.
              </p>
              <div className="flex gap-3">
                {['linkedin', 'twitter', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-slate-400 rounded" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {[
                  'Fresh Produce',
                  'E-Commerce',
                  'Business Services',
                  'Fashion & Apparel',
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Team', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a
                      href="#about"
                      className="text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li>contact@Revolvingsource.com</li>
                <li>+97450419367</li>
                <li>Alshamil Trading Center, Suite 07</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} RevolvingSource Trading and Servives. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-slate-500 hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}