"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideMaximize,
  LucideMessageSquare,
  LucideUsers,
  LucideBarChart,
  LucideThumbsUp,
  LucideThumbsDown,
  LucideHelpCircle,
} from "lucide-react"

export default function PresentationMode({ params }) {
  const courseId = params.courseId
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showPoll, setShowPoll] = useState(false)
  const [pollResults, setPollResults] = useState(null)

  // Mock presentation data
  const presentation = {
    title: "Introduction to Data Science",
    slides: [
      {
        title: "What is Data Science?",
        content:
          "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "The Data Science Process",
        content:
          "1. Data Collection\n2. Data Cleaning\n3. Exploratory Data Analysis\n4. Modeling\n5. Evaluation\n6. Deployment",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Key Tools in Data Science",
        content: "• Python & R\n• SQL\n• Jupyter Notebooks\n• Pandas & NumPy\n• Scikit-learn\n• TensorFlow & PyTorch",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Applications of Data Science",
        content: "• Business Intelligence\n• Healthcare\n• Finance\n• Marketing\n• Transportation\n• Social Media",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Ethics in Data Science",
        content: "• Privacy concerns\n• Bias in algorithms\n• Transparency\n• Accountability\n• Responsible AI",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    polls: [
      {
        question: "Which area of Data Science interests you the most?",
        options: [
          "Machine Learning",
          "Data Visualization",
          "Statistical Analysis",
          "Big Data Processing",
          "Natural Language Processing",
        ],
      },
      {
        question: "How comfortable are you with programming?",
        options: [
          "Very comfortable",
          "Somewhat comfortable",
          "Neutral",
          "Somewhat uncomfortable",
          "Very uncomfortable",
        ],
      },
    ],
  }

  const totalSlides = presentation.slides.length

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const launchPoll = () => {
    setShowPoll(true)
  }

  const submitPoll = (pollIndex, optionIndex) => {
    // In a real app, this would send the vote to a server
    // For demo purposes, we'll generate random results
    const results = presentation.polls[pollIndex].options.map((_, i) => ({
      option: presentation.polls[pollIndex].options[i],
      votes: i === optionIndex ? 1 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 10),
    }))

    setPollResults(results)
  }

  const closePoll = () => {
    setShowPoll(false)
    setPollResults(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Presentation Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{presentation.title}</h1>
            <p className="text-gray-400">
              Slide {currentSlide + 1} of {totalSlides}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
              <LucideMaximize className="h-4 w-4 mr-1" />
              Full Screen
            </Button>
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
              <LucideUsers className="h-4 w-4 mr-1" />
              Participants
            </Button>
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
              <LucideMessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
          </div>
        </div>

        {/* Presentation Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                {showPoll ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">{presentation.polls[0].question}</h2>

                    {!pollResults ? (
                      <div className="space-y-4 max-w-md mx-auto">
                        {presentation.polls[0].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3 text-gray-200 border-gray-600 hover:bg-gray-700"
                            onClick={() => submitPoll(0, index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4 max-w-md mx-auto">
                        <h3 className="text-xl mb-4">Poll Results</h3>
                        {pollResults.map((result, index) => {
                          const totalVotes = pollResults.reduce((sum, r) => sum + r.votes, 0)
                          const percentage = Math.round((result.votes / totalVotes) * 100)

                          return (
                            <div key={index} className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span>{result.option}</span>
                                <span>
                                  {percentage}% ({result.votes} votes)
                                </span>
                              </div>
                              <Progress value={percentage} className="h-2 bg-gray-700" />
                            </div>
                          )
                        })}

                        <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700" onClick={closePoll}>
                          Close Poll
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">{presentation.slides[currentSlide].title}</h2>

                    <div className="mb-6">
                      <img
                        src={presentation.slides[currentSlide].image || "/placeholder.svg"}
                        alt={presentation.slides[currentSlide].title}
                        className="rounded-lg mx-auto"
                      />
                    </div>

                    <div className="whitespace-pre-line text-lg">{presentation.slides[currentSlide].content}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-gray-300 border-gray-700"
              >
                <LucideArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={launchPoll} className="text-gray-300 border-gray-700">
                  <LucideBarChart className="h-4 w-4 mr-1" />
                  Launch Poll
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="text-gray-300 border-gray-700"
              >
                Next
                <LucideArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          <div>
            <Tabs defaultValue="questions" className="w-full">
              <TabsList className="grid grid-cols-2 bg-gray-800">
                <TabsTrigger value="questions" className="data-[state=active]:bg-gray-700">
                  Questions
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-gray-700">
                  Feedback
                </TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="mt-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <LucideHelpCircle className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                        <p className="text-gray-400 text-sm">Questions from students will appear here</p>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Ask a question..."
                          className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white"
                        />
                        <Button className="absolute right-1 top-1 h-8 bg-emerald-600 hover:bg-emerald-700">Send</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="space-y-6">
                      <div className="text-center py-4">
                        <h3 className="text-lg font-medium mb-4">How is the pace of this presentation?</h3>
                        <div className="flex justify-center gap-4">
                          <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                            Too Slow
                          </Button>
                          <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                            Just Right
                          </Button>
                          <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                            Too Fast
                          </Button>
                        </div>
                      </div>

                      <div className="text-center py-4 border-t border-gray-700">
                        <h3 className="text-lg font-medium mb-4">Is this content clear?</h3>
                        <div className="flex justify-center gap-4">
                          <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                            <LucideThumbsUp className="h-5 w-5 mr-1" />
                            Clear
                          </Button>
                          <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                            <LucideThumbsDown className="h-5 w-5 mr-1" />
                            Confusing
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="bg-gray-800 border-gray-700 mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">AI Teaching Assistant</h3>
                <p className="text-gray-400 text-sm mb-4">Get instant help with concepts from this presentation</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask the AI assistant..."
                    className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white"
                  />
                  <Button className="absolute right-1 top-1 h-8 bg-violet-600 hover:bg-violet-700">Ask</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
