import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  color?: "emerald" | "amber" | "violet" | "blue"
}

export function StatsCard({ title, value, icon: Icon, description, color = "emerald" }: StatsCardProps) {
  const colorClasses = {
    emerald: {
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      iconBg: "text-emerald-100",
      text: "text-emerald-100",
    },
    amber: {
      bg: "bg-white",
      iconBg: "text-amber-400",
      text: "text-amber-500",
    },
    violet: {
      bg: "bg-white",
      iconBg: "text-violet-400",
      text: "text-violet-500",
    },
    blue: {
      bg: "bg-white",
      iconBg: "text-blue-400",
      text: "text-blue-500",
    },
  }

  const classes = colorClasses[color]

  return (
    <Card className={color === "emerald" ? "text-white " + classes.bg : ""}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className={color === "emerald" ? "text-emerald-100" : "text-gray-500"}>{title}</p>
          <h3 className={`text-3xl font-bold ${classes.text}`}>{value}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <Icon className={`h-10 w-10 ${classes.iconBg}`} />
      </CardContent>
    </Card>
  )
}
