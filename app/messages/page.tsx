import { Button } from "@/components/ui/button"
import { MainNav } from "@/app/components/main-nav"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "@/app/components/user-nav"
import {
  LucideBook,
  LucideSearch,
  LucideSend,
  LucidePaperclip,
  LucidePhone,
  LucideVideo,
  LucideInfo,
} from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      lastMessage: "Let me know if you have any questions about the assignment.",
      time: "10:30 AM",
      unread: 2,
      online: true,
      role: "Instructor",
    },
    {
      id: 2,
      name: "Study Group - Data Science",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      lastMessage: "James: I'll share my notes from today's lecture.",
      time: "Yesterday",
      unread: 0,
      online: false,
      role: "Group",
      members: 5,
    },
    {
      id: 3,
      name: "Prof. James Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
      lastMessage: "The deadline has been extended to Friday.",
      time: "Yesterday",
      unread: 0,
      online: false,
      role: "Instructor",
    },
    {
      id: 4,
      name: "Michael Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=MT",
      lastMessage: "Thanks for helping with that problem!",
      time: "Monday",
      unread: 0,
      online: true,
      role: "Student",
    },
    {
      id: 5,
      name: "Web Dev Project Team",
      avatar: "/placeholder.svg?height=40&width=40&text=WD",
      lastMessage: "Emma: I've pushed the latest changes to the repository.",
      time: "Monday",
      unread: 0,
      online: false,
      role: "Group",
      members: 4,
    },
  ]

  // Mock data for active conversation
  const activeConversation = {
    id: 1,
    name: "Dr. Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    online: true,
    role: "Instructor",
    course: "Introduction to Data Science",
    messages: [
      {
        id: 1,
        sender: "Dr. Sarah Chen",
        content: "Hi Alex, how are you progressing with the data visualization assignment?",
        time: "10:15 AM",
        isMe: false,
      },
      {
        id: 2,
        sender: "Me",
        content: "Hello Dr. Chen! I've completed most of it, but I'm having some trouble with the scatter plot matrix.",
        time: "10:20 AM",
        isMe: true,
      },
      {
        id: 3,
        sender: "Dr. Sarah Chen",
        content:
          "What specific issues are you encountering with the scatter plot matrix? Is it related to the implementation or interpreting the results?",
        time: "10:25 AM",
        isMe: false,
      },
      {
        id: 4,
        sender: "Me",
        content:
          "It's mainly the implementation. I'm using Matplotlib, but the labels are overlapping and making it hard to read.",
        time: "10:28 AM",
        isMe: true,
      },
      {
        id: 5,
        sender: "Dr. Sarah Chen",
        content:
          "I see. You can try adjusting the figure size and using plt.tight_layout(). Also, consider using Seaborn's pairplot function which handles this automatically. Let me know if you have any questions about the assignment.",
        time: "10:30 AM",
        isMe: false,
      },
    ],
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
        <main className="flex-1 flex">
          {/* Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200 h-screen">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-129px)]">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/messages?id=${conversation.id}`}
                  className={`block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    conversation.id === activeConversation.id ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <Badge className="ml-2 bg-emerald-500">{conversation.unread}</Badge>
                        )}
                      </div>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.role}
                        </Badge>
                        {conversation.members && (
                          <Badge variant="outline" className="text-xs ml-1">
                            {conversation.members} members
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Conversation */}
          <div className="flex-1 flex flex-col h-screen">
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                  <AvatarFallback>
                    {activeConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    {activeConversation.online && (
                      <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50">
                        Online
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {activeConversation.role}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {activeConversation.course}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <LucidePhone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LucideVideo className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LucideInfo className="h-5 w-5" />
                </Button>
                <UserNav />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {activeConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? "bg-emerald-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className={message.isMe ? "text-white" : "text-gray-800"}>{message.content}</p>
                      <p className={`text-xs mt-1 text-right ${message.isMe ? "text-emerald-100" : "text-gray-500"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <LucidePaperclip className="h-5 w-5" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button>
                  <LucideSend className="h-5 w-5 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
