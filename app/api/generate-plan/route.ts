import { NextResponse } from "next/server"

// Add the adaptive prompt function at the top of your file
const generateAdaptivePrompt = (subject: string, duration: string, hoursPerDay: string, notes?: string, youtubeUrl?: string) => {
  // Categorize the subject to determine appropriate language and approach
  const getSubjectCategory = (subject: string) => {
    const academicKeywords = ['math', 'science', 'history', 'literature', 'physics', 'chemistry', 'biology', 'programming', 'computer', 'economics', 'psychology', 'philosophy', 'language', 'english', 'spanish', 'french', 'calculus', 'algebra', 'geometry'];
    const skillKeywords = ['guitar', 'piano', 'drawing', 'painting', 'cooking', 'photography', 'writing', 'singing', 'dancing', 'music', 'art', 'design'];
    const sportsKeywords = ['football', 'basketball', 'tennis', 'swimming', 'running', 'soccer', 'dribbling', 'shooting', 'fitness', 'workout', 'martial arts', 'boxing', 'yoga', 'cricket', 'baseball', 'volleyball'];
    const craftKeywords = ['knitting', 'woodworking', 'pottery', 'gardening', 'crafting', 'sewing', 'jewelry', 'carpentry', 'sculpting'];
    
    const subjectLower = subject.toLowerCase();
    
    if (sportsKeywords.some(keyword => subjectLower.includes(keyword))) return 'sports';
    if (skillKeywords.some(keyword => subjectLower.includes(keyword))) return 'skill';
    if (craftKeywords.some(keyword => subjectLower.includes(keyword))) return 'craft';
    if (academicKeywords.some(keyword => subjectLower.includes(keyword))) return 'academic';
    
    // Default categorization based on common patterns
    if (subjectLower.includes('learn') || subjectLower.includes('study')) return 'academic';
    if (subjectLower.includes('train') || subjectLower.includes('practice')) return 'sports';
    
    return 'general'; // Default fallback
  };

  const category = getSubjectCategory(subject);
  
  // Define category-specific language and approaches
  const categoryConfig = {
    academic: {
      action: 'study',
      planType: 'study plan',
      sessionType: 'study sessions',
      activities: 'reading, problem-solving, note-taking, and review',
      resources: 'textbooks, online courses, practice problems, and educational websites',
      assessments: 'quizzes, mock exams, and knowledge tests'
    },
    sports: {
      action: 'train',
      planType: 'training plan',
      sessionType: 'training sessions',
      activities: 'drills, practice exercises, skill development, and conditioning',
      resources: 'training videos, technique tutorials, drill guides, and coaching resources',
      assessments: 'skill assessments, progress tracking, and performance evaluations'
    },
    skill: {
      action: 'practice',
      planType: 'learning plan',
      sessionType: 'practice sessions',
      activities: 'hands-on practice, technique refinement, and creative exercises',
      resources: 'tutorial videos, practice exercises, technique guides, and community forums',
      assessments: 'skill demonstrations, progress reviews, and practical applications'
    },
    craft: {
      action: 'work on',
      planType: 'learning plan',
      sessionType: 'practice sessions',
      activities: 'hands-on creation, technique practice, and project work',
      resources: 'tutorial videos, step-by-step guides, pattern libraries, and maker communities',
      assessments: 'project completions, technique evaluations, and skill progressions'
    },
    general: {
      action: 'learn',
      planType: 'learning plan',
      sessionType: 'learning sessions',
      activities: 'practice, exploration, and skill development',
      resources: 'online resources, tutorials, guides, and community content',
      assessments: 'progress checks, practical applications, and skill evaluations'
    }
  };

  const config = categoryConfig[category];

  const prompt = `
You are an intelligent ${config.planType} assistant integrated into a web app. Your task is to create an optimal, personalized ${config.planType} based on user input. The user wants to ${config.action} ${subject} and has provided their available time and preferences.

Based on the input, generate a day-wise schedule that:

1. **Content Organization**: Break down ${subject} into logical, progressive components that build upon each other
2. **Time Allocation**: Distribute ${config.sessionType} wisely across the total duration and daily hours
3. **Resource Recommendations**: Suggest free websites, ${config.resources} for each topic/day
4. **Practice & Application**: Include ${config.activities} appropriate for ${subject}
5. **Progress Tracking**: Incorporate ${config.assessments} and review periods
6. **Clear Structure**: Present everything in clean, organized tables and sections
7. **Downloadable Format**: Provide a plain text version suitable for download
8. **Clickable Links**: Ensure all web resources are directly clickable with distinct styling

**Adaptation Guidelines:**
${category === 'sports' ? 
  `- Use training terminology (drills, reps, sets, conditioning)
   - Focus on physical skill development and muscle memory
   - Include warm-up, main training, and cool-down periods
   - Suggest progression tracking for measurable improvement` :
category === 'skill' ?
  `- Emphasize hands-on practice and creative exploration  
   - Include technique building and artistic development
   - Suggest projects or pieces to work toward
   - Balance technical skills with creative expression` :
category === 'craft' ?
  `- Focus on project-based learning and creation
   - Include material lists and tool recommendations
   - Suggest beginner to advanced project progressions
   - Emphasize safety and proper technique` :
  `- Use appropriate terminology for the subject area
   - Balance theoretical understanding with practical application
   - Include various learning modalities (visual, auditory, kinesthetic)
   - Suggest both structured lessons and exploratory activities`
}

**User Input:**
- Subject: ${subject}
- Duration: ${duration} 
- Daily Time Available: ${hoursPerDay} hours
- Additional Notes: ${notes || "None"}
${youtubeUrl ? `- Reference Video: ${youtubeUrl}` : ""}

${youtubeUrl ? `
**Video Integration:**
If a video is provided, analyze its content and:
- Break the video content into segments matching the user's available time
- Create summaries and key takeaways for each segment  
- Generate appropriate practice exercises or application activities
- Suggest how to use the video content within the overall ${config.planType}
` : ""}

**Output Requirements:**
1. Start with a brief overview and objectives
2. Create detailed daily schedules using tables
3. Include specific, clickable resource links (styled with different colors)
4. Add progress milestones and checkpoints
5. Provide practical tips for success
6. End with a complete plain text version clearly marked as "DOWNLOADABLE TEXT VERSION"

Generate the complete ${config.planType} now.`;

  return prompt;
};

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { subject, duration, hoursPerDay, notes, youtubeUrl } = body

    if (!subject || !duration || !hoursPerDay) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    // Replace the hardcoded prompt with the adaptive one
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
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Together API error:", errorData)
      return NextResponse.json({ error: errorData.error?.message || "Together API error" }, { status: 500 })
    }

    const data = await response.json()
    console.log("Together API response:", data)

    const generatedPlan = data.choices?.[0]?.message?.content

    if (!generatedPlan) {
      return NextResponse.json({ error: "Together API returned empty response." }, { status: 500 })
    }

    return NextResponse.json({ plan: generatedPlan })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json({ error: "Failed to generate plan." }, { status: 500 })
  }
}