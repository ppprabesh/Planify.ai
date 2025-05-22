"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, ChevronRight, Download, Home, Menu, Video, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"
import { Separator } from "@/components/ui/separator"

export function AppSidebar() {
  const { isOpen, setIsOpen, isMobile } = useSidebar()
  const pathname = usePathname()

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Plan My Study",
      href: "/plan",
      icon: Calendar,
    },
    {
      title: "YouTube Analyzer",
      href: "/youtube",
      icon: Video,
    },
    {
      title: "Downloads",
      href: "/downloads",
      icon: Download,
    },
  ]

  if (!isOpen && !isMobile) {
    return (
      <div className="fixed left-0 top-0 z-20 h-full w-16 bg-background border-r border-border flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="mb-6">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col items-center gap-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              title={item.title}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 z-20 h-full bg-background border-r border-border transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 -translate-x-full",
          isMobile ? "w-64" : "",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">AI Study Planner</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            {isMobile ? <X className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
        <Separator />
        <div className="px-2 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
