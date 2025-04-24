"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { ProtectedRoute } from "@/app/components/protected-route"
import { useCourses } from "@/app/contexts/course-context"
import { useAuth } from "@/app/contexts/auth-context"
import { LucideBook, LucideBell, LucidePlus, LucideLoader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateCoursePage() {
  const router = useRouter()
  const { createCourse } = useCourses()
  const { user } = useAuth()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced" | "all levels">("beginner")
  const [duration, setDuration] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const newCourse = await createCourse({
        title,
        description,
        instructor: {
          id: user.id,
          name: user.name,
        },
        modules: [],
        image: "/placeholder.svg?height=150&width=300&text=" + encodeURIComponent(title.replace(/\s+/g, "+")),
        level,
        duration,
        tags: tags.split(",").map((tag) => tag.trim()),
      })

      router.push(`/courses/${newCourse.id}/edit`)
    } catch (err) {
      setError("Failed to create course. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["teacher", "admin"]}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto hidden md:block">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <LucideBook className="h-6 w-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-emerald-600">EduQuest</h1>
              </div>
            </div>

            <div className="p-4">
              <MainNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex justify-between items-center px-6 py-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                  <p className="text-gray-600">Create a new course for your students</p>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon">
                    <LucideBell className="h-5 w-5" />
                  </Button>
                  <UserNav />
                </div>
              </div>
            </header>

            <div className="p-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>Enter the basic information about your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Introduction to Data Science"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what students will learn in this course"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Difficulty Level</Label>
                        <Select
                          value={level}
                          onValueChange={(value: "beginner" | "intermediate" | "advanced" | "all levels") =>
                            setLevel(value)
                          }
                        >
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="all levels">All Levels</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Course Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 8 weeks"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., programming, data science, python"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Course...
                        </>
                      ) : (
                        <>
                          <LucidePlus className="mr-2 h-4 w-4" />
                          Create Course
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
