"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Badge {
  id: string
  name: string
  description: string
  image: string
  criteria: string
  xpReward: number
}

export interface Achievement {
  userId: string
  badgeId: string
  earnedAt: string
}

export interface XpTransaction {
  id: string
  userId: string
  amount: number
  reason: string
  courseId?: string
  lessonId?: string
  contentId?: string
  timestamp: string
}

interface GamificationContextType {
  badges: Badge[]
  userAchievements: Achievement[]
  xpTransactions: XpTransaction[]
  awardXp: (
    amount: number,
    reason: string,
    details?: { courseId?: string; lessonId?: string; contentId?: string },
  ) => Promise<void>
  awardBadge: (badgeId: string) => Promise<void>
  getUserBadges: () => Badge[]
  getUserXpTotal: () => number
  getUserLevel: () => number
  checkForBadges: (courseId?: string) => Promise<Badge[]>
}

// Mock badges data
const mockBadges: Badge[] = [
  {
    id: "fast_learner",
    name: "Fast Learner",
    description: "Complete 5 lessons in a single day",
    image: "/placeholder.svg?height=100&width=100&text=Fast+Learner",
    criteria: "Complete 5 lessons in a single day",
    xpReward: 200,
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Score 100% on 3 quizzes",
    image: "/placeholder.svg?height=100&width=100&text=Quiz+Master",
    criteria: "Score 100% on 3 quizzes",
    xpReward: 300,
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Submit an assignment at least 3 days before the deadline",
    image: "/placeholder.svg?height=100&width=100&text=Early+Bird",
    criteria: "Submit an assignment at least 3 days before the deadline",
    xpReward: 150,
  },
  {
    id: "content_creator",
    name: "Content Creator",
    description: "Create your first course",
    image: "/placeholder.svg?height=100&width=100&text=Content+Creator",
    criteria: "Create your first course",
    xpReward: 500,
  },
  {
    id: "mentor",
    name: "Mentor",
    description: "Have 10 students enroll in your courses",
    image: "/placeholder.svg?height=100&width=100&text=Mentor",
    criteria: "Have 10 students enroll in your courses",
    xpReward: 400,
  },
  {
    id: "expert",
    name: "Expert",
    description: "Create 5 courses",
    image: "/placeholder.svg?height=100&width=100&text=Expert",
    criteria: "Create 5 courses",
    xpReward: 1000,
  },
  {
    id: "system_admin",
    name: "System Administrator",
    description: "Special badge for system administrators",
    image: "/placeholder.svg?height=100&width=100&text=System+Admin",
    criteria: "Be an administrator of the platform",
    xpReward: 0,
  },
  {
    id: "platform_expert",
    name: "Platform Expert",
    description: "Special badge for platform experts",
    image: "/placeholder.svg?height=100&width=100&text=Platform+Expert",
    criteria: "Demonstrate expertise in platform management",
    xpReward: 0,
  },
]

// Mock achievements data
const mockAchievements: Achievement[] = [
  {
    userId: "1",
    badgeId: "fast_learner",
    earnedAt: "2023-09-15T10:30:00Z",
  },
  {
    userId: "1",
    badgeId: "quiz_master",
    earnedAt: "2023-09-20T14:45:00Z",
  },
  {
    userId: "1",
    badgeId: "early_bird",
    earnedAt: "2023-09-25T09:15:00Z",
  },
  {
    userId: "2",
    badgeId: "content_creator",
    earnedAt: "2023-08-10T11:20:00Z",
  },
  {
    userId: "2",
    badgeId: "mentor",
    earnedAt: "2023-08-20T16:30:00Z",
  },
  {
    userId: "2",
    badgeId: "expert",
    earnedAt: "2023-09-05T13:45:00Z",
  },
  {
    userId: "3",
    badgeId: "system_admin",
    earnedAt: "2023-07-01T08:00:00Z",
  },
  {
    userId: "3",
    badgeId: "platform_expert",
    earnedAt: "2023-07-15T10:15:00Z",
  },
]

// Mock XP transactions
const mockXpTransactions: XpTransaction[] = [
  {
    id: "1",
    userId: "1",
    amount: 50,
    reason: "Completed lesson",
    courseId: "data-science-101",
    lessonId: "lesson-1-1",
    timestamp: "2023-10-01T09:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    amount: 75,
    reason: "Completed quiz",
    courseId: "data-science-101",
    lessonId: "lesson-1-2",
    contentId: "content-1-2-3",
    timestamp: "2023-10-02T14:45:00Z",
  },
  {
    id: "3",
    userId: "1",
    amount: 200,
    reason: "Earned badge: Fast Learner",
    timestamp: "2023-09-15T10:30:00Z",
  },
  {
    id: "4",
    userId: "1",
    amount: 300,
    reason: "Earned badge: Quiz Master",
    timestamp: "2023-09-20T14:45:00Z",
  },
  {
    id: "5",
    userId: "1",
    amount: 150,
    reason: "Earned badge: Early Bird",
    timestamp: "2023-09-25T09:15:00Z",
  },
]

