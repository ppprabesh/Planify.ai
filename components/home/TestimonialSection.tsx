"use client"


import { motion } from "framer-motion"

export function TestimonialSection() {
  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <blockquote className="text-lg italic text-gray-600">
          "This platform has changed my life! Highly recommended."
        </blockquote>
        <p className="mt-2 text-sm text-gray-500">— Happy Customer</p>
      </div>
    </motion.section>
  )
}
