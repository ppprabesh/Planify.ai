"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Mail, Pencil } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function ResultPage() {
  // Sample study plan data
  const studyPlan = {
    subject: "JavaScript Fundamentals",
    duration: "2 weeks",
    dailyHours: 2,
    days: [
      {
        day: 1,
        topic: "JavaScript Basics & Syntax",
        timeToSpend: "2 hours",
        resources: [
          { title: "MDN Web Docs - JavaScript Basics", url: "#" },
          { title: "JavaScript Fundamentals Course - Chapter 1", url: "#" },
        ],
        practice: "Complete 5 basic syntax exercises focusing on variables, data types, and operators.",
      },
      {
        day: 2,
        topic: "Functions & Scope",
        timeToSpend: "2 hours",
        resources: [
          { title: "MDN Web Docs - Functions", url: "#" },
          { title: "JavaScript Fundamentals Course - Chapter 2", url: "#" },
        ],
        practice: "Write 3 functions with different parameter patterns and scope examples.",
      },
      {
        day: 3,
        topic: "Arrays & Array Methods",
        timeToSpend: "2 hours",
        resources: [
          { title: "MDN Web Docs - Arrays", url: "#" },
          { title: "JavaScript Fundamentals Course - Chapter 3", url: "#" },
        ],
        practice: "Implement 5 common array operations using array methods.",
      },
      {
        day: 4,
        topic: "Objects & Object Methods",
        timeToSpend: "2 hours",
        resources: [
          { title: "MDN Web Docs - Objects", url: "#" },
          { title: "JavaScript Fundamentals Course - Chapter 4", url: "#" },
        ],
        practice: "Create objects with methods and practice accessing properties.",
      },
      {
        day: 5,
        topic: "DOM Manipulation",
        timeToSpend: "2 hours",
        resources: [
          { title: "MDN Web Docs - DOM", url: "#" },
          { title: "JavaScript Fundamentals Course - Chapter 5", url: "#" },
        ],
        practice: "Build a simple interactive webpage that responds to user events.",
      },
    ],
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 container py-8 md:py-12 relative">
        <div className="absolute inset-0 bg-[url('/images/plan-result-bg.png')] bg-cover bg-center opacity-5" />
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Study Plan</h1>
                <div className="flex gap-2">
                  <AnimatedButton variant="outline" size="sm" className="gap-1">
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit Schedule</span>
                  </AnimatedButton>
                  <AnimatedButton variant="outline" size="sm" className="gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email Plan</span>
                  </AnimatedButton>
                  <AnimatedButton variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </AnimatedButton>
                </div>
              </div>
              <p className="text-muted-foreground">
                Here's your personalized study plan for {studyPlan.subject} over {studyPlan.duration}.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AnimatedCard className="mb-8 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Plan Overview</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Subject</p>
                    <p className="text-sm text-muted-foreground">{studyPlan.subject}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Duration</p>
                    <p className="text-sm text-muted-foreground">{studyPlan.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Daily Hours</p>
                    <p className="text-sm text-muted-foreground">{studyPlan.dailyHours} hours</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </ScrollReveal>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <motion.h2 variants={item} className="text-2xl font-bold">
              Daily Schedule
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {studyPlan.days.map((day, index) => (
                <motion.div key={index} variants={item}>
                  <AnimatedCard className="mb-3 overflow-hidden">
                    <AccordionItem value={`day-${index}`} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2 text-left">
                          <Badge variant="outline">Day {day.day}</Badge>
                          <span>{day.topic}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-4 p-2">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Time to Spend</p>
                            <p className="text-sm text-muted-foreground">{day.timeToSpend}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Resources</p>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                              {day.resources.map((resource, i) => (
                                <li key={i}>
                                  <a href={resource.url} className="hover:underline text-primary">
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Practice</p>
                            <p className="text-sm text-muted-foreground">{day.practice}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </AnimatedCard>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex justify-center">
              <AnimatedButton asChild variant="gradient">
                <Link href="/plan">Create Another Plan</Link>
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <SiteFooter />
      <FloatingNav />
    </div>
  )
}
