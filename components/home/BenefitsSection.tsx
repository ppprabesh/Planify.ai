"use client"

import { motion } from "framer-motion"

export function BenefitsSection() {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Benefits</h2>
        <p className="text-gray-600">
          Save time, reduce costs, and improve efficiency with us.
        </p>
      </div>
    </motion.section>
  )
}