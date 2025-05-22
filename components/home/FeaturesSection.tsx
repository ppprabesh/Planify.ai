"use client"


import { BookOpen, Clock, Download } from "lucide-react"
import { AnimatedCard } from "../ui/animated-card"
import { Calendar } from "../ui/calendar"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ScrollReveal } from "../ui/scroll-reveal"

export function FeaturesSection() {
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
  return (
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
  )
}