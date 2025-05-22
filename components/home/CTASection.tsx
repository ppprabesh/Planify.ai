"use client"


import { motion } from "framer-motion"
import { ScrollReveal } from "../ui/scroll-reveal"
import { AnimatedButton } from "../ui/animated-button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24">
             <div className="container px-4 md:px-6">
               <ScrollReveal>
                 <div className="flex flex-col items-center gap-4 text-center">
                   <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                     Ready to Transform Your Study Habits?
                   </h2>
                   <p className="max-w-[700px] text-muted-foreground md:text-xl">
                     Join thousands of students who are studying smarter, not harder.
                   </p>
                   <AnimatedButton asChild size="lg" className="mt-4" variant="gradient">
                     <Link href="/plan">Create Your First Study Plan</Link>
                   </AnimatedButton>
                 </div>
               </ScrollReveal>
             </div>
           </section>
  )
}
