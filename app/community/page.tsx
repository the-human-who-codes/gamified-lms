import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LucideBook,
  LucideBell,
  LucideSearch,
  LucideUsers,
  LucideMessageSquare,
  LucideBookmark,
  LucideShare2,
  LucideThumbsUp,
  LucideFilter,
  LucidePlus,
  LucideCalendar,
  LucideMapPin,
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  // Mock data for community posts
  const posts = [
    {
      id: 1,
      author: {
        name: "Michael Thompson",
        avatar: "/placeholder.svg?height=40&width=40&text=MT",
        role: "Student",
      },
      content:
        "Just completed my first machine learning project in the Data Science course! The k-means clustering algorithm was challenging but really interesting. Has anyone else worked with clustering algorithms?",
      time: "2 hours ago",
      likes: 24,
      comments: 8,
      course: "Introduction to Data Science",
      courseId: "data-science-101",
      tags: ["Machine Learning", "Data Science", "Projects"],
    },
    {
      id: 2,
      author: {
        name: "Dr. Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=SC",
        role: "Instructor",
      },
      content:
        "Reminder to all Data Science students: Your final projects are due next Friday. I've posted some additional resources that might help with your visualizations. Feel free to message me if you have any questions!",
      time: "Yesterday",
      likes: 45,
      comments: 12,
      course: "Introduction to Data Science",
      courseId: "data-science-101",
      tags: ["Announcement", "Projects", "Resources"],
    },
    {
      id: 3,
      author: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=ER",
        role: "Student",
      },
      content:
        "I'm struggling with the responsive design section in the Advanced Web Development course. Does anyone have recommendations for good resources on CSS Grid and Flexbox?",
      time: "Yesterday",
      likes: 18,
      comments: 15,
      course: "Advanced Web Development",
      courseId: "web-dev-advanced",
      tags: ["Web Development", "CSS", "Help Needed"],
    },
  ]

  // Mock data for study groups
  const studyGroups = [
    {
      id: 1,
      name: "Data Science Study Group",
      description: "Weekly discussions on data science concepts and project collaboration",
      members: 28,
      course: "Introduction to Data Science",
      courseId: "data-science-101",
      nextMeeting: "Tomorrow, 3:00 PM",
    },
    {
      id: 2,
      name: "Web Dev Project Team",
      description: "Collaboration group for the final project in Advanced Web Development",
      members: 12,
      course: "Advanced Web Development",
      courseId: "web-dev-advanced",
      nextMeeting: "Friday, 5:00 PM",
    },
    {
      id: 3,
      name: "Psychology Discussion Group",
      description: "Discuss readings and prepare for exams together",
      members: 15,
      course: "Psychology 101",
      courseId: "psychology-101",
      nextMeeting: "Wednesday, 4:30 PM",
    },
  ]

  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: "Data Science Guest Lecture: AI Ethics",
      date: "October 20, 2023",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual",
      attendees: 156,
      course: "Introduction to Data Science",
      courseId: "data-science-101",
    },
    {
      id: 2,
      name: "Web Development Workshop: Advanced React Patterns",
      date: "October 25, 2023",
      time: "4:00 PM - 6:00 PM",
      location: "Virtual",
      attendees: 89,
      course: "Advanced Web Development",
      courseId: "web-dev-advanced",
    },
    {
      id: 3,
      name: "End of Term Student Showcase",
      date: "November 15, 2023",
      time: "1:00 PM - 5:00 PM",
      location: "Virtual",
      attendees: 210,
      course: "All Courses",
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
                <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                <p className="text-gray-600">Connect with fellow students and instructors</p>
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
            <Tabs defaultValue="feed" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="groups">Study Groups</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search community..." className="pl-10 w-60" />
                  </div>
                  <Button variant="outline">
                    <LucideFilter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <Input placeholder="Share something with the community..." />
                      <Button>Post</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{post.author.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {post.author.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/courses/${post.courseId}`} className="text-sm text-emerald-600">
                              {post.course}
                            </Link>
                            <span className="text-xs text-gray-500">• {post.time}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{post.content}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                          <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
                            <LucideThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
                            <LucideMessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <LucideBookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <LucideShare2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="groups" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Study Groups</h2>
                  <Button>
                    <LucidePlus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyGroups.map((group) => (
                    <Card key={group.id}>
                      <CardHeader>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <LucideUsers className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <LucideBook className="h-4 w-4 text-gray-500" />
                            <Link href={`/courses/${group.courseId}`} className="text-sm text-emerald-600">
                              {group.course}
                            </Link>
                          </div>
                          {group.nextMeeting && (
                            <div className="flex items-center gap-2">
                              <LucideCalendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Next meeting: {group.nextMeeting}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Join Group</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <Button>
                    <LucidePlus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title || event.name}</CardTitle>
                        <CardDescription>
                          {event.date} • {event.time}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <LucideMapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <LucideUsers className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.attendees} attending</span>
                          </div>
                          {event.course && (
                            <div className="flex items-center gap-2">
                              <LucideBook className="h-4 w-4 text-gray-500" />
                              {event.courseId ? (
                                <Link href={`/courses/${event.courseId}`} className="text-sm text-emerald-600">
                                  {event.course}
                                </Link>
                              ) : (
                                <span className="text-sm text-gray-600">{event.course}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register</Button>
                      </CardFooter>
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
