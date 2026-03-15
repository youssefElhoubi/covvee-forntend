import { LayoutDashboard, Settings, ShieldCheck, Users, X } from 'lucide-react';
import React, { type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
interface NavItem {
    label: string;
    to: string;
    icon: ReactNode;
}
interface props {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}


const navItems: NavItem[] = [
    {
        label: "Dashboard",
        to: "/admin",
        icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" />,
    },
    {
        label: "Users",
        to: "/admin/users",
        icon: <Users className="h-4 w-4" aria-hidden="true" />,
    },
    {
        label: "Audit Logs",
        to: "/admin/audit-logs",
        icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
    },
    {
        label: "Settings",
        to: "/admin/settings",
        icon: <Settings className="h-4 w-4" aria-hidden="true" />,
    },
];

const NavBar: React.FC<props> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-900/95 backdrop-blur-md transition-transform duration-300 md:sticky md:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
                <Link to="/admin" className="flex items-center gap-2 font-semibold tracking-wide text-emerald-300">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-400/20 text-emerald-200">C</span>
                    Covvee Admin
                </Link>
                <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 md:hidden"
                    aria-label="Close navigation menu"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <nav className="space-y-1 p-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                                isActive
                                    ? "bg-emerald-400/15 text-emerald-200"
                                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                            )
                        }
                        end={item.to === "/admin"}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default NavBar