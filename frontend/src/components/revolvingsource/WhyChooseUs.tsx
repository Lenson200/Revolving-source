'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Award, Users, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Globe2,
    title: 'Global Network',
    description: 'Established partnerships across continents, enabling seamless international trade and distribution.'
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Rigorous quality control at every step ensures only the best products reach our customers.'
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'We build lasting relationships by understanding and exceeding client expectations.'
  },
  {
    icon: Zap,
    title: 'Agile Operations',
    description: 'Quick adaptation to market demands with efficient, technology-driven processes.'
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Partner',
    description: 'Transparent dealings and ethical practices make us a reliable business partner.'
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Value',
    description: 'We invest in sustainable growth that benefits all stakeholders for years to come.'
  }
];

const stats = [
  { value: '15+', label: 'Countries Served' },
  { value: '30+', label: 'Partner Businesses' },
  { value: '10K+', label: 'Products Available' },
  { value: '98%', label: 'Client Satisfaction' }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 lg:p-12 mb-24 shadow-xl shadow-teal-600/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-teal-100 text-sm lg:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6">
            Why REVOLVINGSOURCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Built on Trust,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"> Driven by Excellence</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We combine global reach with local expertise, delivering value through 
            innovation, integrity, and unwavering commitment to quality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-600/5 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-teal-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}