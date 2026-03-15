import { Fragment } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { AdminUserDto } from "./types";

interface UsersTableProps {
    users: AdminUserDto[];
    expandedUserId: string | null;
    onToggleExpand: (userId: string) => void;
    onToggleBan: (userId: string) => void;
    onDeleteProject: (userId: string, projectId: string) => void;
}

function formatDate(isoOrDateString: string): string {
    const parsedDate = new Date(isoOrDateString);
    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }
    return parsedDate.toLocaleDateString();
}

export default function UsersTable({
    users,
    expandedUserId,
    onToggleExpand,
    onToggleBan,
    onDeleteProject,
}: UsersTableProps) {
    return (
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-800">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800 text-sm">
                    <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Joined Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                                    No users found for this search query.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => {
                                const isExpanded = expandedUserId === user.id;

                                return (
                                    <Fragment key={user.id}>
                                        <tr className="text-slate-200">
                                            <td className="px-4 py-3 font-mono text-xs text-slate-300">{user.id}</td>
                                            <td className="px-4 py-3 font-medium text-slate-100">{user.username}</td>
                                            <td className="px-4 py-3 text-slate-300">{user.email}</td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{user.role}</span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-300">{formatDate(user.joinedDate)}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={cn(
                                                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                                        user.isBanned ? "bg-red-400/15 text-red-300" : "bg-emerald-400/15 text-emerald-300"
                                                    )}
                                                >
                                                    {user.isBanned ? "Banned" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => onToggleBan(user.id)}
                                                        className={cn(
                                                            "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition",
                                                            user.isBanned
                                                                ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                                                                : "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                                                        )}
                                                    >
                                                        {user.isBanned ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldOff className="h-3.5 w-3.5" />}
                                                        {user.isBanned ? "Unban" : "Ban"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => onToggleExpand(user.id)}
                                                        className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-slate-800"
                                                    >
                                                        Projects ({user.projectCount})
                                                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {isExpanded ? (
                                            <tr>
                                                <td colSpan={7} className="bg-slate-950/40 px-4 py-3">
                                                    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                                                        <h3 className="mb-2 text-sm font-medium text-slate-200">User Projects</h3>
                                                        {user.projects.length === 0 ? (
                                                            <p className="text-sm text-slate-500">This user has no projects.</p>
                                                        ) : (
                                                            <ul className="space-y-2">
                                                                {user.projects.map((project) => (
                                                                    <li
                                                                        key={project.id}
                                                                        className="flex flex-col gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 md:flex-row md:items-center md:justify-between"
                                                                    >
                                                                        <div>
                                                                            <p className="text-sm text-slate-100">{project.name}</p>
                                                                            <p className="text-xs text-slate-400">
                                                                                {project.id} • {project.language}
                                                                            </p>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => onDeleteProject(user.id, project.id)}
                                                                            className="inline-flex items-center gap-1 self-start rounded-md bg-red-500/15 px-2.5 py-1.5 text-xs text-red-300 transition hover:bg-red-500/25"
                                                                        >
                                                                            <Trash2 className="h-3.5 w-3.5" />
                                                                            Delete Project
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : null}
                                    </Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
