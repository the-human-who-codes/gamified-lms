import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { Badge } from "@/components/ui/badge"
import {
  LucideBook,
  LucideBell,
  LucideCalendar,
  LucideChevronLeft,
  LucideChevronRight,
  LucideVideo,
  LucideFileText,
  LucideUsers,
  LucideClipboard,
} from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  // Mock data for current month
  const currentMonth = "October 2023"
  const daysInMonth = 31
  const firstDayOfMonth = 0 // 0 = Sunday, 1 = Monday, etc.
  const currentDay = 15

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Data Science Quiz",
      date: "2023-10-15",
      time: "2:00 PM",
      type: "quiz",
      course: "Introduction to Data Science",
      courseId: "data-science-101",
    },
    {
      id: 2,
      title: "Web Development Project Due",
      date: "2023-10-17",
      time: "11:59 PM",
      type: "assignment",
      course: "Advanced Web Development",
      courseId: "web-dev-advanced",
    },
    {
      id: 3,
      title: "Psychology Discussion",
      date: "2023-10-18",
      time: "3:30 PM",
      type: "discussion",
      course: "Psychology 101",
      courseId: "psychology-101",
    },
    {
      id: 4,
      title: "Live Lecture: AI Ethics",
      date: "2023-10-19",
      time: "10:00 AM",
      type: "lecture",
      course: "Introduction to Data Science",
      courseId: "data-science-101",
    },
    {
      id: 5,
      title: "Group Project Meeting",
      date: "2023-10-20",
      time: "1:00 PM",
      type: "meeting",
      course: "Advanced Web Development",
      courseId: "web-dev-advanced",
    },
  ]

  // Generate calendar days
  const calendarDays = []
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // Get events for a specific day
  const getEventsForDay = (day) => {
    const dateString = `2023-10-${day.toString().padStart(2, "0")}`
    return events.filter((event) => event.date === dateString)
  }

  // Get icon for event type
  const getEventIcon = (type) => {
    switch (type) {
      case "quiz":
        return <LucideClipboard className="h-4 w-4 text-amber-600" />
      case "assignment":
        return <LucideFileText className="h-4 w-4 text-red-600" />
      case "discussion":
        return <LucideUsers className="h-4 w-4 text-blue-600" />
      case "lecture":
        return <LucideVideo className="h-4 w-4 text-emerald-600" />
      case "meeting":
        return <LucideUsers className="h-4 w-4 text-violet-600" />
      default:
        return <LucideCalendar className="h-4 w-4 text-gray-600" />
    }
  }

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
                <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                <p className="text-gray-600">Manage your schedule and deadlines</p>
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
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{currentMonth}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <LucideChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline">Today</Button>
                <Button variant="outline" size="icon">
                  <LucideChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-3 text-center font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-24 p-2 border-b border-r ${
                        day === currentDay ? "bg-blue-50" : day === null ? "bg-gray-50" : ""
                      } ${day === null ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {day !== null && (
                        <>
                          <div
                            className={`text-sm font-medium mb-1 ${
                              day === currentDay ? "text-blue-600" : "text-gray-700"
                            }`}
                          >
                            {day}
                          </div>
                          <div className="space-y-1">
                            {getEventsForDay(day).map((event) => (
                              <Link
                                key={event.id}
                                href={
                                  event.type === "quiz" || event.type === "assignment"
                                    ? `/courses/${event.courseId}`
                                    : "#"
                                }
                                className="block text-xs p-1 rounded bg-white border hover:shadow-sm transition-all"
                              >
                                <div className="flex items-center gap-1">
                                  {getEventIcon(event.type)}
                                  <span className="truncate">{event.title}</span>
                                </div>
                                <div className="text-gray-500 mt-0.5">{event.time}</div>
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="bg-gray-100 rounded-full p-2 mt-1">{getEventIcon(event.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-gray-500 text-sm">
                          {event.date.split("-")[2]} October, {event.time}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.course}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={
                            event.type === "quiz" || event.type === "assignment" ? `/courses/${event.courseId}` : "#"
                          }
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
