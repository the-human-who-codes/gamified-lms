"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { CourseCard } from "@/app/components/course-card"
import { StatsCard } from "@/components/stats-card"
import { ProtectedRoute } from "@/app/components/protected-route"
import { useAuth } from "@/app/contexts/auth-context"
import { useCourses } from "@/app/contexts/course-context"
import { useGamification } from "@/app/contexts/gamification-context"
import {
  LucideBook,
  LucideAward,
  LucideTrophy,
  LucideUsers,
  LucideBell,
  LucideCalendar,
  LucideZap,
  FlameIcon as LucideFire,
  LucideBrain,
  LucideBookOpen,
  LucideCheckCircle,
  LucidePlay,
  LucideMessageSquare,
  LucidePlus,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { user } = useAuth()
  const { courses, userProgress } = useCourses()
  const { getUserXpTotal, getUserLevel, getUserBadges } = useGamification()

  // Filter courses based on user role
  const userCourses =
    user?.role === "student"
      ? courses.filter((course) => course.enrolledStudents.includes(user.id))
      : user?.role === "teacher"
        ? courses.filter((course) => course.instructor.id === user.id)
        : courses

  // Mock data for upcoming activities (in a real app, this would come from an API)
  const upcomingActivities = [
    {
      title: "Data Science Quiz",
      date: "Today, 2:00 PM",
      type: "Quiz",
      course: "Data Science",
    },
    {
      title: "Web Dev Project Due",
      date: "Tomorrow, 11:59 PM",
      type: "Assignment",
      course: "Web Development",
    },
    {
      title: "Psychology Discussion",
      date: "Wed, 3:30 PM",
      type: "Discussion",
      course: "Psychology 101",
    },
    {
      title: "Live Lecture: AI Ethics",
      date: "Thu, 10:00 AM",
      type: "Lecture",
      course: "Data Science",
    },
    {
      title: "Group Project Meeting",
      date: "Fri, 1:00 PM",
      type: "Meeting",
      course: "Web Development",
    },
  ]

  // Mock data for achievements (in a real app, this would come from an API)
  const recentAchievements = [
    {
      title: "Perfect Score",
      description: "Scored 100% on a quiz",
      xp: 150,
      icon: <LucideCheckCircle className="h-8 w-8 text-emerald-500" />,
    },
    {
      title: "Early Bird",
      description: "Submitted assignment 3 days early",
      xp: 100,
      icon: <LucideZap className="h-8 w-8 text-amber-500" />,
    },
    {
      title: "Helpful Peer",
      description: "Answered 5 questions in forums",
      xp: 75,
      icon: <LucideUsers className="h-8 w-8 text-blue-500" />,
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto hidden md:block">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <LucideBook className="h-6 w-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-emerald-600">EduQuest</h1>
              </div>
            </div>

            <div className="p-4">
              <MainNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex justify-between items-center px-6 py-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {user?.name}!</p>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon">
                    <LucideBell className="h-5 w-5" />
                  </Button>
                  <UserNav />
                </div>
              </div>
            </header>

            <div className="p-6">
              {/* Gamification Stats */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatsCard title="Current Streak" value="12 Days" icon={LucideFire} color="emerald" />
                <StatsCard title="XP Points" value={getUserXpTotal()} icon={LucideZap} color="amber" />
                <StatsCard title="Level" value={getUserLevel()} icon={LucideTrophy} color="violet" />
                <StatsCard title="Badges Earned" value={getUserBadges().length} icon={LucideAward} color="blue" />
              </section>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Active Courses */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>{user?.role === "student" ? "My Courses" : "My Teaching Courses"}</CardTitle>
                          <CardDescription>
                            {user?.role === "student" ? "Continue where you left off" : "Manage your courses"}
                          </CardDescription>
                        </div>

                        {user?.role === "teacher" && (
                          <Button size="sm" asChild>
                            <Link href="/courses/create">
                              <LucidePlus className="h-4 w-4 mr-1" />
                              Create Course
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userCourses.slice(0, 4).map((course) => {
                          const progress =
                            userProgress.find((p) => p.userId === user?.id && p.courseId === course.id)?.xpEarned || 0

                          return (
                            <CourseCard
                              key={course.id}
                              id={course.id}
                              title={course.title}
                              instructor={course.instructor.name}
                              progress={Math.min(Math.round((progress / 500) * 100), 100)}
                              dueTask={
                                user?.role === "teacher"
                                  ? `${course.enrolledStudents.length} students`
                                  : "Continue learning"
                              }
                              dueDate={user?.role === "teacher" ? "" : ""}
                              color={
                                course.id === "data-science-101"
                                  ? "emerald"
                                  : course.id === "web-dev-advanced"
                                    ? "blue"
                                    : "violet"
                              }
                            />
                          )
                        })}
                      </div>

                      {userCourses.length === 0 && (
                        <div className="text-center py-8">
                          <LucideBookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                          {user?.role === "student" ? (
                            <>
                              <p className="text-gray-500 mb-4">Explore available courses and start learning</p>
                              <Button asChild>
                                <Link href="/courses">Browse Courses</Link>
                              </Button>
                            </>
                          ) : (
                            <>
                              <p className="text-gray-500 mb-4">Create your first course to get started</p>
                              <Button asChild>
                                <Link href="/courses/create">Create Course</Link>
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/courses">
                          {user?.role === "student" ? "View All Courses" : "Manage All Courses"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* AI Assistant */}
                  <Card className="border-violet-200 bg-violet-50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <LucideBrain className="h-5 w-5 text-violet-600" />
                        <CardTitle className="text-violet-700">AI Learning Assistant</CardTitle>
                      </div>
                      <CardDescription>Get help with your coursework</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white rounded-lg p-4 border border-violet-200">
                        <p className="text-gray-600 mb-4">What would you like help with today?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/ai-tools">
                              <LucideBookOpen className="mr-2 h-4 w-4" />
                              Explain a concept
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/ai-tools">
                              <LucideCheckCircle className="mr-2 h-4 w-4" />
                              Check my work
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/ai-tools">
                              <LucidePlay className="mr-2 h-4 w-4" />
                              Practice exercises
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/ai-tools">
                              <LucideMessageSquare className="mr-2 h-4 w-4" />
                              Ask a question
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  {/* Upcoming Activities */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Upcoming Activities</CardTitle>
                      <CardDescription>Your schedule for the week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingActivities.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                            <div className="bg-gray-100 rounded-full p-2 mt-1">
                              <LucideCalendar className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-gray-500 text-sm">{activity.date}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {activity.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {activity.course}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/calendar">View Calendar</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Recent Achievements */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <LucideAward className="h-5 w-5 text-amber-500" />
                        <CardTitle>Recent Achievements</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentAchievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-4 pb-3 border-b last:border-0 last:pb-0">
                            <div className="bg-gray-100 rounded-full p-2">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-gray-500 text-sm">{achievement.description}</p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              +{achievement.xp} XP
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/achievements">View All Achievements</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
