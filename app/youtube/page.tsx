"use client"

import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function YoutubePage() {
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
      <div className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-8 space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">YouTube Video Analyzer</h1>
              <p className="text-muted-foreground md:text-lg">
                Convert educational videos into structured notes and study materials.
              </p>
            </div>
          </ScrollReveal>

          <motion.div variants={container} initial="hidden" animate="show">
            <AnimatedCard>
              <motion.div variants={item} className="p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Video Analysis</h2>
                  <p className="text-muted-foreground">
                    Enter a YouTube URL and we'll analyze it to create study materials.
                  </p>
                </div>
                <form className="space-y-6">
                  <motion.div variants={item} className="space-y-2">
                    <Label htmlFor="video-url">YouTube Video URL</Label>
                    <Input
                      id="video-url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </motion.div>

                  <motion.div variants={item} className="space-y-2">
                    <Label htmlFor="duration">Study Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="30"
                      defaultValue="5"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </motion.div>

                  <motion.div variants={item} className="space-y-4">
                    <div className="flex justify-between">
                      <Label htmlFor="hours">Daily Study Time</Label>
                      <span className="text-sm text-muted-foreground">1 hour</span>
                    </div>
                    <Slider id="hours" defaultValue={[1]} max={4} min={0.5} step={0.5} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>30 min</span>
                      <span>4 hours</span>
                    </div>
                  </motion.div>

                  <motion.div variants={item}>
                    <AnimatedButton className="w-full" variant="gradient">
                      Analyze & Generate Notes
                    </AnimatedButton>
                  </motion.div>
                </form>
              </motion.div>
            </AnimatedCard>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <AnimatedCard className="mt-8">
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Analysis Results</h2>
                  <p className="text-muted-foreground">Your video analysis and study materials will appear here.</p>
                </div>
                <Tabs defaultValue="sections" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sections">Video Sections</TabsTrigger>
                    <TabsTrigger value="notes">Summary Notes</TabsTrigger>
                    <TabsTrigger value="questions">Practice Questions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sections" className="mt-4 space-y-4">
                    <div className="relative rounded-lg border border-dashed p-8 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
                      <p className="relative text-muted-foreground">Video sections will appear here after analysis.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-4 space-y-4">
                    <div className="relative rounded-lg border border-dashed p-8 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
                      <p className="relative text-muted-foreground">Summary notes will appear here after analysis.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="questions" className="mt-4 space-y-4">
                    <div className="relative rounded-lg border border-dashed p-8 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
                      <p className="relative text-muted-foreground">
                        Practice questions will appear here after analysis.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </AnimatedCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <AnimatedCard className="mt-8">
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Example Analysis</h2>
                  <p className="text-muted-foreground">Here's an example of what your analysis might look like.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Video Sections</h3>
                    <Separator className="my-2" />
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-sm font-medium text-muted-foreground">0:00 - 2:15</span>
                        <span className="text-sm">Introduction to the topic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sm font-medium text-muted-foreground">2:16 - 8:45</span>
                        <span className="text-sm">Core concepts explained</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sm font-medium text-muted-foreground">8:46 - 15:30</span>
                        <span className="text-sm">Practical examples</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sm font-medium text-muted-foreground">15:31 - 20:00</span>
                        <span className="text-sm">Advanced techniques</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Key Takeaways</h3>
                    <Separator className="my-2" />
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Understanding the fundamental principles</li>
                      <li>How to apply concepts in real-world scenarios</li>
                      <li>Common mistakes to avoid</li>
                      <li>Best practices for implementation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Practice Questions</h3>
                    <Separator className="my-2" />
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">1. What is the main concept discussed in this video?</p>
                        <p className="text-sm text-muted-foreground">
                          Think about how the presenter introduced the topic.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">2. How would you apply the techniques shown at 12:30?</p>
                        <p className="text-sm text-muted-foreground">Consider the practical examples demonstrated.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg overflow-hidden border">
                  <div className="relative aspect-video w-full">
                    <img
                      src="/images/youtube-thumbnail.png"
                      alt="Example YouTube video thumbnail"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-primary/90 p-4 text-primary-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3">
                    <h4 className="font-medium">Introduction to React Hooks - Complete Tutorial</h4>
                    <p className="text-sm text-muted-foreground">Example Educational Video • 25:42</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </div>
      <SiteFooter />
      <FloatingNav />
    </div>
  )
}
