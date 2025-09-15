import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove("token")
    navigate("/")
  }
  // const handleBack = () => {
  //   if (window.history.length > 1) {
  //     navigate(-1)
  //   } else {
  //     navigate("/dashboard")
  //   }
  // }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-border bg-card">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/dashboard" className="text-lg font-bold">UIMEA Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-transparent"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add-news"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-transparent"}`
            }
          >
            Add News
          </NavLink>
          <NavLink
            to="/all-news"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-transparent"}`
            }
          >
            All News
          </NavLink>
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full cursor-pointer bg-secondary text-secondary-foreground py-2.5 rounded-md hover:bg-muted transition-colors">
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            {/* <button
              onClick={handleBack}
              aria-label="Go back"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors"
            > */}
              {/* <span className="sr-only">Back</span> */}
              {/* simple chevron */}
              {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg> */}
            {/* </button> */}
            <Link to="/dashboard" className="text-base font-semibold">UIMEA Admin</Link>
          </div>
          <div className="flex items-center gap-3">
            {/* <Link to="/add-news" className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              New News
            </Link> */}
            <button onClick={handleLogout} className="hidden md:inline-flex px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              Logout
            </button>
            <button onClick={handleLogout} className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors" aria-label="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


