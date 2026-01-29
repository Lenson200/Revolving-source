'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, ShoppingBag, Briefcase, Shirt, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchBusinesses } from '@/utils/api'

// --- Static fallback business data ---
const staticBusinesses = [
  {
    id: 'produce',
    icon: Apple,
    title: 'Fresh Produce',
    subtitle: 'Wholesale & Import',
    description:
      'We source and distribute premium fresh fruits and vegetables from trusted growers worldwide. Our cold chain logistics ensure quality from farm to market.',
    features: ['Global Sourcing Network', 'Quality Assurance', 'Cold Chain Logistics', 'Wholesale Distribution'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    gradient: 'from-emerald-500 to-teal-600',
    bgAccent: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-Commerce',
    subtitle: 'Online Retail',
    description:
      'Our digital marketplace brings quality products directly to consumers. We leverage technology to create seamless shopping experiences across multiple categories.',
    features: ['Multi-Category Platform', 'Secure Payments', 'Fast Delivery', 'Customer Support'],
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
    gradient: 'from-teal-500 to-cyan-600',
    bgAccent: 'bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    id: 'services',
    icon: Briefcase,
    title: 'General Services',
    subtitle: 'Business Solutions',
    description:
      'From logistics consulting to market research, we provide comprehensive business services that help our partners navigate complex international markets.',
    features: ['Trade Consulting', 'Market Analysis', 'Logistics Support', 'Partnership Development'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    gradient: 'from-slate-600 to-slate-800',
    bgAccent: 'bg-slate-50',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    id: 'apparel',
    icon: Shirt,
    title: 'Fashion & Apparel',
    subtitle: 'Import & Online Sales',
    description:
      'We import and retail quality clothing through our online channels, bringing international fashion trends to local markets with competitive pricing.',
    features: ['International Brands', 'Trend-Forward Selection', 'Quality Fabrics', 'Online Exclusive'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    gradient: 'from-stone-600 to-stone-800',
    bgAccent: 'bg-stone-50',
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-600',
  },
]

// --- Component to display one business card ---
const BusinessCard = ({ business, index }: any) => {
  const isEven = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content Side */}
      <div>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{business.title}</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">{business.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {business.features?.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${business.gradient || 'from-teal-500 to-emerald-500'}`} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="group rounded-full px-6 border-2 hover:border-teal-200 hover:bg-teal-50">
          Learn More
          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>

      {/* Image Side */}
      <div>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative group">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img src={business.image || business.image_url} alt={business.title} className="w-full h-80 object-cover" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// --- Main Component ---
export default function BusinessSections() {
  const [dynamicBusinesses, setDynamicBusinesses] = useState<any[]>([])

  useEffect(() => {
    fetchBusinesses().then((data) => {
      setDynamicBusinesses(data)
    })
  }, [])

  // merge static + dynamic
  const allBusinesses = [...staticBusinesses, ...dynamicBusinesses]

  return (
    <section className="py-24 lg:py-32 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6">
            Our Business Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Four Pillars of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              {' '}
              Excellence
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            From farm-fresh produce to cutting-edge e-commerce, we operate across diverse sectors united by our
            commitment to quality and customer satisfaction.
          </p>
        </motion.div>

        {/* Business Cards */}
        <div className="space-y-24 lg:space-y-32">
          {allBusinesses.map((business, index) => (
            <BusinessCard key={`${business.id}-${index}`} business={business} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}