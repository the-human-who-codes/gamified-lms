"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export type ContentType = "text" | "video" | "image" | "quiz" | "assignment"

export interface Content {
  id: string
  title: string
  type: ContentType
  content: string
  duration?: number
  points?: number
}

export interface Lesson {
  id: string
  title: string
  description?: string
  contents: Content[]
  order: number
}

export interface Module {
  id: string
  title: string
  description?: string
  lessons: Lesson[]
  order: number
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: {
    id: string
    name: string
  }
  modules: Module[]
  enrolledStudents: string[]
  image?: string
  level: "beginner" | "intermediate" | "advanced" | "all levels"
  duration: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface StudentProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  completedContents: string[]
  quizScores: Record<string, number>
  assignmentSubmissions: Record<string, string>
  xpEarned: number
  lastAccessed: string
}

interface CourseContextType {
  courses: Course[]
  userProgress: StudentProgress[]
  createCourse: (courseData: Omit<Course, "id" | "createdAt" | "updatedAt" | "enrolledStudents">) => Promise<Course>
  updateCourse: (courseId: string, courseData: Partial<Course>) => Promise<Course>
  deleteCourse: (courseId: string) => Promise<void>
  enrollInCourse: (courseId: string) => Promise<void>
  unenrollFromCourse: (courseId: string) => Promise<void>
  updateProgress: (progressData: Partial<StudentProgress>) => Promise<void>
  getCourseById: (courseId: string) => Course | undefined
  getUserProgressForCourse: (courseId: string) => StudentProgress | undefined
}

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: "data-science-101",
    title: "Introduction to Data Science",
    description:
      "Learn the fundamentals of data science, including data analysis, visualization, and machine learning techniques.",
    instructor: {
      id: "2",
      name: "Dr. Sarah Chen",
    },
    modules: [
      {
        id: "module-1",
        title: "Getting Started with Data Science",
        description: "An introduction to the field of data science and its applications.",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is Data Science?",
            description: "Understanding the field of data science and its importance.",
            order: 1,
            contents: [
              {
                id: "content-1-1-1",
                title: "Introduction to Data Science",
                type: "video",
                content: "/placeholder.svg?height=400&width=700",
                duration: 10,
                points: 50,
              },
              {
                id: "content-1-1-2",
                title: "Data Science Applications",
                type: "text",
                content:
                  "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data. It combines aspects of statistics, data analysis, machine learning, and related methods to understand and analyze actual phenomena with data.",
                points: 20,
              },
            ],
          },
          {
            id: "lesson-1-2",
            title: "Tools and Environment Setup",
            description: "Setting up your data science environment with Python and Jupyter Notebooks.",
            order: 2,
            contents: [
              {
                id: "content-1-2-1",
                title: "Setting Up Python",
                type: "text",
                content: "In this section, we'll learn how to set up Python and essential libraries for data science.",
                points: 20,
              },
              {
                id: "content-1-2-2",
                title: "Introduction to Jupyter Notebooks",
                type: "video",
                content: "/placeholder.svg?height=400&width=700",
                duration: 15,
                points: 75,
              },
              {
                id: "content-1-2-3",
                title: "Environment Setup Quiz",
                type: "quiz",
                content: JSON.stringify({
                  questions: [
                    {
                      question: "Which of the following is NOT a commonly used Python library for data science?",
                      options: ["NumPy", "Pandas", "Matplotlib", "JavaFX"],
                      correctAnswer: 3,
                      points: 10,
                    },
                    {
                      question: "What is Jupyter Notebook?",
                      options: [
                        "A text editor for Python",
                        "An interactive computing environment",
                        "A database management system",
                        "A version control system",
                      ],
                      correctAnswer: 1,
                      points: 10,
                    },
                  ],
                }),
                points: 100,
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "Data Collection and Cleaning",
        description: "Learn how to collect, clean, and prepare data for analysis.",
        order: 2,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Data Sources and Collection Methods",
            description: "Exploring various sources of data and methods for collection.",
            order: 1,
            contents: [
              {
                id: "content-2-1-1",
                title: "Types of Data Sources",
                type: "text",
                content:
                  "Data can be collected from various sources including APIs, databases, web scraping, and more.",
                points: 20,
              },
            ],
          },
        ],
      },
    ],
    enrolledStudents: ["1"],
    image: "/placeholder.svg?height=150&width=300&text=Data+Science",
    level: "intermediate",
    duration: "12 weeks",
    tags: ["data science", "python", "machine learning"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-09-20T00:00:00Z",
  },
  {
    id: "web-dev-advanced",
    title: "Advanced Web Development",
    description: "Master advanced web development techniques including modern frameworks and best practices.",
    instructor: {
      id: "4",
      name: "Prof. James Wilson",
    },
    modules: [
      {
        id: "module-1",
        title: "Modern JavaScript Frameworks",
        description: "Exploring popular JavaScript frameworks for building web applications.",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to React",
            description: "Learn the basics of React and component-based architecture.",
            order: 1,
            contents: [
              {
                id: "content-1-1-1",
                title: "React Fundamentals",
                type: "video",
                content: "/placeholder.svg?height=400&width=700",
                duration: 20,
                points: 100,
              },
            ],
          },
        ],
      },
    ],
    enrolledStudents: ["1"],
    image: "/placeholder.svg?height=150&width=300&text=Web+Development",
    level: "advanced",
    duration: "10 weeks",
    tags: ["web development", "javascript", "react", "node.js"],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-09-15T00:00:00Z",
  },
  {
    id: "psychology-101",
    title: "Psychology 101",
    description: "An introduction to the fundamental principles of psychology and human behavior.",
    instructor: {
      id: "5",
      name: "Dr. Emily Rodriguez",
    },
    modules: [
      {
        id: "module-1",
        title: "Introduction to Psychology",
        description: "Understanding the basics of psychology as a scientific discipline.",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is Psychology?",
            description: "Exploring the definition and scope of psychology.",
            order: 1,
            contents: [
              {
                id: "content-1-1-1",
                title: "Introduction to Psychology",
                type: "video",
                content: "/placeholder.svg?height=400&width=700",
                duration: 15,
                points: 75,
              },
            ],
          },
        ],
      },
    ],
    enrolledStudents: ["1"],
    image: "/placeholder.svg?height=150&width=300&text=Psychology",
    level: "beginner",
    duration: "8 weeks",
    tags: ["psychology", "behavior", "mental health"],
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-09-10T00:00:00Z",
  },
]

