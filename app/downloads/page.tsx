import { Download, FileText } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DownloadsPage() {
  // Sample data for downloads
  const studyPlans = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      date: "May 15, 2025",
      duration: "2 weeks",
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      date: "May 10, 2025",
      duration: "1 week",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      date: "May 5, 2025",
      duration: "1 month",
    },
  ]

  const videoNotes = [
    {
      id: 1,
      title: "Advanced CSS Techniques",
      videoTitle: "CSS Masterclass 2025",
      date: "May 18, 2025",
    },
    {
      id: 2,
      title: "React Performance Optimization",
      videoTitle: "React Deep Dive Series - Part 3",
      date: "May 12, 2025",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Downloads</h1>
            <p className="text-muted-foreground">Access all your generated study plans and notes.</p>
          </div>

          <Tabs defaultValue="study-plans">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
              <TabsTrigger value="video-notes">Video Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="study-plans" className="mt-6 space-y-6">
              {studyPlans.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {studyPlans.map((plan) => (
                    <Card key={plan.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{plan.title}</CardTitle>
                          <Badge variant="outline">{plan.duration}</Badge>
                        </div>
                        <CardDescription>{plan.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="mb-3 rounded border overflow-hidden">
                          <div className="aspect-[3/2] w-full bg-muted/50 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Study Plan PDF</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No study plans yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Create your first study plan to see it here.</p>
                  <Button className="mt-4" asChild>
                    <a href="/plan">Create Study Plan</a>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="video-notes" className="mt-6 space-y-6">
              {videoNotes.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {videoNotes.map((note) => (
                    <Card key={note.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{note.title}</CardTitle>
                        <CardDescription>From: {note.videoTitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="mb-3 rounded border overflow-hidden">
                          <div className="aspect-video w-full bg-muted/50 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
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
                                className="text-muted-foreground/50"
                              >
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Video Notes PDF</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{note.date}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No video notes yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Analyze a YouTube video to generate notes.</p>
                  <Button className="mt-4" asChild>
                    <a href="/youtube">Analyze YouTube Video</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
