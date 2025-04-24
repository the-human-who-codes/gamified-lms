"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { ProtectedRoute } from "@/app/components/protected-route"
import { useCourses, type Module, type Lesson, type Content } from "@/app/contexts/course-context"
import { useAuth } from "@/app/contexts/auth-context"
import {
  LucideBook,
  LucideBell,
  LucideSave,
  LucideLoader2,
  LucidePlus,
  LucideTrash2,
  LucideArrowUp,
  LucideArrowDown,
  LucideFileText,
  LucideVideo,
  LucideImage,
  LucideClipboard,
  LucideFileEdit,
  LucideArrowLeft,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function CourseEditorPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { getCourseById, updateCourse } = useCourses()
  const { user } = useAuth()

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const [activeContentId, setActiveContentId] = useState<string | null>(null)

  // Load course data
  useEffect(() => {
    const courseData = getCourseById(params.courseId)
    if (courseData) {
      setCourse(courseData)
      if (courseData.modules.length > 0) {
        setActiveModuleId(courseData.modules[0].id)
        if (courseData.modules[0].lessons.length > 0) {
          setActiveLessonId(courseData.modules[0].lessons[0].id)
          if (courseData.modules[0].lessons[0].contents.length > 0) {
            setActiveContentId(courseData.modules[0].lessons[0].contents[0].id)
          }
        }
      }
    } else {
      setError("Course not found")
    }
    setLoading(false)
  }, [params.courseId, getCourseById])

  // Handle course details update
  const handleUpdateCourse = async () => {
    if (!course) return

    setSaving(true)
    setError(null)

    try {
      await updateCourse(course.id, course)
    } catch (err) {
      setError("Failed to save course. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Add a new module
  const handleAddModule = () => {
    if (!course) return

    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "New Module",
      description: "",
      lessons: [],
      order: course.modules.length + 1,
    }

    setCourse({
      ...course,
      modules: [...course.modules, newModule],
    })

    setActiveModuleId(newModule.id)
    setActiveLessonId(null)
    setActiveContentId(null)
  }

  // Add a new lesson to a module
  const handleAddLesson = (moduleId: string) => {
    if (!course) return

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      description: "",
      contents: [],
      order: course.modules.find((m) => m.id === moduleId)?.lessons.length + 1 || 1,
    }

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    })

    setActiveLessonId(newLesson.id)
    setActiveContentId(null)
  }

  // Add new content to a lesson
  const handleAddContent = (
    moduleId: string,
    lessonId: string,
    type: "text" | "video" | "image" | "quiz" | "assignment",
  ) => {
    if (!course) return

    const newContent: Content = {
      id: `content-${Date.now()}`,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      content:
        type === "quiz"
          ? JSON.stringify({
              questions: [
                {
                  question: "Sample question",
                  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                  correctAnswer: 0,
                  points: 10,
                },
              ],
            })
          : "",
      points: type === "quiz" ? 100 : 50,
    }

    if (type === "video" || type === "image") {
      newContent.content = "/placeholder.svg?height=400&width=700"
    }

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, contents: [...lesson.contents, newContent] } : lesson,
              ),
            }
          : module,
      ),
    })

    setActiveContentId(newContent.id)
  }

  // Delete a module
  const handleDeleteModule = (moduleId: string) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.filter((module) => module.id !== moduleId),
    })

    if (activeModuleId === moduleId) {
      setActiveModuleId(course.modules[0]?.id || null)
      setActiveLessonId(null)
      setActiveContentId(null)
    }
  }

  // Delete a lesson
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    })

    if (activeLessonId === lessonId) {
      setActiveLessonId(null)
      setActiveContentId(null)
    }
  }

  // Delete content
  const handleDeleteContent = (moduleId: string, lessonId: string, contentId: string) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, contents: lesson.contents.filter((content) => content.id !== contentId) }
                  : lesson,
              ),
            }
          : module,
      ),
    })

    if (activeContentId === contentId) {
      setActiveContentId(null)
    }
  }

  // Update module
  const handleUpdateModule = (moduleId: string, data: Partial<Module>) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((module) => (module.id === moduleId ? { ...module, ...data } : module)),
    })
  }

  // Update lesson
  const handleUpdateLesson = (moduleId: string, lessonId: string, data: Partial<Lesson>) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...data } : lesson)),
            }
          : module,
      ),
    })
  }

  // Update content
  const handleUpdateContent = (moduleId: string, lessonId: string, contentId: string, data: Partial<Content>) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      contents: lesson.contents.map((content) =>
                        content.id === contentId ? { ...content, ...data } : content,
                      ),
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    })
  }

  // Move module up/down
  const handleMoveModule = (moduleId: string, direction: "up" | "down") => {
    if (!course) return

    const moduleIndex = course.modules.findIndex((m) => m.id === moduleId)
    if (moduleIndex === -1) return

    if (direction === "up" && moduleIndex === 0) return
    if (direction === "down" && moduleIndex === course.modules.length - 1) return

    const newModules = [...course.modules]
    const targetIndex =
      direction === "up"
        ? moduleIndex - 1
        : (moduleIndex + 1
    
    // Swap modules
    [newModules[moduleIndex], newModules[targetIndex]] = [newModules[targetIndex], newModules[moduleIndex]])

    // Update order
    newModules.forEach((module, index) => {
      module.order = index + 1
    })

    setCourse({
      ...course,
      modules: newModules,
    })
  }

  // Move lesson up/down
  const handleMoveLesson = (moduleId: string, lessonId: string, direction: "up" | "down") => {
    if (!course) return

    const moduleIndex = course.modules.findIndex((m) => m.id === moduleId)
    if (moduleIndex === -1) return

    const lessonIndex = course.modules[moduleIndex].lessons.findIndex((l) => l.id === lessonId)
    if (lessonIndex === -1) return

    if (direction === "up" && lessonIndex === 0) return
    if (direction === "down" && lessonIndex === course.modules[moduleIndex].lessons.length - 1) return

    const newLessons = [...course.modules[moduleIndex].lessons]
    const targetIndex =
      direction === "up"
        ? lessonIndex - 1
        : (lessonIndex + 1
    
    // Swap lessons
    [newLessons[lessonIndex], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[lessonIndex]])

    // Update order
    newLessons.forEach((lesson, index) => {
      lesson.order = index + 1
    })

    setCourse({
      ...course,
      modules: course.modules.map((module, index) =>
        index === moduleIndex ? { ...module, lessons: newLessons } : module,
      ),
    })
  }

  // Move content up/down
  const handleMoveContent = (moduleId: string, lessonId: string, contentId: string, direction: "up" | "down") => {
    if (!course) return

    const moduleIndex = course.modules.findIndex((m) => m.id === moduleId)
    if (moduleIndex === -1) return

    const lessonIndex = course.modules[moduleIndex].lessons.findIndex((l) => l.id === lessonId)
    if (lessonIndex === -1) return

    const contentIndex = course.modules[moduleIndex].lessons[lessonIndex].contents.findIndex((c) => c.id === contentId)
    if (contentIndex === -1) return

    if (direction === "up" && contentIndex === 0) return
    if (direction === "down" && contentIndex === course.modules[moduleIndex].lessons[lessonIndex].contents.length - 1)
      return

    const newContents = [...course.modules[moduleIndex].lessons[lessonIndex].contents]
    const targetIndex =
      direction === "up"
        ? contentIndex - 1
        : (contentIndex + 1
    
    // Swap contents
    [newContents[contentIndex], newContents[targetIndex]] = [newContents[targetIndex], newContents[contentIndex]])

    setCourse({
      ...course,
      modules: course.modules.map((module, idx) =>
        idx === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, idx2) =>
                idx2 === lessonIndex ? { ...lesson, contents: newContents } : lesson,
              ),
            }
          : module,
      ),
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
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
                  <div className="flex items-center gap-2 mb-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/courses">
                        <LucideArrowLeft className="h-4 w-4 mr-1" />
                        Back to Courses
                      </Link>
                    </Button>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit Course: {course.title}</h1>
                  <p className="text-gray-600">Manage your course content and structure</p>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="default" onClick={handleUpdateCourse} disabled={saving}>
                    {saving ? (
                      <>
                        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <LucideSave className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <LucideBell className="h-5 w-5" />
                  </Button>
                  <UserNav />
                </div>
              </div>
            </header>

            <div className="p-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Course Details</TabsTrigger>
                  <TabsTrigger value="content">Course Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Details</CardTitle>
                      <CardDescription>Edit the basic information about your course</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          value={course.title}
                          onChange={(e) => setCourse({ ...course, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Course Description</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={course.description}
                          onChange={(e) => setCourse({ ...course, description: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="level">Difficulty Level</Label>
                          <Select
                            value={course.level}
                            onValueChange={(value: "beginner" | "intermediate" | "advanced" | "all levels") =>
                              setCourse({ ...course, level: value })
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
                            value={course.duration}
                            onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={course.tags.join(", ")}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              tags: e.target.value.split(",").map((tag) => tag.trim()),
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Module List */}
                    <Card className="md:col-span-1">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>Modules</CardTitle>
                          <Button size="sm" onClick={handleAddModule}>
                            <LucidePlus className="h-4 w-4 mr-1" />
                            Add Module
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Accordion
                          type="single"
                          collapsible
                          value={activeModuleId || undefined}
                          onValueChange={(value) => setActiveModuleId(value || null)}
                        >
                          {course.modules.map((module, index) => (
                            <AccordionItem key={module.id} value={module.id}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <span>{module.title}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2 pl-2">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Lessons</span>
                                    <Button size="sm" variant="ghost" onClick={() => handleAddLesson(module.id)}>
                                      <LucidePlus className="h-3 w-3 mr-1" />
                                      Add
                                    </Button>
                                  </div>

                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <div
                                      key={lesson.id}
                                      className={`p-2 rounded-md cursor-pointer text-sm ${
                                        activeLessonId === lesson.id
                                          ? "bg-emerald-50 text-emerald-700"
                                          : "hover:bg-gray-100"
                                      }`}
                                      onClick={() => {
                                        setActiveLessonId(lesson.id)
                                        setActiveContentId(lesson.contents[0]?.id || null)
                                      }}
                                    >
                                      {lesson.title}
                                    </div>
                                  ))}

                                  {module.lessons.length === 0 && (
                                    <div className="text-sm text-gray-500 italic">No lessons yet</div>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>

                        {course.modules.length === 0 && (
                          <div className="text-center py-6">
                            <p className="text-gray-500 mb-4">No modules yet</p>
                            <Button onClick={handleAddModule}>
                              <LucidePlus className="h-4 w-4 mr-1" />
                              Add First Module
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Module/Lesson/Content Editor */}
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle>Content Editor</CardTitle>
                        <CardDescription>Edit your course structure and content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {activeModuleId ? (
                          <div className="space-y-6">
                            {/* Module Editor */}
                            <div className="space-y-4 border-b pb-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Module Details</h3>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMoveModule(activeModuleId, "up")}
                                    disabled={course.modules.findIndex((m) => m.id === activeModuleId) === 0}
                                  >
                                    <LucideArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMoveModule(activeModuleId, "down")}
                                    disabled={
                                      course.modules.findIndex((m) => m.id === activeModuleId) ===
                                      course.modules.length - 1
                                    }
                                  >
                                    <LucideArrowDown className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteModule(activeModuleId)}
                                  >
                                    <LucideTrash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="module-title">Module Title</Label>
                                <Input
                                  id="module-title"
                                  value={course.modules.find((m) => m.id === activeModuleId)?.title || ""}
                                  onChange={(e) => handleUpdateModule(activeModuleId, { title: e.target.value })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="module-description">Module Description</Label>
                                <Textarea
                                  id="module-description"
                                  value={course.modules.find((m) => m.id === activeModuleId)?.description || ""}
                                  onChange={(e) => handleUpdateModule(activeModuleId, { description: e.target.value })}
                                  rows={2}
                                />
                              </div>
                            </div>

                            {/* Lesson Editor */}
                            {activeLessonId ? (
                              <div className="space-y-4 border-b pb-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-medium">Lesson Details</h3>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleMoveLesson(activeModuleId, activeLessonId, "up")}
                                      disabled={
                                        course.modules
                                          .find((m) => m.id === activeModuleId)
                                          ?.lessons.findIndex((l) => l.id === activeLessonId) === 0
                                      }
                                    >
                                      <LucideArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleMoveLesson(activeModuleId, activeLessonId, "down")}
                                      disabled={
                                        course.modules
                                          .find((m) => m.id === activeModuleId)
                                          ?.lessons.findIndex((l) => l.id === activeLessonId) ===
                                        course.modules.find((m) => m.id === activeModuleId)?.lessons.length - 1
                                      }
                                    >
                                      <LucideArrowDown className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteLesson(activeModuleId, activeLessonId)}
                                    >
                                      <LucideTrash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="lesson-title">Lesson Title</Label>
                                  <Input
                                    id="lesson-title"
                                    value={
                                      course.modules
                                        .find((m) => m.id === activeModuleId)
                                        ?.lessons.find((l) => l.id === activeLessonId)?.title || ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateLesson(activeModuleId, activeLessonId, { title: e.target.value })
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="lesson-description">Lesson Description</Label>
                                  <Textarea
                                    id="lesson-description"
                                    value={
                                      course.modules
                                        .find((m) => m.id === activeModuleId)
                                        ?.lessons.find((l) => l.id === activeLessonId)?.description || ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateLesson(activeModuleId, activeLessonId, {
                                        description: e.target.value,
                                      })
                                    }
                                    rows={2}
                                  />
                                </div>

                                {/* Content List */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label>Lesson Content</Label>
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleAddContent(activeModuleId, activeLessonId, "text")}
                                      >
                                        <LucideFileText className="h-3 w-3 mr-1" />
                                        Text
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleAddContent(activeModuleId, activeLessonId, "video")}
                                      >
                                        <LucideVideo className="h-3 w-3 mr-1" />
                                        Video
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleAddContent(activeModuleId, activeLessonId, "quiz")}
                                      >
                                        <LucideClipboard className="h-3 w-3 mr-1" />
                                        Quiz
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="space-y-2 mt-2">
                                    {course.modules
                                      .find((m) => m.id === activeModuleId)
                                      ?.lessons.find((l) => l.id === activeLessonId)
                                      ?.contents.map((content, contentIndex) => (
                                        <div
                                          key={content.id}
                                          className={`p-2 rounded-md cursor-pointer text-sm border ${
                                            activeContentId === content.id
                                              ? "border-emerald-500 bg-emerald-50"
                                              : "border-gray-200 hover:border-gray-300"
                                          }`}
                                          onClick={() => setActiveContentId(content.id)}
                                        >
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              {content.type === "text" && (
                                                <LucideFileText className="h-4 w-4 text-blue-500" />
                                              )}
                                              {content.type === "video" && (
                                                <LucideVideo className="h-4 w-4 text-red-500" />
                                              )}
                                              {content.type === "image" && (
                                                <LucideImage className="h-4 w-4 text-green-500" />
                                              )}
                                              {content.type === "quiz" && (
                                                <LucideClipboard className="h-4 w-4 text-amber-500" />
                                              )}
                                              {content.type === "assignment" && (
                                                <LucideFileEdit className="h-4 w-4 text-violet-500" />
                                              )}
                                              <span>{content.title}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{content.points} XP</span>
                                          </div>
                                        </div>
                                      ))}

                                    {course.modules
                                      .find((m) => m.id === activeModuleId)
                                      ?.lessons.find((l) => l.id === activeLessonId)?.contents.length === 0 && (
                                      <div className="text-sm text-gray-500 italic text-center py-4">
                                        No content yet. Add some content using the buttons above.
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Content Editor */}
                                {activeContentId && (
                                  <div className="space-y-4 border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                      <h3 className="text-lg font-medium">Content Editor</h3>
                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            handleMoveContent(activeModuleId, activeLessonId, activeContentId, "up")
                                          }
                                          disabled={
                                            course.modules
                                              .find((m) => m.id === activeModuleId)
                                              ?.lessons.find((l) => l.id === activeLessonId)
                                              ?.contents.findIndex((c) => c.id === activeContentId) === 0
                                          }
                                        >
                                          <LucideArrowUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            handleMoveContent(activeModuleId, activeLessonId, activeContentId, "down")
                                          }
                                          disabled={
                                            course.modules
                                              .find((m) => m.id === activeModuleId)
                                              ?.lessons.find((l) => l.id === activeLessonId)
                                              ?.contents.findIndex((c) => c.id === activeContentId) ===
                                            course.modules
                                              .find((m) => m.id === activeModuleId)
                                              ?.lessons.find((l) => l.id === activeLessonId)?.contents.length -
                                              1
                                          }
                                        >
                                          <LucideArrowDown className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() =>
                                            handleDeleteContent(activeModuleId, activeLessonId, activeContentId)
                                          }
                                        >
                                          <LucideTrash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>

                                    {(() => {
                                      const content = course.modules
                                        .find((m) => m.id === activeModuleId)
                                        ?.lessons.find((l) => l.id === activeLessonId)
                                        ?.contents.find((c) => c.id === activeContentId)

                                      if (!content) return null

                                      return (
                                        <div className="space-y-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="content-title">Content Title</Label>
                                            <Input
                                              id="content-title"
                                              value={content.title}
                                              onChange={(e) =>
                                                handleUpdateContent(activeModuleId, activeLessonId, activeContentId, {
                                                  title: e.target.value,
                                                })
                                              }
                                            />
                                          </div>

                                          <div className="space-y-2">
                                            <Label htmlFor="content-points">XP Points</Label>
                                            <Input
                                              id="content-points"
                                              type="number"
                                              value={content.points || 0}
                                              onChange={(e) =>
                                                handleUpdateContent(activeModuleId, activeLessonId, activeContentId, {
                                                  points: Number.parseInt(e.target.value) || 0,
                                                })
                                              }
                                            />
                                          </div>

                                          {content.type === "text" && (
                                            <div className="space-y-2">
                                              <Label htmlFor="content-text">Text Content</Label>
                                              <Textarea
                                                id="content-text"
                                                value={content.content}
                                                onChange={(e) =>
                                                  handleUpdateContent(activeModuleId, activeLessonId, activeContentId, {
                                                    content: e.target.value,
                                                  })
                                                }
                                                rows={8}
                                              />
                                            </div>
                                          )}

                                          {content.type === "video" && (
                                            <div className="space-y-2">
                                              <Label htmlFor="content-video">Video URL</Label>
                                              <Input
                                                id="content-video"
                                                value={content.content}
                                                onChange={(e) =>
                                                  handleUpdateContent(activeModuleId, activeLessonId, activeContentId, {
                                                    content: e.target.value,
                                                  })
                                                }
                                              />
                                              <p className="text-xs text-gray-500">
                                                Enter a URL to a video (YouTube, Vimeo, etc.) or upload your own
                                              </p>
                                            </div>
                                          )}

                                          {content.type === "quiz" && (
                                            <div className="space-y-4">
                                              <Label>Quiz Questions</Label>
                                              <div className="border rounded-md p-4 space-y-4">
                                                <p className="text-sm text-gray-500">
                                                  Quiz editor would go here. For the MVP, we're using a simplified
                                                  version.
                                                </p>
                                                <Textarea
                                                  value={content.content}
                                                  onChange={(e) =>
                                                    handleUpdateContent(
                                                      activeModuleId,
                                                      activeLessonId,
                                                      activeContentId,
                                                      { content: e.target.value },
                                                    )
                                                  }
                                                  rows={8}
                                                  placeholder="Quiz content in JSON format"
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })()}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">Select or create a lesson to edit</p>
                                <Button onClick={() => handleAddLesson(activeModuleId)}>
                                  <LucidePlus className="h-4 w-4 mr-1" />
                                  Add Lesson
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-gray-500 mb-4">Select or create a module to edit</p>
                            <Button onClick={handleAddModule}>
                              <LucidePlus className="h-4 w-4 mr-1" />
                              Add Module
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Settings</CardTitle>
                      <CardDescription>Configure additional settings for your course</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="visibility">Course Visibility</Label>
                        <Select
                          value={course.visibility || "public"}
                          onValueChange={(value) => setCourse({ ...course, visibility: value })}
                        >
                          <SelectTrigger id="visibility">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Anyone can enroll</SelectItem>
                            <SelectItem value="private">Private - Invitation only</SelectItem>
                            <SelectItem value="draft">Draft - Not visible to students</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enrollment-limit">Enrollment Limit</Label>
                        <Input
                          id="enrollment-limit"
                          type="number"
                          placeholder="Leave empty for unlimited"
                          value={course.enrollmentLimit || ""}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              enrollmentLimit: e.target.value ? Number.parseInt(e.target.value) : undefined,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
