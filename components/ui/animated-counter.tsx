"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  className?: string
  duration?: number
  formatOptions?: Intl.NumberFormatOptions
}

export function AnimatedCounter({ value, className, duration = 1.5, formatOptions = {} }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const formatter = new Intl.NumberFormat("en-US", formatOptions)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    if (!ref.current) return

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter.format(latest)
      }
    })

    return unsubscribe
  }, [springValue, formatter])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      0
    </span>
  )
}
