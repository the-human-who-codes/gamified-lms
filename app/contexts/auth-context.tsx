"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  xp: number
  level: number
  badges: string[]
  enrolledCourses?: string[]
  teachingCourses?: string[]
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("eduquest_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("eduquest_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("eduquest_user")
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // For MVP, we'll simulate with mock data
      if (email === "student@example.com" && password === "password") {
        setUser({
          id: "1",
          name: "Alex Johnson",
          email: "student@example.com",
          role: "student",
          avatar: "/placeholder.svg?height=40&width=40&text=AJ",
          xp: 2450,
          level: 8,
          badges: ["fast_learner", "quiz_master", "early_bird"],
          enrolledCourses: ["data-science-101", "web-dev-advanced", "psychology-101"],
        })
      } else if (email === "teacher@example.com" && password === "password") {
        setUser({
          id: "2",
          name: "Dr. Sarah Chen",
          email: "teacher@example.com",
          role: "teacher",
          avatar: "/placeholder.svg?height=40&width=40&text=SC",
          xp: 5000,
          level: 15,
          badges: ["content_creator", "mentor", "expert"],
          teachingCourses: ["data-science-101"],
        })
      } else if (email === "admin@example.com" && password === "password") {
        setUser({
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40&text=AU",
          xp: 10000,
          level: 30,
          badges: ["system_admin", "platform_expert"],
        })
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // For MVP, we'll simulate with mock data
      setUser({
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        avatar: `/placeholder.svg?height=40&width=40&text=${name
          .split(" ")
          .map((n) => n[0])
          .join("")}`,
        xp: 0,
        level: 1,
        badges: [],
        enrolledCourses: role === "student" ? [] : undefined,
        teachingCourses: role === "teacher" ? [] : undefined,
      })
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