// Mock data for student progress
const mockProgress: StudentProgress[] = [
  {
    userId: "1",
    courseId: "data-science-101",
    completedLessons: ["lesson-1-1"],
    completedContents: ["content-1-1-1", "content-1-1-2"],
    quizScores: {
      "content-1-2-3": 80,
    },
    assignmentSubmissions: {},
    xpEarned: 145,
    lastAccessed: "2023-10-10T14:30:00Z",
  },
  {
    userId: "1",
    courseId: "web-dev-advanced",
    completedLessons: [],
    completedContents: [],
    quizScores: {},
    assignmentSubmissions: {},
    xpEarned: 0,
    lastAccessed: "2023-10-09T10:15:00Z",
  },
  {
    userId: "1",
    courseId: "psychology-101",
    completedLessons: [],
    completedContents: [],
    quizScores: {},
    assignmentSubmissions: {},
    xpEarned: 0,
    lastAccessed: "2023-10-08T16:45:00Z",
  },
]

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [userProgress, setUserProgress] = useState<StudentProgress[]>(mockProgress)

  const createCourse = async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt" | "enrolledStudents">) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.random().toString(36).substring(2, 9),
      enrolledStudents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setCourses([...courses, newCourse])
    return newCourse
  }

  const updateCourse = async (courseId: string, courseData: Partial<Course>) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, ...courseData, updatedAt: new Date().toISOString() } : course,
    )

    setCourses(updatedCourses)
    return updatedCourses.find((course) => course.id === courseId)!
  }

  const deleteCourse = async (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  const enrollInCourse = async (courseId: string) => {
    if (!user) throw new Error("User must be logged in to enroll in a course")

    // Update course with new student
    const updatedCourses = courses.map((course) =>
      course.id === courseId
        ? {
            ...course,
            enrolledStudents: [...course.enrolledStudents, user.id],
            updatedAt: new Date().toISOString(),
          }
        : course,
    )

    setCourses(updatedCourses)

    // Create progress record for student
    const newProgress: StudentProgress = {
      userId: user.id,
      courseId,
      completedLessons: [],
      completedContents: [],
      quizScores: {},
      assignmentSubmissions: {},
      xpEarned: 0,
      lastAccessed: new Date().toISOString(),
    }

    setUserProgress([...userProgress, newProgress])
  }

  const unenrollFromCourse = async (courseId: string) => {
    if (!user) throw new Error("User must be logged in to unenroll from a course")

    // Update course by removing student
    const updatedCourses = courses.map((course) =>
      course.id === courseId
        ? {
            ...course,
            enrolledStudents: course.enrolledStudents.filter((id) => id !== user.id),
            updatedAt: new Date().toISOString(),
          }
        : course,
    )

    setCourses(updatedCourses)

    // Remove progress record for student
    setUserProgress(userProgress.filter((progress) => !(progress.userId === user.id && progress.courseId === courseId)))
  }

  const updateProgress = async (progressData: Partial<StudentProgress>) => {
    if (!user) throw new Error("User must be logged in to update progress")
    if (!progressData.courseId) throw new Error("Course ID is required to update progress")

    const existingProgressIndex = userProgress.findIndex(
      (p) => p.userId === user.id && p.courseId === progressData.courseId,
    )

    if (existingProgressIndex === -1) {
      throw new Error("No progress record found for this course")
    }

    const updatedProgress = [...userProgress]
    updatedProgress[existingProgressIndex] = {
      ...updatedProgress[existingProgressIndex],
      ...progressData,
      lastAccessed: new Date().toISOString(),
    }

    setUserProgress(updatedProgress)
  }

  const getCourseById = (courseId: string) => {
    return courses.find((course) => course.id === courseId)
  }

  const getUserProgressForCourse = (courseId: string) => {
    if (!user) return undefined
    return userProgress.find((progress) => progress.userId === user.id && progress.courseId === courseId)
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        userProgress,
        createCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        unenrollFromCourse,
        updateProgress,
        getCourseById,
        getUserProgressForCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider")
  }
  return context
}
