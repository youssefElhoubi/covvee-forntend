import { Search } from "lucide-react";

interface UserManagementHeaderProps {
    searchTerm: string;
    onChangeSearch: (value: string) => void;
}

export default function UserManagementHeader({ searchTerm, onChangeSearch }: UserManagementHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-lg font-semibold text-slate-100">User Management</h2>
                <p className="text-sm text-slate-400">Manage platform users, moderation status, and projects.</p>
            </div>

            <label className="relative block w-full md:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onChangeSearch(event.target.value)}
                    placeholder="Search by username, email, or ID"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition placeholder:text-slate-500 focus:border-emerald-400"
                />
            </label>
        </div>
    );
}
