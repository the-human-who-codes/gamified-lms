import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { CourseCard } from "@/app/components/course-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LucideBook,
  LucideBell,
  LucideSearch,
  LucideFilter,
  LucideBookOpen,
  LucideUsers,
  LucideCalendar,
  LucideBarChart,
} from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // Mock data for courses
  const activeCourses = [
    {
      id: "data-science-101",
      title: "Introduction to Data Science",
      progress: 68,
      instructor: "Dr. Sarah Chen",
      nextTask: "Complete Quiz 3",
      dueDate: "Tomorrow",
      color: "emerald",
      image: "/placeholder.svg?height=150&width=300&text=Data+Science",
    },
    {
      id: "web-dev-advanced",
      title: "Advanced Web Development",
      progress: 42,
      instructor: "Prof. James Wilson",
      nextTask: "Submit Project Milestone",
      dueDate: "3 days",
      color: "blue",
      image: "/placeholder.svg?height=150&width=300&text=Web+Development",
    },
    {
      id: "psychology-101",
      title: "Psychology 101",
      progress: 89,
      instructor: "Dr. Emily Rodriguez",
      nextTask: "Read Chapter 7",
      dueDate: "Today",
      color: "violet",
      image: "/placeholder.svg?height=150&width=300&text=Psychology",
    },
  ]

  const availableCourses = [
    {
      id: "machine-learning",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chang",
      description: "Learn the basics of machine learning algorithms and applications.",
      students: 1245,
      duration: "8 weeks",
      level: "Intermediate",
      image: "/placeholder.svg?height=150&width=300&text=Machine+Learning",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Essentials",
      instructor: "Prof. Lisa Johnson",
      description: "Master the core concepts of digital marketing and online advertising.",
      students: 987,
      duration: "6 weeks",
      level: "Beginner",
      image: "/placeholder.svg?height=150&width=300&text=Digital+Marketing",
    },
    {
      id: "creative-writing",
      title: "Creative Writing Workshop",
      instructor: "Sarah Williams, MFA",
      description: "Develop your creative writing skills across multiple genres.",
      students: 756,
      duration: "10 weeks",
      level: "All Levels",
      image: "/placeholder.svg?height=150&width=300&text=Creative+Writing",
    },
    {
      id: "business-analytics",
      title: "Business Analytics",
      instructor: "Dr. Robert Chen",
      description: "Learn how to use data to drive business decisions and strategy.",
      students: 1089,
      duration: "12 weeks",
      level: "Intermediate",
      image: "/placeholder.svg?height=150&width=300&text=Business+Analytics",
    },
  ]

  const completedCourses = [
    {
      id: "intro-programming",
      title: "Introduction to Programming",
      instructor: "Prof. David Miller",
      completedDate: "June 15, 2023",
      grade: "A",
      certificate: true,
      image: "/placeholder.svg?height=150&width=300&text=Programming",
    },
    {
      id: "public-speaking",
      title: "Public Speaking Mastery",
      instructor: "Dr. Jennifer Adams",
      completedDate: "April 3, 2023",
      grade: "A-",
      certificate: true,
      image: "/placeholder.svg?height=150&width=300&text=Public+Speaking",
    },
  ]

  return (
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
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <p className="text-gray-600">Manage your learning journey</p>
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
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <Button variant="outline">
                <LucideFilter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <LucideBookOpen className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Courses</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <LucideUsers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available Courses</p>
                    <p className="text-xl font-bold">24</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-violet-100 p-3 rounded-full">
                    <LucideCalendar className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours This Week</p>
                    <p className="text-xl font-bold">12.5</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <LucideBarChart className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-xl font-bold">87%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">Active Courses</TabsTrigger>
                <TabsTrigger value="available">Available Courses</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      instructor={course.instructor}
                      progress={course.progress}
                      dueTask={course.nextTask}
                      dueDate={course.dueDate}
                      color={course.color}
                      image={course.image}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="available">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">{course.instructor}</p>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.students} students
                          </Badge>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-100 px-2 py-1 rounded-full text-xs font-medium text-emerald-700">
                          Completed
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-gray-500 text-sm mb-3">{course.instructor}</p>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span className="text-gray-500">Completed: {course.completedDate}</span>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            Grade: {course.grade}
                          </Badge>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/courses/${course.id}`}>
                            {course.certificate ? "View Certificate" : "Course Details"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
