import Link from "next/link"
import { Home, BarChart, Calendar, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link href="/dashboard/mood" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <BarChart size={20} />
          <span>Mood Tracker</span>
        </Link>
        <Link href="/dashboard/activities" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Calendar size={20} />
          <span>Activities</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

