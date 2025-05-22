import { NextResponse } from "next/server"

/**
 * Generates an adaptive, professionally-structured prompt for personalized learning plan creation
 * @param subject - The subject matter to be learned
 * @param duration - Total duration for the learning plan
 * @param hoursPerDay - Daily time commitment in hours
 * @param notes - Optional additional user notes
 * @param youtubeUrl - Optional reference video URL
 * @returns Professionally formatted prompt string
 */
const generateAdaptivePrompt = (
  subject: string, 
  duration: string, 
  hoursPerDay: string, 
  notes?: string, 
  youtubeUrl?: string
): string => {
  
  /**
   * Categorizes the subject matter to determine appropriate pedagogical approach
   */
  type CategoryKey = 'academic' | 'physical_sports' | 'creative_skills' | 'practical_crafts' | 'professional_skills' | 'general';

  const getSubjectCategory = (subject: string): CategoryKey => {
    const categoryKeywords: Record<CategoryKey, string[]> = {
      academic: [
        'mathematics', 'math', 'science', 'history', 'literature', 'physics', 
        'chemistry', 'biology', 'programming', 'computer science', 'economics', 
        'psychology', 'philosophy', 'linguistics', 'english', 'spanish', 'french', 
        'calculus', 'algebra', 'geometry', 'statistics', 'research', 'academic'
      ],
      creative_skills: [
        'guitar', 'piano', 'drawing', 'painting', 'photography', 'writing', 
        'creative writing', 'singing', 'dancing', 'music composition', 'art', 
        'graphic design', 'web design', 'animation', 'filmmaking', 'acting'
      ],
      physical_sports: [
        'football', 'basketball', 'tennis', 'swimming', 'running', 'soccer', 
        'dribbling', 'shooting', 'fitness', 'workout', 'martial arts', 'boxing', 
        'yoga', 'cricket', 'baseball', 'volleyball', 'athletics', 'training'
      ],
      practical_crafts: [
        'knitting', 'woodworking', 'pottery', 'gardening', 'crafting', 'sewing', 
        'jewelry making', 'carpentry', 'sculpting', 'cooking', 'baking', 
        'home improvement', 'diy', 'mechanical', 'electrical'
      ],
      professional_skills: [
        'leadership', 'management', 'communication', 'presentation', 'negotiation', 
        'sales', 'marketing', 'project management', 'data analysis', 'consulting', 
        'public speaking', 'networking', 'entrepreneurship'
      ],
      general: []
    };

    const subjectLower = subject.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categoryKeywords) as [CategoryKey, string[]][]) {
      if (keywords.some(keyword => subjectLower.includes(keyword))) {
        return category;
      }
    }
    
    // Contextual pattern matching for edge cases
    if (subjectLower.includes('learn') || subjectLower.includes('study')) return 'academic';
    if (subjectLower.includes('train') || subjectLower.includes('practice')) return 'physical_sports';
    if (subjectLower.includes('business') || subjectLower.includes('career')) return 'professional_skills';
    
    return 'general';
  };

  const category = getSubjectCategory(subject);
  
  /**
   * Configuration object defining category-specific pedagogical approaches
   */
  const categoryConfigurations: Record<CategoryKey, {
    primaryAction: string;
    planDesignation: string;
    sessionTerminology: string;
    coreActivities: string;
    resourceTypes: string;
    assessmentMethods: string;
    learningApproach: string;
  }> = {
    academic: {
      primaryAction: 'master',
      planDesignation: 'comprehensive study plan',
      sessionTerminology: 'study sessions',
      coreActivities: 'theoretical analysis, problem-solving exercises, critical thinking applications, and systematic review',
      resourceTypes: 'peer-reviewed materials, academic databases, educational platforms, practice repositories, and scholarly resources',
      assessmentMethods: 'formative assessments, summative evaluations, peer reviews, and comprehensive examinations',
      learningApproach: 'structured academic methodology with progressive complexity'
    },
    physical_sports: {
      primaryAction: 'develop proficiency in',
      planDesignation: 'systematic training regimen',
      sessionTerminology: 'training sessions',
      coreActivities: 'skill-specific drills, technique refinement, physical conditioning, and performance analysis',
      resourceTypes: 'professional coaching videos, technique demonstrations, training protocols, and performance analytics tools',
      assessmentMethods: 'skill assessments, performance metrics, progress tracking, and competitive evaluations',
      learningApproach: 'progressive physical development with emphasis on muscle memory and technique mastery'
    },
    creative_skills: {
      primaryAction: 'cultivate expertise in',
      planDesignation: 'creative development program',
      sessionTerminology: 'practice sessions',
      coreActivities: 'hands-on creation, technique exploration, artistic experimentation, and portfolio development',
      resourceTypes: 'masterclass tutorials, technique libraries, creative community platforms, and inspiration galleries',
      assessmentMethods: 'portfolio reviews, peer critiques, project completions, and artistic growth evaluations',
      learningApproach: 'balanced integration of technical proficiency and creative expression'
    },
    practical_crafts: {
      primaryAction: 'achieve competency in',
      planDesignation: 'hands-on learning program',
      sessionTerminology: 'workshop sessions',
      coreActivities: 'project-based construction, technique application, tool mastery, and quality craftsmanship',
      resourceTypes: 'instructional guides, technique demonstrations, project templates, and crafting communities',
      assessmentMethods: 'project evaluations, technique assessments, quality reviews, and skill progressions',
      learningApproach: 'project-driven learning with emphasis on practical application and safety protocols'
    },
    professional_skills: {
      primaryAction: 'develop professional competence in',
      planDesignation: 'professional development program',
      sessionTerminology: 'development sessions',
      coreActivities: 'case study analysis, practical applications, role-playing exercises, and strategic planning',
      resourceTypes: 'industry publications, professional courses, case study databases, and networking platforms',
      assessmentMethods: 'competency evaluations, peer feedback, practical demonstrations, and professional assessments',
      learningApproach: 'competency-based development with real-world application focus'
    },
    general: {
      primaryAction: 'develop proficiency in',
      planDesignation: 'personalized learning program',
      sessionTerminology: 'learning sessions',
      coreActivities: 'structured practice, knowledge application, skill development, and reflective learning',
      resourceTypes: 'curated educational content, interactive tutorials, community resources, and reference materials',
      assessmentMethods: 'progress evaluations, practical applications, self-assessments, and milestone reviews',
      learningApproach: 'adaptive learning methodology tailored to individual learning preferences'
    }
  };

  const configuration = categoryConfigurations[category];

  const professionalPrompt = `Create a comprehensive ${configuration.planDesignation} for learning ${subject}.

REQUIREMENTS:
- Duration: ${duration}
- Daily time: ${hoursPerDay} hours
- Subject category: ${category}
- Learning approach: ${configuration.learningApproach}
${notes ? `- Special notes: ${notes}` : ''}
${youtubeUrl ? `- Reference video: ${youtubeUrl}` : ''}

STRUCTURE YOUR RESPONSE WITH:

1. PROGRAM OVERVIEW
- Brief introduction and learning objectives
- Expected outcomes after completion

2. DETAILED DAILY SCHEDULE
Create a day-by-day breakdown in table format with:
- Day number and topic
- Specific learning objectives
- Activities: ${configuration.coreActivities}
- Time allocation
- Resources with clickable links

3. RESOURCE LIBRARY
Provide specific, working links to:
- ${configuration.resourceTypes}
- Free online materials
- Practice exercises
- Community forums

4. PROGRESS TRACKING
Include:
- ${configuration.assessmentMethods}
- Weekly milestones
- Success metrics

5. PRACTICAL TIPS
- Study/practice strategies
- Common challenges and solutions
- Motivation techniques

6. DOWNLOADABLE TEXT VERSION
Provide a clean, plain text summary at the end marked clearly as "DOWNLOADABLE VERSION"

${youtubeUrl ? `
VIDEO INTEGRATION:
- Break down the video content into daily segments
- Create exercises based on video demonstrations
- Suggest pause points for practice
` : ''}

Focus on ${configuration.primaryAction} ${subject} using ${configuration.learningApproach}. Make it practical, actionable, and professionally formatted.`;

  return professionalPrompt;
};

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { subject, duration, hoursPerDay, notes, youtubeUrl } = body

    // Enhanced input validation with descriptive error messages
    if (!subject || !duration || !hoursPerDay) {
      return NextResponse.json({ 
        error: "Required fields missing. Please provide subject, duration, and hours per day.",
        details: {
          subject: !subject ? "Subject is required" : "Valid",
          duration: !duration ? "Duration is required" : "Valid", 
          hoursPerDay: !hoursPerDay ? "Hours per day is required" : "Valid"
        }
      }, { status: 400 })
    }

    // Generate the enhanced adaptive prompt
    const prompt = generateAdaptivePrompt(subject, duration, hoursPerDay, notes, youtubeUrl);

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000, // Increased for more comprehensive responses
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Together API error:", errorData)
      return NextResponse.json({ 
        error: "External API service error", 
        details: errorData.error?.message || "Unknown API error" 
      }, { status: 500 })
    }

    const data = await response.json()
    console.log("Together API response received successfully")

    const generatedPlan = data.choices?.[0]?.message?.content

    if (!generatedPlan) {
      return NextResponse.json({ 
        error: "No learning plan generated", 
        details: "The AI service returned an empty response" 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      plan: generatedPlan,
      metadata: {
        subject,
        duration,
        hoursPerDay,
        hasNotes: !!notes,
        hasVideo: !!youtubeUrl,
        generatedAt: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error("Error generating learning plan:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: "Failed to process learning plan generation request" 
    }, { status: 500 })
  }
}