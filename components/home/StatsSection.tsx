"use client"


import { motion } from "framer-motion"
import { ScrollReveal } from "../ui/scroll-reveal"
import { Card, CardContent } from "../ui/card"
import { AnimatedCounter } from "../ui/animated-counter"

export function StatsSection() {

    const stats = [
    { value: 10000, label: "Active Users" },
    { value: 50000, label: "Study Plans Created" },
    { value: 98, label: "Satisfaction Rate", suffix: "%" },
    { value: 24, label: "Hours Saved Weekly" },
  ]
  return (
     <section className="w-full py-12 md:py-16">
              <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {stats.map((stat, i) => (
                    <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                      <Card className="border-none bg-background/50 shadow-none">
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold sm:text-4xl">
                            <AnimatedCounter value={stat.value} />
                            {stat.suffix}
                          </div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
  )
}