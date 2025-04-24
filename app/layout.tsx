import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./contexts/auth-context"
import { CourseProvider } from "./contexts/course-context"
import { GamificationProvider } from "./contexts/gamification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduQuest - Gamified Learning Platform",
  description: "A gamified learning management system with AI integration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CourseProvider>
              <GamificationProvider>{children}</GamificationProvider>
            </CourseProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
