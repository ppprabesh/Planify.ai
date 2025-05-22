"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function AnimatedCard({ children, className, hoverEffect = true, ...props }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative group", className)}
    >
      <Card
        className={cn(
          "transition-all duration-300",
          hoverEffect && "hover:shadow-lg hover:border-primary/50",
          className,
        )}
        {...props}
      >
        {children}
      </Card>
      {hoverEffect && (
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-primary/5 blur-xl rounded-xl transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </motion.div>
  )
}

export const AnimatedCardHeader = CardHeader
export const AnimatedCardFooter = CardFooter
export const AnimatedCardContent = CardContent
export const AnimatedCardTitle = CardTitle
export const AnimatedCardDescription = CardDescription
