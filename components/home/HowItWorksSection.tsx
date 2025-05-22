"use client"

import { motion } from "framer-motion"

export function HowItWorksSection() {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <ol className="space-y-4">
          <li>1. Sign up and create your profile</li>
          <li>2. Choose a service plan</li>
          <li>3. Enjoy the benefits</li>
        </ol>
      </div>
    </motion.section>
  )
}
