"use client"
import { Moon, Sun, Sunrise } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("day")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label="Toggle theme"
      className="relative h-10 w-10 overflow-hidden"
    >
      <div className="relative h-[1.2rem] w-[1.2rem]">
        {/* Dark theme icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-full w-full" />
        </motion.div>

        {/* Light theme icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-full w-full" />
        </motion.div>

        {/* Day theme icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === "day" ? 1 : 0,
            opacity: theme === "day" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sunrise className="h-full w-full" />
        </motion.div>
      </div>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-1">
        <motion.div
          className="h-1 w-1 rounded-full bg-foreground"
          initial={false}
          animate={{
            opacity: theme === "dark" ? 1 : 0.3,
            scale: theme === "dark" ? 1 : 0.7,
          }}
        />
        <motion.div
          className="h-1 w-1 rounded-full bg-foreground"
          initial={false}
          animate={{
            opacity: theme === "light" ? 1 : 0.3,
            scale: theme === "light" ? 1 : 0.7,
          }}
        />
        <motion.div
          className="h-1 w-1 rounded-full bg-foreground"
          initial={false}
          animate={{
            opacity: theme === "day" ? 1 : 0.3,
            scale: theme === "day" ? 1 : 0.7,
          }}
        />
      </div>
    </Button>
  )
}
