import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/app/components/main-nav"
import { UserNav } from "@/app/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LucideBook,
  LucideBell,
  LucideAward,
  LucideZap,
  LucideTrophy,
  LucideUsers,
  LucideBookOpen,
  LucideCheckCircle,
  LucideVideo,
  FlameIcon as LucideFire,
  LucideBrain,
  LucideStar,
  LucideBarChart,
} from "lucide-react"

export default function AchievementsPage() {
  // Mock data for achievements
  const userStats = {
    totalXP: 2450,
    level: 8,
    nextLevelXP: 3000,
    badgesEarned: 16,
    currentStreak: 12,
    longestStreak: 21,
    coursesCompleted: 2,
    quizzesTaken: 24,
    assignmentsSubmitted: 18,
  }

  const recentAchievements = [
    {
      id: 1,
      title: "Perfect Score",
      description: "Scored 100% on a quiz",
      earnedDate: "October 12, 2023",
      xp: 150,
      icon: <LucideCheckCircle className="h-8 w-8 text-emerald-500" />,
    },
    {
      id: 2,
      title: "Early Bird",
      description: "Submitted assignment 3 days early",
      earnedDate: "October 10, 2023",
      xp: 100,
      icon: <LucideZap className="h-8 w-8 text-amber-500" />,
    },
    {
      id: 3,
      title: "Helpful Peer",
      description: "Answered 5 questions in forums",
      earnedDate: "October 8, 2023",
      xp: 75,
      icon: <LucideUsers className="h-8 w-8 text-blue-500" />,
    },
  ]

  const badgeCategories = [
    {
      category: "Academic Excellence",
      badges: [
        {
          id: 1,
          title: "Scholar",
          description: "Complete 5 courses",
          progress: 40, // percentage
          icon: <LucideBookOpen className="h-8 w-8 text-emerald-500" />,
          earned: false,
        },
        {
          id: 2,
          title: "Quiz Master",
          description: "Score 100% on 10 quizzes",
          progress: 60,
          icon: <LucideCheckCircle className="h-8 w-8 text-emerald-500" />,
          earned: false,
        },
        {
          id: 3,
          title: "Perfect Attendance",
          description: "Attend 20 live sessions",
          progress: 25,
          icon: <LucideVideo className="h-8 w-8 text-emerald-500" />,
          earned: false,
        },
      ],
    },
    {
      category: "Engagement",
      badges: [
        {
          id: 4,
          title: "Consistent Learner",
          description: "Maintain a 30-day streak",
          progress: 40,
          icon: <LucideFire className="h-8 w-8 text-amber-500" />,
          earned: false,
        },
        {
          id: 5,
          title: "Community Helper",
          description: "Answer 20 questions in forums",
          progress: 75,
          icon: <LucideUsers className="h-8 w-8 text-amber-500" />,
          earned: false,
        },
        {
          id: 6,
          title: "Feedback Champion",
          description: "Provide feedback on 15 assignments",
          progress: 20,
          icon: <LucideZap className="h-8 w-8 text-amber-500" />,
          earned: false,
        },
      ],
    },
    {
      category: "Special Achievements",
      badges: [
        {
          id: 7,
          title: "AI Explorer",
          description: "Use AI tools in 10 different ways",
          progress: 80,
          icon: <LucideBrain className="h-8 w-8 text-violet-500" />,
          earned: false,
        },
        {
          id: 8,
          title: "Data Science Specialist",
          description: "Complete the Data Science learning path",
          progress: 68,
          icon: <LucideBarChart className="h-8 w-8 text-violet-500" />,
          earned: false,
        },
        {
          id: 9,
          title: "Top Performer",
          description: "Rank in the top 10% of a course",
          progress: 100,
          icon: <LucideStar className="h-8 w-8 text-violet-500" />,
          earned: true,
        },
      ],
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
                <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
                <p className="text-gray-600">Track your progress and accomplishments</p>
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
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-emerald-100">Current Level</h3>
                    <div className="bg-emerald-400 bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center">
                      <LucideTrophy className="h-6 w-6 text-emerald-100" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">Level {userStats.level}</div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-100">{userStats.totalXP} XP</span>
                      <span className="text-emerald-100">{userStats.nextLevelXP} XP</span>
                    </div>
                    <Progress
                      value={(userStats.totalXP / userStats.nextLevelXP) * 100}
                      className="h-2 bg-emerald-400 bg-opacity-30"
                    />
                  </div>
                  <p className="text-sm text-emerald-100">
                    {userStats.nextLevelXP - userStats.totalXP} XP needed for next level
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Badges Earned</h3>
                    <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <LucideAward className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">{userStats.badgesEarned}</div>
                  <p className="text-sm text-gray-500">
                    You've earned {userStats.badgesEarned} out of 27 available badges
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Current Streak</h3>
                    <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <LucideFire className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{userStats.currentStreak} days</div>
                  <p className="text-sm text-gray-500">Longest streak: {userStats.longestStreak} days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Total XP</h3>
                    <div className="bg-violet-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <LucideZap className="h-6 w-6 text-violet-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-violet-600 mb-2">{userStats.totalXP}</div>
                  <p className="text-sm text-gray-500">
                    Earned from {userStats.quizzesTaken} quizzes and {userStats.assignmentsSubmitted} assignments
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-gray-100 rounded-full p-3">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-gray-500 text-sm">{achievement.description}</p>
                        <p className="text-gray-400 text-xs mt-1">Earned on {achievement.earnedDate}</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">+{achievement.xp} XP</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <div className="space-y-6">
              {badgeCategories.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                    <CardDescription>Collect badges in this category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.badges.map((badge) => (
                        <Card
                          key={badge.id}
                          className={`border ${
                            badge.earned ? "border-emerald-200 bg-emerald-50" : "hover:border-gray-300"
                          } transition-all`}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center">
                              <div
                                className={`rounded-full p-3 mb-3 ${badge.earned ? "bg-emerald-100" : "bg-gray-100"}`}
                              >
                                {badge.icon}
                              </div>
                              <h4 className="font-medium mb-1">{badge.title}</h4>
                              <p className="text-gray-500 text-sm mb-3">{badge.description}</p>
                              {badge.earned ? (
                                <Badge className="bg-emerald-100 text-emerald-700">Earned</Badge>
                              ) : (
                                <div className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Progress</span>
                                    <span className="text-gray-500">{badge.progress}%</span>
                                  </div>
                                  <Progress value={badge.progress} className="h-2" />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
