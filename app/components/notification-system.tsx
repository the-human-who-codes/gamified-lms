"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../contexts/auth-context"
import {
  LucideBell,
  LucideCheckCircle,
  LucideAward,
  LucideCalendar,
  LucideMessageSquare,
  LucideBookOpen,
} from "lucide-react"
import Link from "next/link"

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "achievement" | "course" | "assignment" | "message" | "system"
  read: boolean
  link?: string
  createdAt: string
}

export function NotificationSystem() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock notifications (in a real app, this would come from an API)
  useEffect(() => {
    if (!user) return

    // Simulate fetching notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        userId: user.id,
        title: "New Badge Earned",
        message: "Congratulations! You've earned the 'Fast Learner' badge.",
        type: "achievement",
        read: false,
        link: "/achievements",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        id: "2",
        userId: user.id,
        title: "Assignment Due Soon",
        message: "Your 'Data Analysis' assignment is due in 2 days.",
        type: "assignment",
        read: false,
        link: "/courses/data-science-101",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: "3",
        userId: user.id,
        title: "New Course Available",
        message: "A new course 'Advanced Machine Learning' is now available.",
        type: "course",
        read: true,
        link: "/courses",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: "4",
        userId: user.id,
        title: "New Message",
        message: "You have a new message from Dr. Sarah Chen.",
        type: "message",
        read: true,
        link: "/messages",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [user])

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "achievement":
        return <LucideAward className="h-4 w-4 text-amber-500" />
      case "course":
        return <LucideBookOpen className="h-4 w-4 text-emerald-500" />
      case "assignment":
        return <LucideCalendar className="h-4 w-4 text-blue-500" />
      case "message":
        return <LucideMessageSquare className="h-4 w-4 text-violet-500" />
      case "system":
        return <LucideCheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <LucideBell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-3 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <Link href={notification.link || "#"} className="flex items-start gap-3 w-full">
                  <div className={`mt-0.5 ${!notification.read ? "text-blue-500" : "text-gray-400"}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium truncate ${!notification.read ? "text-blue-700" : ""}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center text-gray-500">
              <LucideBell className="h-8 w-8 mx-auto text-gray-300 mb-2" />
              <p>No notifications yet</p>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications" className="flex justify-center">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
