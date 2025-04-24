import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LucidePlay,
  LucideArrowRight,
  LucideBookOpen,
  LucideAward,
  LucideZap,
  LucideUsers,
  LucideBrain,
  LucideFileText,
  LucideVideo,
  LucideClipboard,
  LucideCheckCircle,
} from "lucide-react"

export default function DemoCourse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
              Demo Course
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Introduction to Digital Literacy</h1>
          <p className="text-gray-600 max-w-3xl mb-4">
            Experience all the features of EduQuest in this interactive demo course. Learn essential digital skills
            while exploring our gamified learning platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">4 Modules</Badge>
            <Badge variant="secondary">12 Lessons</Badge>
            <Badge variant="secondary">45 Minutes</Badge>
            <Badge variant="secondary">Beginner Level</Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Course Introduction */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>About This Demo Course</CardTitle>
                <CardDescription>Experience the full potential of EduQuest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=700"
                    alt="Course introduction"
                    className="w-full h-full object-cover"
                  />
                  <div className="relative bottom-0 w-full">
                    <Button
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 flex items-center justify-center"
                      size="icon"
                    >
                      <LucidePlay className="h-8 w-8" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p>
                    Welcome to our interactive demo course! This course is designed to showcase all the features of
                    EduQuest while teaching you valuable digital literacy skills. You'll experience:
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <LucideZap className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Gamified Learning:</strong> Earn XP, badges, and climb the leaderboard as you progress
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideBrain className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>AI-Powered Tools:</strong> Get personalized assistance and feedback throughout your
                        learning journey
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideUsers className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Interactive Elements:</strong> Engage with polls, quizzes, and collaborative activities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideAward className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Adaptive Learning:</strong> Experience how the course adapts to your progress and
                        learning style
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/demo-course/lesson/1">
                    Start Demo Course
                    <LucideArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Course Modules</CardTitle>
                <CardDescription>What you'll learn in this demo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      number: 1,
                      title: "Digital Foundations",
                      description: "Learn the basics of digital literacy and online navigation",
                      lessons: 3,
                      duration: "15 min",
                      progress: 0,
                      icon: <LucideBookOpen className="h-5 w-5 text-emerald-600" />,
                    },
                    {
                      number: 2,
                      title: "Information Literacy",
                      description: "Discover how to find and evaluate online information",
                      lessons: 3,
                      duration: "10 min",
                      progress: 0,
                      icon: <LucideFileText className="h-5 w-5 text-blue-600" />,
                    },
                    {
                      number: 3,
                      title: "Digital Communication",
                      description: "Master effective online communication and collaboration",
                      lessons: 3,
                      duration: "10 min",
                      progress: 0,
                      icon: <LucideUsers className="h-5 w-5 text-violet-600" />,
                    },
                    {
                      number: 4,
                      title: "Digital Creation",
                      description: "Create and share digital content effectively",
                      lessons: 3,
                      duration: "10 min",
                      progress: 0,
                      icon: <LucideVideo className="h-5 w-5 text-amber-600" />,
                    },
                  ].map((module) => (
                    <div key={module.number} className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 rounded-full p-3">{module.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">
                            Module {module.number}: {module.title}
                          </h3>
                          <p className="text-gray-500 mb-2">{module.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{module.lessons} lessons</span>
                            <span>•</span>
                            <span>{module.duration}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Showcase */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Features You'll Experience</CardTitle>
                <CardDescription>Explore these powerful learning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Interactive Lessons",
                      description: "Engage with multimedia content and interactive exercises",
                      icon: <LucidePlay className="h-6 w-6 text-emerald-500" />,
                    },
                    {
                      title: "AI Learning Assistant",
                      description: "Get personalized help and explanations when you need them",
                      icon: <LucideBrain className="h-6 w-6 text-violet-500" />,
                    },
                    {
                      title: "Gamified Progress",
                      description: "Earn points, badges, and track your learning achievements",
                      icon: <LucideAward className="h-6 w-6 text-amber-500" />,
                    },
                    {
                      title: "Adaptive Quizzes",
                      description: "Test your knowledge with quizzes that adapt to your skill level",
                      icon: <LucideClipboard className="h-6 w-6 text-blue-500" />,
                    },
                    {
                      title: "Social Learning",
                      description: "Collaborate with peers and participate in discussions",
                      icon: <LucideUsers className="h-6 w-6 text-pink-500" />,
                    },
                    {
                      title: "Progress Tracking",
                      description: "Monitor your learning journey with detailed analytics",
                      icon: <LucideCheckCircle className="h-6 w-6 text-emerald-500" />,
                    },
                  ].map((feature, index) => (
                    <Card key={index} className="border-gray-200 hover:border-gray-300 transition-all">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="bg-gray-100 rounded-full p-2">{feature.icon}</div>
                        <div>
                          <h3 className="font-medium">{feature.title}</h3>
                          <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Start Course Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <LucidePlay className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Ready to Begin?</h3>
                  <p className="text-emerald-700 mb-4">
                    Start your interactive learning journey and explore all features of EduQuest
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" asChild>
                    <Link href="/demo-course/lesson/1">
                      Start First Lesson
                      <LucideArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="text-sm text-emerald-700 mt-4">
                  <p className="flex items-center gap-2 mb-2">
                    <LucideCheckCircle className="h-4 w-4" />
                    <span>No prior knowledge required</span>
                  </p>
                  <p className="flex items-center gap-2 mb-2">
                    <LucideCheckCircle className="h-4 w-4" />
                    <span>Experience all platform features</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <LucideCheckCircle className="h-4 w-4" />
                    <span>Learn valuable digital skills</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Earn */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>What You'll Earn</CardTitle>
                <CardDescription>Rewards for completing the demo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-amber-50 border-amber-200">
                    <div className="bg-amber-100 rounded-full p-2">
                      <LucideZap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800">500 XP Points</h3>
                      <p className="text-amber-700 text-sm">For completing all modules</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-violet-50 border-violet-200">
                    <div className="bg-violet-100 rounded-full p-2">
                      <LucideAward className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-violet-800">Digital Explorer Badge</h3>
                      <p className="text-violet-700 text-sm">Showcase on your profile</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="bg-blue-100 rounded-full p-2">
                      <LucideFileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Digital Literacy Certificate</h3>
                      <p className="text-blue-700 text-sm">Downloadable completion certificate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Feedback */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Feedback</CardTitle>
                <CardDescription>What others say about this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      comment:
                        "The gamification elements made learning so much more engaging. I especially loved the AI assistant!",
                      date: "2 days ago",
                    },
                    {
                      name: "Sarah Williams",
                      comment:
                        "This demo really showcases how powerful the platform is. The interactive quizzes were my favorite part.",
                      date: "1 week ago",
                    },
                    {
                      name: "Michael Chen",
                      comment:
                        "I was impressed by how the AI tools provided personalized help exactly when I needed it.",
                      date: "2 weeks ago",
                    },
                  ].map((feedback, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{feedback.name}</h4>
                        <span className="text-gray-500 text-sm">{feedback.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
