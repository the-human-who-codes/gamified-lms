import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideBook, LucideAward, LucideTrophy, LucideUsers, LucideBarChart, LucideGraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LucideGraduationCap className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-emerald-600">EduQuest</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Learning Reimagined with <span className="text-emerald-600">Gamification & AI</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Transform your educational experience with an LMS that combines the engagement of Duolingo and Kahoot with
              the power of AI assistance and comprehensive classroom management.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo-course">Watch Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="EduQuest platform preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">Why Choose EduQuest?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LucideTrophy className="h-8 w-8 text-amber-500" />}
              title="Gamified Learning"
              description="Points, badges, streaks, and leaderboards keep students motivated and engaged."
            />
            <FeatureCard
              icon={<LucideBarChart className="h-8 w-8 text-violet-500" />}
              title="AI-Powered Tools"
              description="Contextual AI assistance for both students and teachers when and where they need it."
            />
            <FeatureCard
              icon={<LucideUsers className="h-8 w-8 text-blue-500" />}
              title="Interactive Classroom"
              description="Present lessons, conduct polls, and engage students in real-time from within the platform."
            />
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">Comprehensive LMS Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Course Management", icon: <LucideBook className="h-6 w-6 text-emerald-600" /> },
              { title: "Assignment System", icon: <LucideBook className="h-6 w-6 text-emerald-600" /> },
              { title: "Grading & Feedback", icon: <LucideAward className="h-6 w-6 text-emerald-600" /> },
              { title: "Discussion Forums", icon: <LucideUsers className="h-6 w-6 text-emerald-600" /> },
              { title: "Calendar & Scheduling", icon: <LucideBook className="h-6 w-6 text-emerald-600" /> },
              { title: "Resource Library", icon: <LucideBook className="h-6 w-6 text-emerald-600" /> },
              { title: "Analytics Dashboard", icon: <LucideBarChart className="h-6 w-6 text-emerald-600" /> },
              { title: "Mobile Compatibility", icon: <LucideBook className="h-6 w-6 text-emerald-600" /> },
            ].map((feature, index) => (
              <Card key={index} className="border-emerald-100 hover:border-emerald-300 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 rounded-xl p-8 mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to transform your educational experience?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join institutions already using EduQuest to create engaging, effective learning environments.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/login">Request Demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo-course">Explore Features</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LucideGraduationCap className="h-6 w-6 text-emerald-400" />
                <h4 className="text-xl font-bold text-emerald-400">EduQuest</h4>
              </div>
              <p className="text-gray-400">Reimagining education through gamification and AI assistance.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Integrations</Link>
                </li>
                <li>
                  <Link href="#">Updates</Link>
                </li>
                <li>
                  <Link href="#">Case Studies</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#">Documentation</Link>
                </li>
                <li>
                  <Link href="#">Tutorials</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Community</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">Legal</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 EduQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-emerald-100 hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
