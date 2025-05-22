"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function AnimatedGradient({
  className,
  containerClassName,
  children,
}: {
  className?: string
  containerClassName?: string
  children?: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      container.style.setProperty("--x-pos", `${x * 100}%`)
      container.style.setProperty("--y-pos", `${y * 100}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background transition-opacity duration-500",
          "opacity-0 group-hover:opacity-100",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:via-primary/5 before:to-transparent",
          "before:opacity-0 before:blur-xl before:transition-opacity before:duration-500 group-hover:before:opacity-100",
          "after:absolute after:inset-0 after:bg-gradient-to-br after:from-primary/10 after:via-background after:to-background",
          "after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100",
          className,
        )}
        style={{
          backgroundPosition: "var(--x-pos, 0%) var(--y-pos, 0%)",
          backgroundSize: "400% 400%",
        }}
      />
      {children}
    </div>
  )
}
