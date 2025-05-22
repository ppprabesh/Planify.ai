"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Calendar, Clock, Download, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Custom Study Plans",
      description: "Get personalized study plans tailored to your learning style, goals, and schedule.",
    },
    {
      icon: BookOpen,
      title: "YouTube Note Generator",
      description: "Convert educational videos into structured notes and study materials.",
    },
    {
      icon: Clock,
      title: "Daily Reminders",
      description: "Stay on track with smart notifications and progress tracking.",
    },
    {
      icon: Download,
      title: "Downloadable PDFs",
      description: "Export your study plans and notes in PDF format for offline studying.",
    },
  ]

  const stats = [
    { value: 10000, label: "Active Users" },
    { value: 50000, label: "Study Plans Created" },
    { value: 98, label: "Satisfaction Rate", suffix: "%" },
    { value: 24, label: "Hours Saved Weekly" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        {/* Hero Section */}
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

        {/* Stats Section */}
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

        {/* Features Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <ScrollReveal>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Everything you need to optimize your learning experience
                  </p>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
                {features.map((feature, index) => (
                  <ScrollReveal key={index} delay={index * 0.1} direction="up">
                    <AnimatedCard className="h-full overflow-hidden">
                      <div className="relative h-40 w-full overflow-hidden">
                        <img
                          src={`/images/feature-${index + 1}.png`}
                          alt={feature.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      </div>
                      <CardHeader>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="mt-4">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </AnimatedCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Three simple steps to transform your study habits
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Input Your Subject",
                  description: "Tell us what you're studying and your goals.",
                  image: "/images/step-1.png",
                },
                {
                  step: 2,
                  title: "AI Creates Your Plan",
                  description: "Our AI generates a personalized study schedule.",
                  image: "/images/step-2.png",
                },
                {
                  step: 3,
                  title: "Start Learning",
                  description: "Follow your plan and track your progress.",
                  image: "/images/step-3.png",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.2} direction="up">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 relative">
                      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={`Step ${item.step}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-sm font-bold">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                  <AnimatedCard className="bg-primary/5 border-none">
                    <CardContent className="p-6 md:p-8">
                      <blockquote className="text-lg italic text-foreground">
                        "The AI Study Planner has completely transformed how I prepare for exams. The personalized study
                        plans and YouTube note generator have saved me countless hours. I've improved my grades
                        significantly since I started using it!"
                      </blockquote>
                      <div className="mt-6 flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src="/images/testimonial-avatar.png"
                            alt="Sarah K."
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">Sarah K.</p>
                          <p className="text-sm text-muted-foreground">Computer Science Student</p>
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative overflow-hidden w-full py-12 md:py-24 bg-muted/50">
          <div className="absolute inset-0 bg-[url('/images/study-pattern.png')] bg-repeat opacity-5" />
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose AI Study Planner</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Benefits that make us the best choice for your academic success
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Personalized learning paths based on your goals",
                "Save hours of planning and organization time",
                "Improve retention with optimized study schedules",
                "Track your progress and stay motivated",
                "Access your study materials anywhere, anytime",
                "Continuously improving AI for better results",
              ].map((benefit, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className="flex items-start gap-2 rounded-lg border p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </div>
      <SiteFooter />
      <FloatingNav />
    </div>
  )
}



