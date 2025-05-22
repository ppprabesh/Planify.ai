"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { jsPDF } from "jspdf"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function StudyPlanForm() {
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("")
  const [dailyHours, setDailyHours] = useState(2)
  const [notes, setNotes] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePlan()
  }

  const generatePlan = async () => {
    setLoading(true)
    setError("")
    setResult("")

    try {
      // Updated endpoint to match your API route
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          duration,
          hoursPerDay: dailyHours, // Make sure this matches your API expectation
          notes,
          youtubeUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setResult(data.plan)
      } else {
        setError(data.error || "Failed to generate plan.")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    await generatePlan()
  }

  const downloadAsTxt = (text: string) => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "study-plan.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAsPdf = (text: string) => {
    const doc = new jsPDF()
    const lines = doc.splitTextToSize(text, 180)
    doc.setFont("Courier", "normal")
    doc.setFontSize(10)
    doc.text(lines, 10, 10)
    doc.save("study-plan.pdf")
  }

  // Enhanced function to extract plain text from markdown/formatted content
  const extractPlainText = (content: string) => {
    // Look for the "DOWNLOADABLE TEXT VERSION" section first
    const textVersionMatch = content.match(/DOWNLOADABLE TEXT VERSION[:\s]*\n([\s\S]*?)(?:\n\n---|\n\n\*\*|$)/i)
    if (textVersionMatch) {
      return textVersionMatch[1].trim()
    }

    // Fallback: clean up the entire content
    return content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
      .replace(/#{1,6}\s/g, '')        // Remove headers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/\|[^\n]*\|/g, '')      // Remove table rows
      .replace(/[-=]{3,}/g, '')        // Remove horizontal rules
      .trim()
  }

  const handleDownloadTxt = () => {
    const plainText = extractPlainText(result)
    downloadAsTxt(plainText)
  }

  const handleDownloadPdf = () => {
    const plainText = extractPlainText(result)
    downloadAsPdf(plainText)
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show">
        <AnimatedCard>
          <motion.div variants={item} className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Study Plan Details</h2>
              <p className="text-muted-foreground">
                Provide information about what you want to study and your preferences.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="subject">Subject or Topic</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., JavaScript, Dribbling Football, Guitar Playing, etc."
                  required
                />
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 1 week, 2 weeks, 1 month"
                  required
                />
              </motion.div>

              <motion.div variants={item} className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="hours">Daily Study/Practice Hours</Label>
                  <span className="text-sm text-muted-foreground">{dailyHours} hours</span>
                </div>
                <Slider
                  id="hours"
                  value={[dailyHours]}
                  onValueChange={(val) => setDailyHours(val[0])}
                  max={8}
                  min={1}
                  step={0.5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 hour</span>
                  <span>8 hours</span>
                </div>
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter goals, weak areas, preferences, current skill level, etc."
                  className="min-h-[100px]"
                />
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube Video URL (optional)</Label>
                <Input
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Paste a YouTube link for reference material"
                />
              </motion.div>

              <motion.div variants={item}>
                <AnimatedButton 
                  type="submit" 
                  className="w-full" 
                  variant="gradient" 
                  disabled={loading || !subject || !duration}
                >
                  {loading ? "Generating..." : "Generate Study Plan"}
                </AnimatedButton>
              </motion.div>
            </form>
          </motion.div>
        </AnimatedCard>
      </motion.div>

      <ScrollReveal delay={0.3}>
        <AnimatedCard className="mt-8 overflow-hidden w-full max-w-none">
          <div className="p-6 md:p-8 w-full">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">AI-Generated Learning Plan</h2>
              <p className="text-muted-foreground">
                Your personalized learning plan will appear here after generation.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <div className="relative rounded-lg border border-dashed p-6 text-sm font-mono bg-muted/30 overflow-auto max-h-[600px] w-full">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="ml-2">Generating your personalized plan...</p>
                </div>
              )}

              {!loading && !result && (
                <p className="text-muted-foreground">
                  Fill out the form above and click &quot;Generate Study Plan&quot; to see your personalized learning schedule.
                </p>
              )}

              {!loading && result && (
                <>
                  <div 
                    className="min-w-full whitespace-pre-wrap text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: result.replace(/\n/g, '<br/>') 
                    }}
                  />
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <AnimatedButton
                      onClick={handleRegenerate}
                      variant="outline"
                      className="text-sm"
                      disabled={loading}
                    >
                      {loading ? "Regenerating..." : "Regenerate Plan"}
                    </AnimatedButton>

                    <AnimatedButton
                      onClick={handleDownloadTxt}
                      variant="outline"
                      className="text-sm"
                    >
                      Download .txt
                    </AnimatedButton>

                    <AnimatedButton
                      onClick={handleDownloadPdf}
                      variant="outline"
                      className="text-sm"
                    >
                      Download .pdf
                    </AnimatedButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </AnimatedCard>
      </ScrollReveal>
    </>
  )
}