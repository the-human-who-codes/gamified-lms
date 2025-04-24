"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGamification } from "../contexts/gamification-context"
import { useCourses } from "../contexts/course-context"
import { QuizComponent } from "./quiz-component"
import { AssignmentSubmission } from "./assignment-submission"
import {
  LucidePlay,
  LucideFileText,
  LucideVideo,
  LucideImage,
  LucideClipboard,
  LucideFileEdit,
  LucideCheckCircle,
} from "lucide-react"

interface LessonContentViewerProps {
  courseId: string
  lessonId: string
  contentId: string
  onComplete: () => void
}

export function LessonContentViewer({ courseId, lessonId, contentId, onComplete }: LessonContentViewerProps) {
  const { awardXp } = useGamification()
  const { courses, updateProgress, getUserProgressForCourse } = useCourses()

  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const course = courses.find((c) => c.id === courseId)
  const module = course?.modules.find((m) => m.lessons.some((l) => l.id === lessonId))
  const lesson = module?.lessons.find((l) => l.id === lessonId)
  const content = lesson?.contents.find((c) => c.id === contentId)

  const userProgress = getUserProgressForCourse(courseId)

  useEffect(() => {
    if (userProgress && content) {
      // Check if this content is already completed
      setCompleted(userProgress.completedContents.includes(contentId))
    }
    setLoading(false)
  }, [userProgress, contentId])

  if (!course || !module || !lesson || !content) {
    return <div>Content not found</div>
  }

  const handleContentComplete = async () => {
    if (completed) return

    try {
      // Mark content as completed
      await updateProgress({
        courseId,
        completedContents: [...(userProgress?.completedContents || []), contentId],
      })

      // Check if all content in lesson is completed
      const allLessonContents = lesson.contents.map((c) => c.id)
      const completedContents = [...(userProgress?.completedContents || []), contentId]

      const allCompleted = allLessonContents.every((id) => completedContents.includes(id))

      if (allCompleted && !userProgress?.completedLessons.includes(lessonId)) {
        // Mark lesson as completed
        await updateProgress({
          courseId,
          completedLessons: [...(userProgress?.completedLessons || []), lessonId],
        })

        // Award XP for completing the lesson
        await awardXp(50, `Completed lesson: ${lesson.title}`, { courseId, lessonId })
      }

      // Award XP for completing the content
      if (content.type !== "quiz" && content.type !== "assignment") {
        // For quiz and assignment, XP is awarded in their respective components
        await awardXp(content.points || 0, `Completed ${content.type}: ${content.title}`, {
          courseId,
          lessonId,
          contentId,
        })
      }

      setCompleted(true)
      onComplete()
    } catch (error) {
      console.error("Error marking content as completed:", error)
    }
  }

  const renderContent = () => {
    switch (content.type) {
      case "text":
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>
        )

      case "video":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              <img
                src={content.content || "/placeholder.svg"}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <Button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 flex items-center justify-center"
                size="icon"
              >
                <LucidePlay className="h-8 w-8" />
              </Button>
            </div>
            <p className="text-gray-500">
              This is a video placeholder. In a real application, this would be an embedded video player.
            </p>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img src={content.content || "/placeholder.svg"} alt={content.title} className="w-full h-auto" />
            </div>
          </div>
        )

      case "quiz":
        try {
          const quizData = JSON.parse(content.content)
          return (
            <QuizComponent
              quizId={contentId}
              courseId={courseId}
              lessonId={lessonId}
              title={content.title}
              questions={quizData.questions}
              onComplete={(score, totalPoints) => {
                handleContentComplete()
              }}
            />
          )
        } catch (error) {
          return <div>Error loading quiz: Invalid quiz data</div>
        }

      case "assignment":
        return (
          <AssignmentSubmission
            assignmentId={contentId}
            courseId={courseId}
            lessonId={lessonId}
            title={content.title}
            description={content.content}
            points={content.points || 0}
            onComplete={() => handleContentComplete()}
          />
        )

      default:
        return <div>Unsupported content type</div>
    }
  }

  const getContentIcon = () => {
    switch (content.type) {
      case "text":
        return <LucideFileText className="h-5 w-5 text-blue-500" />
      case "video":
        return <LucideVideo className="h-5 w-5 text-red-500" />
      case "image":
        return <LucideImage className="h-5 w-5 text-green-500" />
      case "quiz":
        return <LucideClipboard className="h-5 w-5 text-amber-500" />
      case "assignment":
        return <LucideFileEdit className="h-5 w-5 text-violet-500" />
      default:
        return <LucideFileText className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getContentIcon()}
            <h2 className="text-xl font-bold">{content.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{content.points || 0} XP</Badge>
            {completed && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                <LucideCheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-6">{renderContent()}</div>

        {!completed && content.type !== "quiz" && content.type !== "assignment" && (
          <div className="flex justify-end">
            <Button onClick={handleContentComplete}>Mark as Completed</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
