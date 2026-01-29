'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/utils/api'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@revolvingsources.com',
    href: 'mailto:contact@revolvingsources.com'
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+97450419367',
    href: 'tel:+97450419367'
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Alshamil Trading Center, Suite 07',
    href: '#'
  }
];

export default function ContactSection() {
 const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await submitContactForm(formData)
      setStatus('✅ Message sent successfully! We’ll get back to you soon.')
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        interest: '',
        message: '',
      })
    } catch (error) {
      setStatus('❌ Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="py-24 lg:py-32 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6">
              Get In Touch
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Let's Build
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"> Together</span>
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Whether you're looking to partner, source products, or explore opportunities, 
              we'd love to hear from you. Our team is ready to help.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group flex items-center gap-5 p-5 bg-slate-50 rounded-2xl hover:bg-teal-50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <info.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-0.5">{info.label}</p>
                    <p className="text-lg font-medium text-slate-900">{info.value}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Sunday - Monday </span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-slate-50 rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h3>
              <p className="text-slate-600 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <Input 
                       name="first_name"
                      placeholder="John"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <Input 
                      name="last_name"
                      placeholder="Doe"
                      value={formData.last_name}
                      onChange={handleChange}
                      required 
                      className="bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company (Optional)</label>
                  <Input 
                    name="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interest Area</label>

                  <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 focus:border-teal-500 focus:ring-teal-500 focus:ring-1 outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="produce">Fresh Produce & Wholesale</option>
                    <option value="ecommerce">E-Commerce Partnership</option>
                    <option value="services">Business Services</option>
                    <option value="apparel">Fashion & Apparel</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl min-h-[120px] resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-14 text-base shadow-lg shadow-teal-600/25"
                >
    
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
                 {status && (
                  <p
                    className={`text-center text-sm mt-4 ${
                      status.startsWith('✅') ? 'text-teal-600' : 'text-red-500'
                    }`}
                  >
                    {status}
                  </p>
                )}

                <p className="text-center text-sm text-slate-500">
                  By submitting, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}