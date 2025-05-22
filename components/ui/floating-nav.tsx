"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Home, Calendar, Video, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Calendar, href: "/plan", label: "Plan" },
    { icon: Video, href: "/youtube", label: "YouTube" },
    { icon: Download, href: "/downloads", label: "Downloads" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
              "hover:bg-primary/90 transition-all duration-200",
            )}
          >
            <ChevronUp className={cn("h-5 w-5 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 flex flex-col gap-2"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: 0.05 * (navItems.length - index) }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm font-medium shadow-lg",
                        "hover:bg-primary/10 transition-colors duration-200",
                        pathname === item.href && "bg-primary/20",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
