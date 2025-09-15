import { Link } from "react-router-dom"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Dashboard</h1>
        <p className="text-muted-foreground">Quick actions and recent activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Link to="/add-news" className="group border border-border rounded-lg p-5 bg-card hover:bg-transparent transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Create News</h3>
              <p className="text-sm text-muted-foreground">Add a new article</p>
            </div>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        <Link to="/all-news" className="group border border-border rounded-lg p-5 bg-card hover:bg-transparent transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">All News</h3>
              <p className="text-sm text-muted-foreground">View and manage articles</p>
            </div>
            <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        <div className="border border-border rounded-lg p-5 bg-card">
          <h3 className="font-semibold mb-1">Stats</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
      </div>
    </div>
  )
}


