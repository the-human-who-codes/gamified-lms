"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../contexts/auth-context"
import { useCourses } from "../contexts/course-context"
import { LucideLoader2, LucideCheckCircle, LucideUsers, LucideClock, LucideBarChart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CourseEnrollmentProps {
  courseId: string
  onEnrollmentComplete?: () => void
}

export function CourseEnrollment({ courseId, onEnrollmentComplete }: CourseEnrollmentProps) {
  const { user } = useAuth()
  const { courses, enrollInCourse } = useCourses()

  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const course = courses.find((c) => c.id === courseId)
  if (!course) return <div>Course not found</div>

  const isAlreadyEnrolled = user && course.enrolledStudents.includes(user.id)

  const handleEnroll = async () => {
    if (!user) {
      setError("You must be logged in to enroll in a course")
      return
    }

    if (user.role !== "student") {
      setError("Only students can enroll in courses")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await enrollInCourse(courseId)
      setEnrolled(true)
      if (onEnrollmentComplete) {
        onEnrollmentComplete()
      }
    } catch (err) {
      setError("Failed to enroll in the course. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (isAlreadyEnrolled || enrolled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>You're Enrolled!</CardTitle>
          <CardDescription>You have successfully enrolled in this course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-4 mb-4">
              <LucideCheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Welcome to {course.title}!</h3>
            <p className="text-gray-500 mb-4">You can now access all course materials and start learning</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Start Learning</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll in this Course</CardTitle>
        <CardDescription>Join {course.enrolledStudents.length} other students learning {course.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{course.level}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <LucideClock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <LucideUsers className="h-4 w-4 mr-1" />
                {course.enrolledStudents.length} students
              </div>
            </div>
          </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-medium mb-2">What you'll learn:</h3>
              <p className="text-gray-700 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <LucideCheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <LucideBarChart className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-700">Track Your Progress</h4>
                <p className="text-sm text-blue-600">Earn XP and badges as you complete lessons and assignments</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleEnroll} 
          disabled={loading} 
          className="w-full"
        >
          {loading ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Enrolling...
            </>
          ) : (
            "Enroll Now"
          )}
        </Button>
  </CardFooter>
    </Card>
  )
}
