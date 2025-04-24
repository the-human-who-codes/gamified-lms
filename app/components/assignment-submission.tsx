"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGamification } from "../contexts/gamification-context"
import { useCourses } from "../contexts/course-context"
import { LucideLoader2, LucideUpload, LucideCheckCircle, LucideFileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AssignmentSubmissionProps {
  assignmentId: string
  courseId: string
  lessonId: string
  title: string
  description: string
  dueDate?: string
  points: number
  onComplete: (submissionText: string, files: File[]) => void
}

export function AssignmentSubmission({
  assignmentId,
  courseId,
  lessonId,
  title,
  description,
  dueDate,
  points,
  onComplete,
}: AssignmentSubmissionProps) {
  const { awardXp } = useGamification()
  const { updateProgress, getUserProgressForCourse } = useCourses()

  const [submissionText, setSubmissionText] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userProgress = getUserProgressForCourse(courseId)
  const isAlreadySubmitted = userProgress?.assignmentSubmissions?.[assignmentId] !== undefined

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async () => {
    if (!submissionText.trim() && files.length === 0) {
      setError("Please provide a text submission or upload files")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In a real app, we would upload files to a server here
      // For the MVP, we'll just simulate the submission

      // Update user progress
      await updateProgress({
        courseId,
        assignmentSubmissions: {
          ...userProgress?.assignmentSubmissions,
          [assignmentId]: submissionText,
        },
      })

      // Award XP
      await awardXp(points, `Submitted assignment: ${title}`, {
        courseId,
        lessonId,
        contentId: assignmentId,
      })

      // Check if submitted early (3+ days before due date)
      if (dueDate) {
        const dueDateTime = new Date(dueDate).getTime()
        const now = new Date().getTime()
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000

        if (dueDateTime - now > threeDaysInMs) {
          await awardXp(50, "Early submission bonus", {
            courseId,
            lessonId,
            contentId: assignmentId,
          })
        }
      }

      setSubmitted(true)
      onComplete(submissionText, files)
    } catch (err) {
      setError("Failed to submit assignment. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (isAlreadySubmitted || submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assignment Submitted</CardTitle>
          <CardDescription>Your work has been submitted successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-4 mb-4">
              <LucideCheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Assignment Completed!</h3>
            <p className="text-gray-500 mb-4">You've earned {points} XP for this submission</p>

            <div className="text-left p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2">Submission Details:</h4>
              <div className="text-emerald-700">
                <p className="mb-2">
                  <strong>Submitted on:</strong> {new Date().toLocaleDateString()}
                </p>
                {files.length > 0 && (
                  <div className="mb-2">
                    <strong>Files:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {submissionText && (
                  <div>
                    <strong>Text Submission:</strong>
                    <p className="mt-1 p-2 bg-white rounded border border-emerald-100">{submissionText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : "No due date"} • {points} XP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="p-4 bg-gray-50 rounded-lg border mb-4">
          <h3 className="font-medium mb-2">Assignment Instructions</h3>
          <p className="text-gray-700">{description}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submission">Your Submission</Label>
            <Textarea
              id="submission"
              placeholder="Type your answer here..."
              rows={8}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="files">Upload Files (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <LucideUpload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to select files</p>
              <Input id="files" type="file" multiple className="hidden" onChange={handleFileChange} />
              <Button variant="outline" onClick={() => document.getElementById("files")?.click()}>
                Select Files
              </Button>
            </div>
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Selected Files:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center">
                      <LucideFileText className="h-4 w-4 mr-1 text-blue-500" />
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Assignment"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
