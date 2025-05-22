"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  as?: React.ElementType
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  as: Component = "span",
}: AnimatedTextProps) {
  const [scope, setScope] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!scope || !once) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(scope)
    return () => observer.disconnect()
  }, [scope, once])

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <Component className={cn("inline-block", className)} ref={setScope}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={once ? (inView ? "visible" : "hidden") : "visible"}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={child} className="inline-block mr-1">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}
