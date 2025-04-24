"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideBookOpen,
  LucideCheckCircle,
  LucideZap,
  LucideAward,
  LucideBrain,
  LucideMessageSquare,
  LucideHelpCircle,
  LucideThumbsUp,
  LucidePlay,
  LucideLoader2,
  LucideFileText,
  LucideVideo,
} from "lucide-react"

export default function LessonPage({ params }) {
  const router = useRouter()
  const lessonId = Number.parseInt(params.id)
  const [activeTab, setActiveTab] = useState("content")
  const [showAIHelp, setShowAIHelp] = useState(false)
  const [aiResponse, setAIResponse] = useState("")
  const [aiLoading, setAILoading] = useState(false)
  const [aiQuestion, setAIQuestion] = useState("")
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showXPDialog, setShowXPDialog] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [earnedBadge, setEarnedBadge] = useState(false)

  // Lesson data - in a real app this would come from an API
  const lessons = [
    {
      id: 1,
      title: "Understanding Digital Literacy",
      module: "Digital Foundations",
      moduleNumber: 1,
      lessonNumber: 1,
      duration: "5 min",
      content: `
        <h2>What is Digital Literacy?</h2>
        <p>Digital literacy refers to the skills and knowledge required to effectively use digital devices, communication applications, and networks to access and manage information.</p>
        
        <p>Being digitally literate means more than just knowing how to use a computer or smartphone. It involves:</p>
        
        <ul>
          <li>Finding, evaluating, and creating digital content</li>
          <li>Communicating and collaborating online</li>
          <li>Staying safe in digital environments</li>
          <li>Problem-solving in digital contexts</li>
          <li>Understanding the ethical implications of digital technologies</li>
        </ul>
        
        <h2>Why Digital Literacy Matters</h2>
        <p>In today's interconnected world, digital literacy is essential for:</p>
        
        <ul>
          <li>Academic success</li>
          <li>Career advancement</li>
          <li>Civic participation</li>
          <li>Personal development</li>
          <li>Navigating everyday life</li>
        </ul>
        
        <p>As technology continues to evolve, developing strong digital literacy skills becomes increasingly important for everyone.</p>
      `,
      video: "/placeholder.svg?height=400&width=700",
      quiz: {
        title: "Quick Check: Digital Literacy Basics",
        questions: [
          {
            id: "q1",
            question: "Which of the following is NOT typically considered part of digital literacy?",
            options: [
              "Finding and evaluating online information",
              "Creating digital content",
              "Building physical computer hardware",
              "Communicating safely online",
            ],
            correctAnswer: 2,
          },
          {
            id: "q2",
            question: "Why is digital literacy important in today's world?",
            options: [
              "It's only important for IT professionals",
              "It's essential for academic success, career advancement, and everyday life",
              "It's only needed for social media use",
              "It's only relevant for younger generations",
            ],
            correctAnswer: 1,
          },
          {
            id: "q3",
            question: "Digital literacy involves:",
            options: [
              "Only technical skills",
              "Only information evaluation skills",
              "Both technical skills and critical thinking abilities",
              "Neither technical skills nor critical thinking",
            ],
            correctAnswer: 2,
          },
        ],
      },
      aiSuggestions: [
        "Can you explain digital literacy in simpler terms?",
        "How can I improve my digital literacy skills?",
        "What are the biggest challenges in digital literacy today?",
        "How does digital literacy relate to information literacy?",
      ],
    },
    {
      id: 2,
      title: "Navigating Digital Environments",
      module: "Digital Foundations",
      moduleNumber: 1,
      lessonNumber: 2,
      duration: "5 min",
      content: `
        <h2>Navigating Digital Environments</h2>
        <p>This lesson will cover how to effectively navigate various digital environments and platforms.</p>
      `,
      video: "/placeholder.svg?height=400&width=700",
    },
    {
      id: 3,
      title: "Digital Security Basics",
      module: "Digital Foundations",
      moduleNumber: 1,
      lessonNumber: 3,
      duration: "5 min",
      content: `
        <h2>Digital Security Basics</h2>
        <p>Learn the fundamentals of staying safe online and protecting your digital identity.</p>
      `,
      video: "/placeholder.svg?height=400&width=700",
    },
  ]

  const currentLesson = lessons.find((lesson) => lesson.id === lessonId) || lessons[0]
  const nextLesson = lessons.find((lesson) => lesson.id === lessonId + 1)
  const prevLesson = lessons.find((lesson) => lesson.id === lessonId - 1)

  const handleAIHelp = () => {
    setShowAIHelp(true)
  }

  const handleAIQuestion = (question) => {
    setAIQuestion(question)
    setAILoading(true)

    // Simulate AI response
    setTimeout(() => {
      if (question === "Can you explain digital literacy in simpler terms?") {
        setAIResponse(
          "Digital literacy is simply the ability to use technology effectively. It's like knowing how to read and write, but for the digital world. This includes knowing how to use devices like computers and smartphones, finding information online, determining if that information is trustworthy, communicating with others digitally, and staying safe while doing all of this.",
        )
      } else if (question === "How can I improve my digital literacy skills?") {
        setAIResponse(
          "To improve your digital literacy skills:\n\n1. Practice regularly with different digital tools and platforms\n2. Take online courses or tutorials on specific technologies\n3. Stay curious and explore new apps and websites\n4. Ask for help when you encounter challenges\n5. Read about digital safety and privacy\n6. Join online communities related to your interests\n7. Try creating digital content yourself (blogs, videos, etc.)\n\nRemember, digital literacy improves with consistent practice and exploration!",
        )
      } else if (question === "What are the biggest challenges in digital literacy today?") {
        setAIResponse(
          "The biggest challenges in digital literacy today include:\n\n• Information overload and determining credible sources\n• Keeping up with rapidly evolving technologies\n• Digital divide (unequal access to technology and internet)\n• Privacy concerns and data security\n• Misinformation and fake news\n• Algorithm bias and filter bubbles\n• Balancing screen time with offline activities\n• Developing critical thinking skills for the digital age",
        )
      } else if (question === "How does digital literacy relate to information literacy?") {
        setAIResponse(
          "Digital literacy and information literacy are closely related but distinct concepts:\n\n• Information literacy focuses on finding, evaluating, and using information effectively, regardless of format\n\n• Digital literacy encompasses the technical skills needed to use digital tools and platforms\n\nDigital literacy is broader and includes information literacy in digital contexts. Think of information literacy as a subset of digital literacy. For example, information literacy helps you determine if an online source is credible, while digital literacy includes knowing how to use search engines, navigate websites, and use digital tools to access that information in the first place.",
        )
      } else {
        setAIResponse(
          "Digital literacy encompasses the skills needed to find, evaluate, and communicate information in our digital world. It includes technical abilities to use devices and software, critical thinking to assess online information, and awareness of digital safety and privacy. As technology evolves, digital literacy has become essential for education, work, and everyday life.",
        )
      }
      setAILoading(false)
    }, 1500)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setActiveTab("quiz")
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)

    // Calculate score
    const quiz = currentLesson.quiz
    let correctAnswers = 0

    quiz.questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const xpEarned = correctAnswers * 50 + 50 // Base XP + per correct answer
    setEarnedXP(xpEarned)

    // Award badge if perfect score
    if (correctAnswers === quiz.questions.length) {
      setEarnedBadge(true)
    }

    // Show XP dialog after a short delay
    setTimeout(() => {
      setShowXPDialog(true)
    }, 1000)
  }

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/demo-course/lesson/${nextLesson.id}`)
    } else {
      router.push("/demo-course")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Lesson Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/demo-course">
              <Button variant="ghost" size="sm">
                <LucideArrowLeft className="h-4 w-4 mr-1" />
                Back to Course
              </Button>
            </Link>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
              Module {currentLesson.moduleNumber}: {currentLesson.module}
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {currentLesson.lessonNumber}. {currentLesson.title}
              </h1>
              <p className="text-gray-500">
                Estimated time: {currentLesson.duration} • Lesson {currentLesson.lessonNumber} of 3
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleAIHelp}>
                <LucideBrain className="h-4 w-4 mr-1" />
                AI Help
              </Button>
              <Button onClick={handleStartQuiz}>
                <LucidePlay className="h-4 w-4 mr-1" />
                Take Quiz
              </Button>
            </div>
          </div>
        </header>

        {/* Lesson Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Lesson Progress</span>
            <span>0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video">
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                      <img
                        src={currentLesson.video || "/placeholder.svg"}
                        alt={currentLesson.title}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 flex items-center justify-center"
                        size="icon"
                      >
                        <LucidePlay className="h-8 w-8" />
                      </Button>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{currentLesson.title} - Video Lecture</h3>
                    <p className="text-gray-500">
                      This video explains the key concepts of {currentLesson.title.toLowerCase()}.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentLesson.quiz?.title || "Lesson Quiz"}</CardTitle>
                    <CardDescription>Test your understanding of the lesson content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showQuiz ? (
                      <div className="text-center py-8">
                        <LucidePlay className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ready to test your knowledge?</h3>
                        <p className="text-gray-500 mb-4">
                          This quiz will help reinforce what you've learned in this lesson.
                        </p>
                        <Button onClick={handleStartQuiz}>Start Quiz</Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {currentLesson.quiz?.questions.map((question, index) => (
                          <div key={question.id} className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3">
                              {index + 1}. {question.question}
                            </h3>
                            <RadioGroup
                              value={quizAnswers[question.id]?.toString()}
                              onValueChange={(value) => handleQuizAnswer(question.id, Number.parseInt(value))}
                              disabled={quizSubmitted}
                            >
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-start space-x-2 mb-2">
                                  <RadioGroupItem
                                    value={optIndex.toString()}
                                    id={`${question.id}-${optIndex}`}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`${question.id}-${optIndex}`}
                                    className={
                                      quizSubmitted
                                        ? optIndex === question.correctAnswer
                                          ? "text-emerald-600 font-medium"
                                          : quizAnswers[question.id] === optIndex
                                            ? "text-red-500"
                                            : ""
                                        : ""
                                    }
                                  >
                                    {option}
                                    {quizSubmitted && optIndex === question.correctAnswer && (
                                      <span className="ml-2 text-emerald-600">
                                        <LucideCheckCircle className="h-4 w-4 inline" />
                                      </span>
                                    )}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            {quizSubmitted && quizAnswers[question.id] === question.correctAnswer && (
                              <div className="mt-2 text-emerald-600 text-sm">Correct! +50 XP</div>
                            )}
                            {quizSubmitted && quizAnswers[question.id] !== question.correctAnswer && (
                              <div className="mt-2 text-red-500 text-sm">
                                Incorrect. The correct answer is: {question.options[question.correctAnswer]}
                              </div>
                            )}
                          </div>
                        ))}

                        {!quizSubmitted ? (
                          <Button
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(quizAnswers).length < (currentLesson.quiz?.questions.length || 0)}
                            className="w-full"
                          >
                            Submit Answers
                          </Button>
                        ) : (
                          <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
                            <h3 className="font-medium text-emerald-800 mb-2">Quiz Completed!</h3>
                            <p className="text-emerald-700 mb-4">You've earned XP and made progress in this course.</p>
                            <Button onClick={handleNextLesson} className="w-full">
                              {nextLesson ? "Continue to Next Lesson" : "Return to Course"}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion">
                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Discussion</CardTitle>
                    <CardDescription>Discuss this lesson with your peers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="font-medium text-blue-700">JD</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">John Doe</h4>
                              <span className="text-gray-500 text-xs">2 hours ago</span>
                            </div>
                            <p className="text-gray-700">
                              I found the explanation of digital literacy really helpful. Does anyone have
                              recommendations for tools to improve these skills?
                            </p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="font-medium text-emerald-700">SM</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Sarah Miller</h4>
                                <span className="text-gray-500 text-xs">1 hour ago</span>
                              </div>
                              <p className="text-gray-700">
                                I've been using Khan Academy and Coursera for improving my digital skills. Also,
                                LinkedIn Learning has some great courses!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-violet-100 rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="font-medium text-violet-700">RL</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Robert Lee</h4>
                              <span className="text-gray-500 text-xs">3 hours ago</span>
                            </div>
                            <p className="text-gray-700">
                              Does anyone else find it challenging to keep up with all the new digital tools and
                              platforms? Any tips for staying current?
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Add to the discussion</h4>
                        <Textarea
                          placeholder="Share your thoughts or questions about this lesson..."
                          className="mb-2"
                        />
                        <Button>Post Comment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Lesson Navigation */}
            <div className="flex justify-between mt-6">
              {prevLesson ? (
                <Button variant="outline" asChild>
                  <Link href={`/demo-course/lesson/${prevLesson.id}`}>
                    <LucideArrowLeft className="h-4 w-4 mr-1" />
                    Previous Lesson
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <LucideArrowLeft className="h-4 w-4 mr-1" />
                  Previous Lesson
                </Button>
              )}

              {nextLesson ? (
                <Button asChild>
                  <Link href={`/demo-course/lesson/${nextLesson.id}`}>
                    Next Lesson
                    <LucideArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              ) : (
                <Button onClick={() => router.push("/demo-course")}>
                  Finish Module
                  <LucideCheckCircle className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Gamification Card */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideZap className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-amber-700">Your Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800">Current XP</span>
                    <span className="font-bold text-amber-800">0 XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800">Streak</span>
                    <span className="font-bold text-amber-800">1 day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800">Badges</span>
                    <span className="font-bold text-amber-800">0/3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800">Module Progress</span>
                    <span className="font-bold text-amber-800">0%</span>
                  </div>

                  <div className="border-t border-amber-200 pt-4">
                    <h4 className="font-medium text-amber-800 mb-2">Earn in this lesson:</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <LucideZap className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-700">Up to 200 XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideAward className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-700">Digital Foundations Badge</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Card */}
            <Card className="border-violet-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideBrain className="h-5 w-5 text-violet-600" />
                  <CardTitle>AI Learning Assistant</CardTitle>
                </div>
                <CardDescription>Get help understanding this lesson</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Ask a question about this lesson:</p>
                  {currentLesson.aiSuggestions?.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 text-sm"
                      onClick={() => handleAIQuestion(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                  <div className="relative mt-4">
                    <Textarea
                      placeholder="Or type your own question..."
                      value={aiQuestion}
                      onChange={(e) => setAIQuestion(e.target.value)}
                      className="pr-16"
                    />
                    <Button
                      className="absolute right-2 bottom-2 h-8 px-2"
                      size="sm"
                      onClick={() => handleAIQuestion(aiQuestion)}
                      disabled={!aiQuestion.trim()}
                    >
                      Ask
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>Explore these materials to learn more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <LucideFileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Digital Literacy Framework</h4>
                      <p className="text-gray-500 text-sm">PDF guide to core digital literacy concepts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <LucideVideo className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Digital Skills for Beginners</h4>
                      <p className="text-gray-500 text-sm">Video series on essential digital skills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <LucideBookOpen className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Digital Literacy Handbook</h4>
                      <p className="text-gray-500 text-sm">Comprehensive guide to digital literacy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Help Dialog */}
      <Dialog open={showAIHelp} onOpenChange={setShowAIHelp}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LucideBrain className="h-5 w-5 text-violet-600" />
              AI Learning Assistant
            </DialogTitle>
            <DialogDescription>Ask questions about this lesson or get personalized explanations</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {aiResponse ? (
              <div className="border rounded-lg p-4 bg-violet-50 border-violet-200">
                <div className="flex items-start gap-3">
                  <div className="bg-violet-100 rounded-full p-2 mt-1">
                    <LucideBrain className="h-5 w-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-violet-800 mb-1">AI Assistant</h4>
                    <div className="text-gray-700 whitespace-pre-line">{aiResponse}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                {aiLoading ? (
                  <div>
                    <LucideLoader2 className="h-8 w-8 mx-auto text-violet-600 animate-spin mb-4" />
                    <h3 className="text-lg font-medium mb-2">Generating response...</h3>
                    <p className="text-gray-500">The AI is processing your question</p>
                  </div>
                ) : (
                  <div>
                    <LucideHelpCircle className="h-8 w-8 mx-auto text-violet-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">How can I help you?</h3>
                    <p className="text-gray-500 mb-4">Ask a question about digital literacy</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto">
                      {currentLesson.aiSuggestions?.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 text-sm"
                          onClick={() => handleAIQuestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="relative">
              <Textarea
                placeholder="Ask a question about this lesson..."
                value={aiQuestion}
                onChange={(e) => setAIQuestion(e.target.value)}
                className="pr-16"
              />
              <Button
                className="absolute right-2 bottom-2"
                onClick={() => handleAIQuestion(aiQuestion)}
                disabled={!aiQuestion.trim() || aiLoading}
              >
                {aiLoading ? (
                  <LucideLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LucideMessageSquare className="h-4 w-4" />
                )}
              </Button>
            </div>

            {aiResponse && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <LucideThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAIResponse("")}>
                  Ask Another Question
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIHelp(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* XP Earned Dialog */}
      <Dialog open={showXPDialog} onOpenChange={setShowXPDialog}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <LucideZap className="h-10 w-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">You earned {earnedXP} XP!</h2>
            <p className="text-gray-600 mb-6">Great job completing the quiz</p>

            {earnedBadge && (
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6">
                <div className="bg-violet-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <LucideAward className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-medium text-violet-800 mb-1">New Badge Unlocked!</h3>
                <p className="text-violet-600 text-sm">Perfect Score: Digital Literacy Expert</p>
              </div>
            )}

            <Button
              onClick={() => {
                setShowXPDialog(false)
                handleNextLesson()
              }}
              className="w-full"
            >
              {nextLesson ? "Continue to Next Lesson" : "Return to Course"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
