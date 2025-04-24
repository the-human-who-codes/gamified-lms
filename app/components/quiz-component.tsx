"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "../contexts/gamification-context"
import { LucideCheckCircle, LucideLoader2 } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  points: number
}

interface QuizProps {
  quizId: string
  courseId: string
  lessonId: string
  title: string
  questions: Question[]
  onComplete: (score: number, totalPoints: number) => void
}

export function QuizComponent({ quizId, courseId, lessonId, title, questions, onComplete }: QuizProps) {
  const { awardXp } = useGamification()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    // Calculate score
    let newScore = 0
    let newTotalPoints = 0

    questions.forEach((question, index) => {
      newTotalPoints += question.points
      if (answers[index] === question.correctAnswer) {
        newScore += question.points
      }
    })

    setScore(newScore)
    setTotalPoints(newTotalPoints)

    // Award XP
    try {
      await awardXp(newScore, `Completed quiz: ${title}`, { courseId, lessonId, contentId: quizId })

      // If perfect score, award additional XP
      if (newScore === newTotalPoints) {
        await awardXp(50, "Completed quiz with perfect score", { courseId, lessonId, contentId: quizId })
      }
    } catch (error) {
      console.error("Error awarding XP:", error)
    }

    setShowResults(true)
    setLoading(false)

    // Notify parent component
    onComplete(newScore, newTotalPoints)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const percentage = Math.round((score / totalPoints) * 100)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>You've completed the quiz!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-4 mb-4">
              <LucideCheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Your Score: {score}/{totalPoints}
            </h3>
            <p className="text-gray-500 mb-4">{percentage}% correct</p>

            <div className="w-full mb-4">
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="text-left p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2">XP Earned:</h4>
              <ul className="space-y-1 text-emerald-700">
                <li>• {score} XP for correct answers</li>
                {score === totalPoints && <li>• 50 XP bonus for perfect score</li>}
                <li className="font-bold pt-2">• Total: {score + (score === totalPoints ? 50 : 0)} XP</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Question Review:</h4>
            {questions.map((question, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <p className="font-medium mb-2">
                  {index + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded ${
                        answers[index] === optIndex && question.correctAnswer === optIndex
                          ? "bg-emerald-100 text-emerald-800"
                          : answers[index] === optIndex && question.correctAnswer !== optIndex
                            ? "bg-red-100 text-red-800"
                            : question.correctAnswer === optIndex
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-gray-50"
                      }`}
                    >
                      {option}
                      {answers[index] === optIndex && question.correctAnswer === optIndex && (
                        <span className="ml-2 text-emerald-600">✓ Your answer (Correct)</span>
                      )}
                      {answers[index] === optIndex && question.correctAnswer !== optIndex && (
                        <span className="ml-2 text-red-600">✗ Your answer</span>
                      )}
                      {answers[index] !== optIndex && question.correctAnswer === optIndex && (
                        <span className="ml-2 text-emerald-600">✓ Correct answer</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Continue Learning</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-sm text-gray-500">{questions[currentQuestion].points} XP</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswer(Number.parseInt(value))}
          >
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <Button onClick={handleNext} disabled={answers[currentQuestion] === undefined || loading}>
          {loading ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : currentQuestion === questions.length - 1 ? (
            "Submit Quiz"
          ) : (
            "Next Question"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
