"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCourses, type StudentProgress } from "../contexts/course-context"
import { LucideSearch, LucideCheckCircle, LucideX, LucideCalendar, LucideZap } from "lucide-react"

interface StudentProgressTrackerProps {
  courseId: string
}

export function StudentProgressTracker({ courseId }: StudentProgressTrackerProps) {
  const { courses, userProgress } = useCourses()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const course = courses.find((c) => c.id === courseId)
  if (!course) return <div>Course not found</div>

  // Get all progress records for this course
  const courseProgress = userProgress.filter((p) => p.courseId === courseId)

  // Mock student data (in a real app, this would come from an API)
  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
    },
    {
      id: "6",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
    {
      id: "7",
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SG",
    },
    {
      id: "8",
      name: "Daniel Martinez",
      email: "daniel.martinez@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
    },
  ].filter((student) => course.enrolledStudents.includes(student.id))

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate overall course statistics
  const calculateOverallProgress = (progress: StudentProgress) => {
    const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0)
    const completedLessons = progress.completedLessons.length
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }

  const averageProgress =
    courseProgress.length > 0
      ? Math.round(courseProgress.reduce((sum, p) => sum + calculateOverallProgress(p), 0) / courseProgress.length)
      : 0

  const totalQuizAttempts = courseProgress.reduce((sum, p) => sum + Object.keys(p.quizScores).length, 0)
  const totalAssignmentSubmissions = courseProgress.reduce(
    (sum, p) => sum + Object.keys(p.assignmentSubmissions).length,
    0,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Progress</CardTitle>
        <CardDescription>Track student performance and engagement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="ghost" size="icon">
            <LucideSearch className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{averageProgress}%</div>
                    <p className="text-sm text-gray-500">Average Progress</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">{totalQuizAttempts}</div>
                    <p className="text-sm text-gray-500">Quiz Attempts</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{totalAssignmentSubmissions}</div>
                    <p className="text-sm text-gray-500">Assignment Submissions</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Module Completion</h3>
              {course.modules.map((module, index) => {
                const moduleCompletionCount = courseProgress.filter((p) =>
                  module.lessons.some((lesson) => p.completedLessons.includes(lesson.id)),
                ).length
                const completionPercentage =
                  students.length > 0 ? Math.round((moduleCompletionCount / students.length) * 100) : 0

                return (
                  <div key={module.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Module {index + 1}: {module.title}
                      </span>
                      <span>{completionPercentage}% of students completed</span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const progress = courseProgress.find((p) => p.userId === student.id)
                  const progressPercentage = progress ? calculateOverallProgress(progress) : 0
                  const lastAccessed = progress?.lastAccessed
                    ? new Date(progress.lastAccessed).toLocaleDateString()
                    : "Never"

                  return (
                    <div key={student.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{student.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{student.email}</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                        <LucideCalendar className="h-4 w-4" />
                        <span>Last active: {lastAccessed}</span>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                        <LucideZap className="h-4 w-4 text-amber-500" />
                        <span>{progress?.xpEarned || 0} XP earned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={progressPercentage} className="w-24 h-2" />
                        <span className="text-sm font-medium">{progressPercentage}%</span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-gray-500">No students found matching your search</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <div className="space-y-4">
              {course.modules.map((module) =>
                module.lessons.map((lesson) =>
                  lesson.contents
                    .filter((content) => content.type === "assignment")
                    .map((assignment) => {
                      const submissionCount = courseProgress.filter(
                        (p) => p.assignmentSubmissions[assignment.id] !== undefined,
                      ).length
                      const submissionRate =
                        students.length > 0 ? Math.round((submissionCount / students.length) * 100) : 0

                      return (
                        <div key={assignment.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{assignment.title}</h4>
                            <Badge variant="outline">{assignment.points} XP</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            Module: {module.title} • Lesson: {lesson.title}
                          </p>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Submission Rate</span>
                            <span>
                              {submissionCount} of {students.length} students ({submissionRate}%)
                            </span>
                          </div>
                          <Progress value={submissionRate} className="h-2 mb-4" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {students.map((student) => {
                              const progress = courseProgress.find((p) => p.userId === student.id)
                              const submitted = progress?.assignmentSubmissions[assignment.id] !== undefined

                              return (
                                <div key={student.id} className="flex items-center gap-2 p-2 border rounded">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={student.avatar} alt={student.name} />
                                    <AvatarFallback>
                                      {student.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm truncate flex-1">{student.name}</span>
                                  {submitted ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-emerald-50 text-emerald-600 border-emerald-200"
                                    >
                                      <LucideCheckCircle className="h-3 w-3 mr-1" />
                                      Submitted
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                      <LucideX className="h-3 w-3 mr-1" />
                                      Missing
                                    </Badge>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }),
                ),
              )}
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="space-y-4">
              {course.modules.map((module) =>
                module.lessons.map((lesson) =>
                  lesson.contents
                    .filter((content) => content.type === "quiz")
                    .map((quiz) => {
                      const attemptCount = courseProgress.filter((p) => p.quizScores[quiz.id] !== undefined).length
                      const attemptRate = students.length > 0 ? Math.round((attemptCount / students.length) * 100) : 0

                      // Calculate average score
                      const scores = courseProgress
                        .filter((p) => p.quizScores[quiz.id] !== undefined)
                        .map((p) => p.quizScores[quiz.id])
                      const averageScore =
                        scores.length > 0
                          ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
                          : 0

                      return (
                        <div key={quiz.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{quiz.title}</h4>
                            <Badge variant="outline">{quiz.points} XP</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            Module: {module.title} • Lesson: {lesson.title}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Attempt Rate</span>
                                <span>
                                  {attemptCount} of {students.length} students ({attemptRate}%)
                                </span>
                              </div>
                              <Progress value={attemptRate} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Average Score</span>
                                <span>{averageScore}%</span>
                              </div>
                              <Progress value={averageScore} className="h-2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {students.map((student) => {
                              const progress = courseProgress.find((p) => p.userId === student.id)
                              const score = progress?.quizScores[quiz.id]
                              const attempted = score !== undefined

                              return (
                                <div key={student.id} className="flex items-center gap-2 p-2 border rounded">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={student.avatar} alt={student.name} />
                                    <AvatarFallback>
                                      {student.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm truncate flex-1">{student.name}</span>
                                  {attempted ? (
                                    <Badge
                                      variant="outline"
                                      className={`${
                                        score >= 80
                                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                          : score >= 60
                                            ? "bg-amber-50 text-amber-600 border-amber-200"
                                            : "bg-red-50 text-red-600 border-red-200"
                                      }`}
                                    >
                                      {score}%
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                      <LucideX className="h-3 w-3 mr-1" />
                                      Not attempted
                                    </Badge>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }),
                ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
