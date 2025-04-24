"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "../contexts/auth-context"
import {
  LucideHome,
  LucideBookOpen,
  LucideCalendar,
  LucideAward,
  LucideBrain,
  LucideMessageSquare,
  LucideUsers,
  LucideSettings,
  LucideBarChart,
  LucideUser,
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Define navigation items based on user role
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LucideHome,
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "Courses",
      href: "/courses",
      icon: LucideBookOpen,
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: LucideCalendar,
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "Achievements",
      href: "/achievements",
      icon: LucideAward,
      roles: ["student"],
    },
    {
      title: "AI Tools",
      href: "/ai-tools",
      icon: LucideBrain,
      roles: ["student", "teacher"],
    },
    {
      title: "Messages",
      href: "/messages",
      icon: LucideMessageSquare,
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "Community",
      href: "/community",
      icon: LucideUsers,
      roles: ["student", "teacher"],
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: LucideBarChart,
      roles: ["teacher", "admin"],
    },
    {
      title: "Profile",
      href: "/profile",
      icon: LucideUser,
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "Admin",
      href: "/admin",
      icon: LucideSettings,
      roles: ["admin"],
    },
  ]

  // Filter nav items based on user role
  const filteredNavItems = user
    ? navItems.filter((item) => item.roles.includes(user.role))
    : navItems.filter((item) => item.href === "/dashboard" || item.href === "/courses")

  return (
    <nav className="flex flex-col space-y-1">
      {filteredNavItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className={cn(
            "justify-start",
            pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5 mr-3" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
