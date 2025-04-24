"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LucideBrain,
  LucideFileText,
  LucideMessageSquare,
  LucideSearch,
  LucideBookOpen,
  LucideEdit,
  LucideCheckCircle,
  LucideHelpCircle,
  LucideArrowRight,
  LucideLoader2,
} from "lucide-react"

export default function AITools() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("writing")
  const [writingPrompt, setWritingPrompt] = useState("")
  const [writingResponse, setWritingResponse] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      if (activeTab === "writing") {
        setWritingResponse(
          "Here's a draft of your essay introduction on climate change:\n\n" +
            "Climate change represents one of the most significant challenges facing humanity in the 21st century. The scientific consensus is clear: human activities, particularly the burning of fossil fuels and deforestation, have led to unprecedented levels of greenhouse gases in our atmosphere. These changes are resulting in rising global temperatures, extreme weather events, and disruptions to ecosystems worldwide. This essay will explore the causes and effects of climate change, examine current mitigation strategies, and propose solutions that balance environmental protection with economic development.",
        )
      }

      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Learning Tools</h1>
          <p className="text-gray-600 max-w-3xl">
            Enhance your learning experience with our suite of AI-powered tools designed to help you write, research,
            study, and get personalized feedback.
          </p>
        </header>

        <Tabs defaultValue="writing" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger
              value="writing"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            >
              <LucideEdit className="h-4 w-4 mr-2" />
              Writing Assistant
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <LucideSearch className="h-4 w-4 mr-2" />
              Research Helper
            </TabsTrigger>
            <TabsTrigger value="study" className="data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700">
              <LucideBookOpen className="h-4 w-4 mr-2" />
              Study Companion
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
            >
              <LucideCheckCircle className="h-4 w-4 mr-2" />
              Feedback Analyzer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="writing">
            <Card className="border-emerald-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideEdit className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-emerald-700">Writing Assistant</CardTitle>
                </div>
                <CardDescription>Get help with essays, reports, and other writing assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="writing-type">What are you writing?</Label>
                      <Select defaultValue="essay">
                        <SelectTrigger id="writing-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="essay">Essay</SelectItem>
                          <SelectItem value="report">Research Report</SelectItem>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="writing-prompt">Describe what you need help with</Label>
                      <Textarea
                        id="writing-prompt"
                        placeholder="E.g., I need help writing an introduction for my essay about climate change..."
                        className="min-h-32"
                        value={writingPrompt}
                        onChange={(e) => setWritingPrompt(e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={loading || !writingPrompt.trim()}
                    >
                      {loading ? (
                        <>
                          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Writing
                          <LucideArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {writingResponse && (
                  <div className="mt-6 p-4 bg-white border rounded-lg">
                    <h3 className="font-medium mb-2">Generated Content:</h3>
                    <div className="whitespace-pre-line text-gray-700">{writingResponse}</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        Simplify
                      </Button>
                      <Button variant="outline" size="sm">
                        Expand
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research">
            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideSearch className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-700">Research Helper</CardTitle>
                </div>
                <CardDescription>Find and summarize information for your research projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="research-query">What are you researching?</Label>
                    <div className="flex gap-2">
                      <Input
                        id="research-query"
                        placeholder="E.g., Effects of social media on adolescent mental health"
                      />
                      <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <LucideSearch className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Enter a research topic</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      The AI will search for relevant information, summarize key findings, and provide citations for
                      your research.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study">
            <Card className="border-violet-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideBookOpen className="h-5 w-5 text-violet-600" />
                  <CardTitle className="text-violet-700">Study Companion</CardTitle>
                </div>
                <CardDescription>Create flashcards, practice quizzes, and get explanations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-violet-100 hover:shadow-md transition-all">
                    <CardContent className="p-6 text-center">
                      <LucideFileText className="h-10 w-10 mx-auto text-violet-500 mb-4" />
                      <h3 className="font-medium mb-2">Generate Flashcards</h3>
                      <p className="text-gray-500 text-sm mb-4">Create study flashcards from your notes or textbook</p>
                      <Button variant="outline" className="w-full border-violet-200 text-violet-700">
                        Create Flashcards
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-violet-100 hover:shadow-md transition-all">
                    <CardContent className="p-6 text-center">
                      <LucideCheckCircle className="h-10 w-10 mx-auto text-violet-500 mb-4" />
                      <h3 className="font-medium mb-2">Practice Quizzes</h3>
                      <p className="text-gray-500 text-sm mb-4">Test your knowledge with AI-generated quizzes</p>
                      <Button variant="outline" className="w-full border-violet-200 text-violet-700">
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-violet-100 hover:shadow-md transition-all">
                    <CardContent className="p-6 text-center">
                      <LucideHelpCircle className="h-10 w-10 mx-auto text-violet-500 mb-4" />
                      <h3 className="font-medium mb-2">Concept Explanations</h3>
                      <p className="text-gray-500 text-sm mb-4">Get clear explanations of difficult concepts</p>
                      <Button variant="outline" className="w-full border-violet-200 text-violet-700">
                        Explain Concept
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LucideCheckCircle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-amber-700">Feedback Analyzer</CardTitle>
                </div>
                <CardDescription>Get personalized feedback on your assignments and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feedback-type">What do you need feedback on?</Label>
                    <Select defaultValue="essay">
                      <SelectTrigger id="feedback-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Upload your work or paste content</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <LucideFileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                      <p className="text-xs text-gray-400 mt-2">Supports PDF, DOCX, TXT, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="feedback-focus">What should the feedback focus on?</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="feedback-focus">
                        <SelectValue placeholder="Select focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Comprehensive Feedback</SelectItem>
                        <SelectItem value="structure">Structure & Organization</SelectItem>
                        <SelectItem value="content">Content & Ideas</SelectItem>
                        <SelectItem value="style">Style & Language</SelectItem>
                        <SelectItem value="technical">Technical Accuracy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="bg-amber-600 hover:bg-amber-700">Get Feedback</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Chat */}
        <div className="mt-8">
          <Card className="border-violet-200">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <LucideBrain className="h-5 w-5 text-violet-600" />
                <CardTitle>General AI Learning Assistant</CardTitle>
              </div>
              <CardDescription>
                Ask any question about your studies or get help with learning challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 border mb-4 min-h-32 flex items-center justify-center">
                <div className="text-center">
                  <LucideMessageSquare className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">Your conversation with the AI assistant will appear here</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Ask anything about your studies..." />
                <Button className="bg-violet-600 hover:bg-violet-700">Send</Button>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  How do I study better?
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Explain this concept
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Help me solve this problem
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Summarize this topic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
