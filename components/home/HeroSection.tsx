"use client"


import { motion } from "framer-motion"
import { AnimatedButton } from "../ui/animated-button"
import { AnimatedText } from "../ui/animated-text"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
     <section className="relative w-full overflow-hidden py-20 md:py-32">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-10" />
              </motion.div>
              <div className="container relative px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      AI-Powered Learning
                    </span>
                  </motion.div>
                  <AnimatedText
                    text="AI Study Planner"
                    className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                    as="h1"
                  />
                  <AnimatedText
                    text="Plan smarter. Study better. Let AI design your learning path."
                    className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
                    as="p"
                    delay={0.2}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col gap-2 min-[400px]:flex-row"
                  >
                    <AnimatedButton asChild size="lg" className="gap-1" variant="gradient">
                      <Link href="/plan">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton asChild variant="outline" size="lg">
                      <Link href="/youtube">Try YouTube Analyzer</Link>
                    </AnimatedButton>
                  </motion.div>
                </div>
              </div>
            </section>
  )
}