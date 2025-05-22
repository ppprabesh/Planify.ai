import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingNav } from "@/components/ui/floating-nav"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { StudyPlanForm } from "@/components/studyplan/study-plan-form"

export default function PlanPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-8 space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create Your Study Plan</h1>
              <p className="text-muted-foreground md:text-lg">
                Fill in the details below and let our AI create a personalized study plan for you.
              </p>
            </div>
          </ScrollReveal>

          <StudyPlanForm />
        </div>
      </div>

      
      <SiteFooter />
      <FloatingNav />
    </div>
  )
}