// Calculate level based on XP
function calculateLevel(xp: number): number {
  // Simple level calculation: level = 1 + floor(xp / 500)
  // This means each level requires 500 XP
  return 1 + Math.floor(xp / 500)
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user, updateUser } = useAuth()
  const [badges, setBadges] = useState<Badge[]>(mockBadges)
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(mockAchievements)
  const [xpTransactions, setXpTransactions] = useState<XpTransaction[]>(mockXpTransactions)

  const awardXp = async (
    amount: number,
    reason: string,
    details?: { courseId?: string; lessonId?: string; contentId?: string },
  ) => {
    if (!user) throw new Error("User must be logged in to earn XP")

    // Create new XP transaction
    const newTransaction: XpTransaction = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      amount,
      reason,
      ...details,
      timestamp: new Date().toISOString(),
    }

    setXpTransactions([...xpTransactions, newTransaction])

    // Update user's total XP
    const newTotalXp = user.xp + amount
    const newLevel = calculateLevel(newTotalXp)

    updateUser({
      xp: newTotalXp,
      level: newLevel,
    })

    return newTransaction
  }

  const awardBadge = async (badgeId: string) => {
    if (!user) throw new Error("User must be logged in to earn badges")

    // Check if user already has this badge
    const existingAchievement = userAchievements.find((a) => a.userId === user.id && a.badgeId === badgeId)

    if (existingAchievement) {
      return // User already has this badge
    }

    // Find the badge to get XP reward
    const badge = badges.find((b) => b.id === badgeId)
    if (!badge) throw new Error("Badge not found")

    // Create new achievement
    const newAchievement: Achievement = {
      userId: user.id,
      badgeId,
      earnedAt: new Date().toISOString(),
    }

    setUserAchievements([...userAchievements, newAchievement])

    // Update user's badges
    const updatedBadges = [...user.badges, badgeId]
    updateUser({ badges: updatedBadges })

    // Award XP for earning the badge  badgeId]
    updateUser({ badges: updatedBadges })

    // Award XP for earning the badge
    if (badge.xpReward > 0) {
      await awardXp(badge.xpReward, `Earned badge: ${badge.name}`)
    }

    return newAchievement
  }

  const getUserBadges = () => {
    if (!user) return []

    return badges.filter((badge) => userAchievements.some((a) => a.userId === user.id && a.badgeId === badge.id))
  }

  const getUserXpTotal = () => {
    if (!user) return 0
    return user.xp
  }

  const getUserLevel = () => {
    if (!user) return 1
    return user.level
  }

  const checkForBadges = async (courseId?: string): Promise<Badge[]> => {
    if (!user) return []

    const earnedBadges: Badge[] = []

    // Check for each badge if the user meets the criteria
    // This is a simplified version - in a real app, you would have more complex logic

    // Example: Check for Fast Learner badge
    const today = new Date().toISOString().split("T")[0]
    const lessonsCompletedToday = xpTransactions.filter(
      (t) => t.userId === user.id && t.reason === "Completed lesson" && t.timestamp.startsWith(today),
    ).length

    if (lessonsCompletedToday >= 5 && !user.badges.includes("fast_learner")) {
      const badge = badges.find((b) => b.id === "fast_learner")
      if (badge) {
        await awardBadge("fast_learner")
        earnedBadges.push(badge)
      }
    }

    // Example: Check for Quiz Master badge
    const perfectQuizzes = xpTransactions.filter(
      (t) => t.userId === user.id && t.reason === "Completed quiz with perfect score",
    ).length

    if (perfectQuizzes >= 3 && !user.badges.includes("quiz_master")) {
      const badge = badges.find((b) => b.id === "quiz_master")
      if (badge) {
        await awardBadge("quiz_master")
        earnedBadges.push(badge)
      }
    }

    return earnedBadges
  }

  return (
    <GamificationContext.Provider
      value={{
        badges,
        userAchievements,
        xpTransactions,
        awardXp,
        awardBadge,
        getUserBadges,
        getUserXpTotal,
        getUserLevel,
        checkForBadges,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
