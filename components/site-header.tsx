"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"
import { ModeToggle } from "./mode-toggle"

export function SiteHeader() {
  const { setIsOpen, isMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Link href="/" className="font-semibold">
                AI Study Planner
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild size="sm" className="hidden md:flex">
              <Link href="/plan">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
