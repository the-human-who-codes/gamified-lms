import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LucideChevronRight } from "lucide-react"

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  progress: number
  image?: string
  dueTask?: string
  dueDate?: string
  color?: string
}

export function CourseCard({
  id,
  title,
  instructor,
  progress,
  image = "/placeholder.svg?height=100&width=200",
  dueTask,
  dueDate,
  color = "emerald",
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="aspect-video relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div
          className={`absolute top-2 right-2 bg-${color}-100 px-2 py-1 rounded-full text-xs font-medium text-${color}-700`}
        >
          {progress}% complete
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">{instructor}</p>

        <div className="mb-3">
          <Progress value={progress} className={`h-2 bg-${color}-100`} />
        </div>

        {dueTask && dueDate && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Next: {dueTask}</span>
            <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
              Due: {dueDate}
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="ghost" className={`w-full justify-between text-${color}-600`}>
          <Link href={`/courses/${id}`}>
            Continue Learning
            <LucideChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
