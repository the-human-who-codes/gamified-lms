import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LucideAward,
  LucideUsers,
  LucideBookOpen,
  LucideCheckCircle,
  LucidePlay,
  LucideBrain,
  LucideFileText,
  LucideVideo,
  LucideClipboard,
  LucideArrowLeft,
  LucideLock,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CoursePage({ params }) {
  // In a real app, we would fetch course data based on the courseId
  const courseId = params.courseId

  // Mock course data
  const course = {
    id: courseId,
    title: "Introduction to Data Science",
    instructor: "Dr. Sarah Chen",
    progress: 68,
    description:
      "Learn the fundamentals of data science, including data analysis, visualization, and machine learning techniques.",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 1243,
    rating: 4.8,
    modules: [
      {
        id: "module-1",
        title: "Getting Started with Data Science",
        progress: 100,
        units: [
          { id: "unit-1-1", title: "Introduction to the Course", type: "video", completed: true, duration: "10 min" },
          { id: "unit-1-2", title: "What is Data Science?", type: "reading", completed: true, duration: "15 min" },
          {
            id: "unit-1-3",
            title: "Tools and Environment Setup",
            type: "interactive",
            completed: true,
            duration: "20 min",
          },
          { id: "unit-1-4", title: "Module 1 Quiz", type: "quiz", completed: true, questions: 10 },
        ],
      },
      {
        id: "module-2",
        title: "Data Collection and Cleaning",
        progress: 75,
        units: [
          {
            id: "unit-2-1",
            title: "Data Sources and Collection Methods",
            type: "video",
            completed: true,
            duration: "15 min",
          },
          { id: "unit-2-2", title: "Data Cleaning Techniques", type: "reading", completed: true, duration: "20 min" },
          { id: "unit-2-3", title: "Handling Missing Data", type: "interactive", completed: true, duration: "25 min" },
          { id: "unit-2-4", title: "Data Transformation", type: "video", completed: false, duration: "18 min" },
          { id: "unit-2-5", title: "Module 2 Quiz", type: "quiz", completed: false, questions: 12 },
        ],
      },
      {
        id: "module-3",
        title: "Exploratory Data Analysis",
        progress: 30,
        units: [
          { id: "unit-3-1", title: "Statistical Summaries", type: "video", completed: true, duration: "12 min" },
          {
            id: "unit-3-2",
            title: "Data Visualization Fundamentals",
            type: "reading",
            completed: true,
            duration: "25 min",
          },
          {
            id: "unit-3-3",
            title: "Creating Visualizations",
            type: "interactive",
            completed: false,
            duration: "30 min",
          },
          { id: "unit-3-4", title: "Interpreting Visualizations", type: "video", completed: false, duration: "15 min" },
          { id: "unit-3-5", title: "Module 3 Assignment", type: "assignment", completed: false, dueDate: "Oct 15" },
        ],
      },
      {
        id: "module-4",
        title: "Introduction to Machine Learning",
        progress: 0,
        locked: true,
        units: [
          { id: "unit-4-1", title: "Machine Learning Basics", type: "video", completed: false, duration: "20 min" },
          {
            id: "unit-4-2",
            title: "Supervised vs Unsupervised Learning",
            type: "reading",
            completed: false,
            duration: "25 min",
          },
          {
            id: "unit-4-3",
            title: "Training Your First Model",
            type: "interactive",
            completed: false,
            duration: "40 min",
          },
          { id: "unit-4-4", title: "Model Evaluation", type: "video", completed: false, duration: "15 min" },
          { id: "unit-4-5", title: "Module 4 Quiz", type: "quiz", completed: false, questions: 15 },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses">
                <LucideArrowLeft className="h-4 w-4 mr-1" />
                Back to Courses
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt={course.instructor} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="text-gray-600">{course.instructor}</span>
                <Badge variant="secondary" className="ml-2">
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>
              <p className="text-gray-600 max-w-2xl mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <LucideUsers className="h-4 w-4" />
                  <span>{course.enrolled} enrolled</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideAward className="h-4 w-4" />
                  <span>{course.rating}/5 rating</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 bg-white rounded-lg border p-4 shadow-sm">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              <Button className="w-full mb-2" asChild>
                <Link href={`/courses/${courseId}/learn`}>Continue Learning</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/ai-tools?course=${courseId}`}>
                  <LucideBrain className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Course Modules</CardTitle>
                <CardDescription>Track your progress through each module</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module, index) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            {module.locked ? (
                              <div className="bg-gray-100 rounded-full p-2">
                                <LucideLock className="h-5 w-5 text-gray-400" />
                              </div>
                            ) : module.progress === 100 ? (
                              <div className="bg-emerald-100 rounded-full p-2">
                                <LucideCheckCircle className="h-5 w-5 text-emerald-600" />
                              </div>
                            ) : (
                              <div className="bg-blue-100 rounded-full p-2">
                                <LucideBookOpen className="h-5 w-5 text-blue-600" />
                              </div>
                            )}
                            <div className="text-left">
                              <h3 className="font-medium">
                                Module {index + 1}: {module.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{module.units.length} units</span>
                                {!module.locked && (
                                  <>
                                    <span>•</span>
                                    <span>{module.progress}% complete</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          {module.locked && (
                            <Badge variant="outline" className="mr-4">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-12 space-y-3 mt-2">
                          {module.units.map((unit) => (
                            <div
                              key={unit.id}
                              className="border rounded-lg p-3 bg-white hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {getUnitIcon(unit.type)}
                                  <div>
                                    <h4 className="font-medium">{unit.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      <span>{capitalizeFirstLetter(unit.type)}</span>
                                      <span>•</span>
                                      {unit.type === "quiz" ? (
                                        <span>{unit.questions} questions</span>
                                      ) : unit.type === "assignment" ? (
                                        <span>Due: {unit.dueDate}</span>
                                      ) : (
                                        <span>{unit.duration}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {unit.completed ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-emerald-50 text-emerald-600 border-emerald-200"
                                  >
                                    Completed
                                  </Badge>
                                ) : module.locked ? (
                                  <Button disabled variant="outline" size="sm">
                                    Locked
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/courses/${courseId}/unit/${unit.id}`}>
                                      {unit.type === "quiz"
                                        ? "Start Quiz"
                                        : unit.type === "assignment"
                                          ? "View Assignment"
                                          : "Start"}
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* AI Learning Assistant */}
            <Card className="border-violet-200 bg-violet-50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideBrain className="h-5 w-5 text-violet-600" />
                  <CardTitle className="text-violet-700">Course-Specific AI Assistant</CardTitle>
                </div>
                <CardDescription>Get help with concepts from this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4 border border-violet-200">
                  <p className="text-gray-600 mb-4">What would you like help with in this course?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href={`/ai-tools?course=${courseId}`}>
                        <LucideBookOpen className="mr-2 h-4 w-4" />
                        Explain a concept
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href={`/ai-tools?course=${courseId}`}>
                        <LucidePlay className="mr-2 h-4 w-4" />
                        Practice exercises
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href={`/ai-tools?course=${courseId}`}>
                        <LucideCheckCircle className="mr-2 h-4 w-4" />
                        Quiz me on material
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href={`/ai-tools?course=${courseId}`}>
                        <LucideFileText className="mr-2 h-4 w-4" />
                        Summarize a section
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion">
            <Card>
              <CardHeader>
                <CardTitle>Course Discussion</CardTitle>
                <CardDescription>Engage with your instructor and peers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Discussion forum content would appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
                <CardDescription>Additional materials to support your learning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Course resources would appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Your Grades</CardTitle>
                <CardDescription>Track your performance in this course</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Grade information would appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function getUnitIcon(type) {
  switch (type) {
    case "video":
      return (
        <div className="bg-blue-100 rounded-full p-2">
          <LucideVideo className="h-4 w-4 text-blue-600" />
        </div>
      )
    case "reading":
      return (
        <div className="bg-emerald-100 rounded-full p-2">
          <LucideFileText className="h-4 w-4 text-emerald-600" />
        </div>
      )
    case "interactive":
      return (
        <div className="bg-violet-100 rounded-full p-2">
          <LucidePlay className="h-4 w-4 text-violet-600" />
        </div>
      )
    case "quiz":
      return (
        <div className="bg-amber-100 rounded-full p-2">
          <LucideClipboard className="h-4 w-4 text-amber-600" />
        </div>
      )
    case "assignment":
      return (
        <div className="bg-red-100 rounded-full p-2">
          <LucideFileText className="h-4 w-4 text-red-600" />
        </div>
      )
    default:
      return (
        <div className="bg-gray-100 rounded-full p-2">
          <LucideBookOpen className="h-4 w-4 text-gray-600" />
        </div>
      )
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
