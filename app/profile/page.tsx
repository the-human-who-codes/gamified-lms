"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { ProtectedRoute } from "@/app/components/protected-route"
import { useAuth } from "../contexts/auth-context"
import { useGamification } from "../contexts/gamification-context"
import { useCourses } from "../contexts/course-context"
import {
  LucideBook,
  LucideBell,
  LucideUser,
  LucideSettings,
  LucideZap,
  LucideAward,
  LucideTrophy,
  LucideCalendar,
  LucideLoader2,
  LucideCheckCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { getUserBadges, getUserXpTotal, getUserLevel } = useGamification()
  const { courses, userProgress } = useCourses()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const badges = getUserBadges()
  const totalXp = getUserXpTotal()
  const level = getUserLevel()

  // Calculate XP needed for next level
  const xpForNextLevel = level * 500
  const xpProgress = ((totalXp % 500) / 500) * 100

  // Get user's courses
  const userCourses =
    user?.role === "student"
      ? courses.filter((course) => course.enrolledStudents.includes(user.id))
      : user?.role === "teacher"
        ? courses.filter((course) => course.instructor.id === user.id)
        : []

  const handleUpdateProfile = async () => {
    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      // In a real app, this would be an API call
      await updateUser({ name, email })
      setSuccess(true)
    } catch (err) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
                  <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-gray-600">Manage your account and view your progress</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-lg">
                            {user?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-gray-500 mb-2">{user?.email}</p>
                        <Badge variant="outline" className="capitalize">
                          {user?.role}
                        </Badge>

                        <div className="w-full mt-6">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Level {level}</span>
                            <span>
                              {totalXp % 500}/{xpForNextLevel} XP to Level {level + 1}
                            </span>
                          </div>
                          <Progress value={xpProgress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                          <div>
                            <div className="text-2xl font-bold text-emerald-600">{level}</div>
                            <p className="text-xs text-gray-500">Level</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-amber-600">{totalXp}</div>
                            <p className="text-xs text-gray-500">Total XP</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{badges.length}</div>
                            <p className="text-xs text-gray-500">Badges</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Badges */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <LucideAward className="h-5 w-5 text-amber-500" />
                        <CardTitle>My Badges</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {badges.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {badges.map((badge) => (
                            <div key={badge.id} className="flex flex-col items-center text-center p-2">
                              <div className="bg-amber-100 rounded-full p-3 mb-2">
                                <img src={badge.image || "/placeholder.svg"} alt={badge.name} className="h-12 w-12" />
                              </div>
                              <h4 className="font-medium text-sm">{badge.name}</h4>
                              <p className="text-xs text-gray-500">{badge.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <LucideAward className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                          <p>No badges earned yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2 space-y-6">
                  <Tabs defaultValue="profile">
                    <TabsList className="mb-6">
                      <TabsTrigger value="profile">
                        <LucideUser className="h-4 w-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="courses">
                        <LucideBook className="h-4 w-4 mr-2" />
                        Courses
                      </TabsTrigger>
                      <TabsTrigger value="achievements">
                        <LucideTrophy className="h-4 w-4 mr-2" />
                        Achievements
                      </TabsTrigger>
                      <TabsTrigger value="settings">
                        <LucideSettings className="h-4 w-4 mr-2" />
                        Settings
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                      <Card>
                        <CardHeader>
                          <CardTitle>Profile Information</CardTitle>
                          <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {success && (
                            <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
                              <LucideCheckCircle className="h-4 w-4 text-emerald-600" />
                              <AlertDescription>Profile updated successfully!</AlertDescription>
                            </Alert>
                          )}

                          {error && (
                            <Alert variant="destructive">
                              <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                              id="bio"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              placeholder="Tell us about yourself"
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleUpdateProfile} disabled={loading}>
                            {loading ? (
                              <>
                                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    <TabsContent value="courses">
                      <Card>
                        <CardHeader>
                          <CardTitle>My Courses</CardTitle>
                          <CardDescription>
                            {user?.role === "student" ? "Courses you are enrolled in" : "Courses you are teaching"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {userCourses.length > 0 ? (
                            <div className="space-y-4">
                              {userCourses.map((course) => {
                                const progress =
                                  user?.role === "student"
                                    ? userProgress.find((p) => p.userId === user.id && p.courseId === course.id)
                                    : null

                                const progressPercentage = progress
                                  ? Math.min(Math.round((progress.xpEarned / 500) * 100), 100)
                                  : 0

                                return (
                                  <div key={course.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <h3 className="font-medium">{course.title}</h3>
                                      <Badge variant="outline">{course.level}</Badge>
                                    </div>

                                    {user?.role === "student" && (
                                      <div className="mb-2">
                                        <div className="flex justify-between text-sm mb-1">
                                          <span>Progress</span>
                                          <span>{progressPercentage}%</span>
                                        </div>
                                        <Progress value={progressPercentage} className="h-2" />
                                      </div>
                                    )}

                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <LucideCalendar className="h-4 w-4" />
                                        <span>
                                          {user?.role === "student"
                                            ? `Last accessed: ${
                                                progress?.lastAccessed
                                                  ? new Date(progress.lastAccessed).toLocaleDateString()
                                                  : "Never"
                                              }`
                                            : `Created: ${new Date(course.createdAt).toLocaleDateString()}`}
                                        </span>
                                      </div>

                                      {user?.role === "student" && (
                                        <div className="flex items-center gap-1">
                                          <LucideZap className="h-4 w-4 text-amber-500" />
                                          <span>{progress?.xpEarned || 0} XP earned</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <LucideBook className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                              <p>
                                {user?.role === "student"
                                  ? "You are not enrolled in any courses yet"
                                  : "You are not teaching any courses yet"}
                              </p>
                              <Button className="mt-4">
                                {user?.role === "student" ? "Browse Courses" : "Create a Course"}
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="achievements">
                      <Card>
                        <CardHeader>
                          <CardTitle>Achievements</CardTitle>
                          <CardDescription>Your learning milestones and accomplishments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-medium mb-3">XP Progress</h3>
                              <div className="bg-gray-50 p-4 rounded-lg border">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Level {level}</span>
                                  <span>
                                    {totalXp % 500}/{xpForNextLevel} XP to Level {level + 1}
                                  </span>
                                </div>
                                <Progress value={xpProgress} className="h-3" />

                                <div className="mt-4 text-sm text-gray-500">
                                  <p>Total XP: {totalXp}</p>
                                  <p>Current Level: {level}</p>
                                  <p>XP needed for next level: {xpForNextLevel - (totalXp % 500)}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium mb-3">Recent Activity</h3>
                              <div className="space-y-3">
                                {/* This would be populated with real activity data in a full implementation */}
                                <div className="flex items-start gap-3 p-3 border rounded-lg">
                                  <div className="bg-emerald-100 rounded-full p-2 mt-1">
                                    <LucideCheckCircle className="h-4 w-4 text-emerald-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Completed Lesson: Introduction to Data Science</h4>
                                    <p className="text-sm text-gray-500">2 days ago</p>
                                    <Badge className="mt-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                      +50 XP
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 border rounded-lg">
                                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                                    <LucideAward className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Earned Badge: Fast Learner</h4>
                                    <p className="text-sm text-gray-500">3 days ago</p>
                                    <Badge className="mt-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                      +200 XP
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                      <Card>
                        <CardHeader>
                          <CardTitle>Account Settings</CardTitle>
                          <CardDescription>Manage your account preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input id="password" type="password" placeholder="New password" />
                          </div>

                          <div className="space-y-2">
                            <Label>Email Notifications</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="notify-course" className="rounded border-gray-300" />
                                <Label htmlFor="notify-course">Course updates</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="notify-assignment" className="rounded border-gray-300" />
                                <Label htmlFor="notify-assignment">Assignment deadlines</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="notify-achievement" className="rounded border-gray-300" />
                                <Label htmlFor="notify-achievement">New achievements</Label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button>Save Settings</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
