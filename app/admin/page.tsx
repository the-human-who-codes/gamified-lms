"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { ProtectedRoute } from "@/app/components/protected-route"
import { useAuth } from "../contexts/auth-context"
import { useCourses } from "../contexts/course-context"
import { useGamification } from "../contexts/gamification-context"
import {
  LucideBook,
  LucideBell,
  LucideUsers,
  LucideBarChart,
  LucideSearch,
  LucideGraduationCap,
  LucideAward,
  LucideSettings,
  LucideUserPlus,
  LucideBookOpen,
  LucideTrash2,
  LucideEdit,
  LucideEye,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user } = useAuth()
  const { courses } = useCourses()
  const { badges } = useGamification()

  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for users (in a real app, this would come from an API)
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "student",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    {
      id: "2",
      name: "Dr. Sarah Chen",
      email: "teacher@example.com",
      role: "teacher",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=AU",
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      role: "student",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
    },
    {
      id: "6",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "student",
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
  ]

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Manage your platform</p>
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
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <LucideUsers className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <h3 className="text-2xl font-bold">{users.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 rounded-full p-3">
                        <LucideBookOpen className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Courses</p>
                        <h3 className="text-2xl font-bold">{courses.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 rounded-full p-3">
                        <LucideAward className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Badges</p>
                        <h3 className="text-2xl font-bold">{badges.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-violet-100 rounded-full p-3">
                        <LucideBarChart className="h-6 w-6 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Students</p>
                        <h3 className="text-2xl font-bold">
                          {users.filter((user) => user.role === "student" && user.status === "active").length}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Dashboard Content */}
              <Tabs defaultValue="users">
                <TabsList className="mb-6">
                  <TabsTrigger value="users">
                    <LucideUsers className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="courses">
                    <LucideBookOpen className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="badges">
                    <LucideAward className="h-4 w-4 mr-2" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <LucideSettings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>User Management</CardTitle>
                          <CardDescription>Manage platform users</CardDescription>
                        </div>
                        <Button>
                          <LucideUserPlus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="max-w-sm"
                        />
                        <Button variant="ghost" size="icon">
                          <LucideSearch className="h-4 w-4" />
                        </Button>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {user.role === "student" && <LucideGraduationCap className="h-3 w-3 mr-1" />}
                                  {user.role === "teacher" && <LucideBookOpen className="h-3 w-3 mr-1" />}
                                  {user.role === "admin" && <LucideSettings className="h-3 w-3 mr-1" />}
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    user.status === "active"
                                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                      : "bg-gray-50 text-gray-600 border-gray-200"
                                  }`}
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <LucideEye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <LucideEdit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <LucideTrash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Course Management</CardTitle>
                          <CardDescription>Manage platform courses</CardDescription>
                        </div>
                        <Button asChild>
                          <Link href="/courses/create">
                            <LucideBookOpen className="h-4 w-4 mr-2" />
                            Add Course
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courses.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>
                                <div className="font-medium">{course.title}</div>
                                <div className="text-sm text-gray-500">{course.modules.length} modules</div>
                              </TableCell>
                              <TableCell>{course.instructor.name}</TableCell>
                              <TableCell>{course.enrolledStudents.length}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {course.level}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/courses/${course.id}`}>
                                      <LucideEye className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/courses/${course.id}/edit`}>
                                      <LucideEdit className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <LucideTrash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="badges">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Badge Management</CardTitle>
                          <CardDescription>Manage platform badges and achievements</CardDescription>
                        </div>
                        <Button>
                          <LucideAward className="h-4 w-4 mr-2" />
                          Add Badge
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {badges.map((badge) => (
                          <Card key={badge.id}>
                            <CardContent className="pt-6">
                              <div className="flex flex-col items-center text-center">
                                <div className="bg-amber-100 rounded-full p-3 mb-3">
                                  <img src={badge.image || "/placeholder.svg"} alt={badge.name} className="h-16 w-16" />
                                </div>
                                <h3 className="font-medium mb-1">{badge.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                                <Badge variant="outline">{badge.xpReward} XP</Badge>

                                <div className="flex justify-center gap-2 mt-4">
                                  <Button variant="ghost" size="sm">
                                    <LucideEdit className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <LucideTrash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Settings</CardTitle>
                      <CardDescription>Configure platform-wide settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">General Settings</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Platform Name</label>
                              <Input defaultValue="EduQuest" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Support Email</label>
                              <Input defaultValue="support@eduquest.com" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Platform Description</label>
                            <Input defaultValue="A gamified learning management system with AI integration" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Gamification Settings</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">XP per Level</label>
                              <Input type="number" defaultValue="500" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Base Lesson XP</label>
                              <Input type="number" defaultValue="50" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Perfect Quiz Bonus</label>
                              <Input type="number" defaultValue="50" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Registration Settings</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="allow-registration"
                              className="rounded border-gray-300"
                              defaultChecked
                            />
                            <label htmlFor="allow-registration" className="text-sm">
                              Allow new user registration
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="email-verification"
                              className="rounded border-gray-300"
                              defaultChecked
                            />
                            <label htmlFor="email-verification" className="text-sm">
                              Require email verification
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="admin-approval" className="rounded border-gray-300" />
                            <label htmlFor="admin-approval" className="text-sm">
                              Require admin approval for new teachers
                            </label>
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
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
