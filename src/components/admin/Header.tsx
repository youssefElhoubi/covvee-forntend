import { Bell, Menu, Search, UserCircle2 } from 'lucide-react';
import React from 'react'
interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  isopen: boolean;
}


const Header: React.FC<HeaderProps> = ({ setSidebarOpen, isopen }) => {

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!isopen)}
              className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="flex min-w-0 items-center gap-1 overflow-x-auto text-sm text-slate-400">

            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-400 md:flex">
              <Search className="h-4 w-4" />
              <span className="text-slate-500">Quick search</span>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-200 transition hover:bg-slate-800"
              aria-label="Open profile menu"
            >
              <UserCircle2 className="h-5 w-5 text-emerald-300" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header