import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LanguageAnalyticsCard from "../LanguageAnalyticsCard";
import LoadingCardSkeleton from "./LoadingCardSkeleton";
import SystemHealthCard from "./SystemHealthCard";
import { getLanguageStats, getSystemHealth } from "../../../services/adminService";

export default function AdminDashboardView() {
  const {
    data: health,
    isPending: healthLoading,
    isError: healthError,
    error: healthQueryError,
  } = useQuery({
    queryKey: ["admin", "system-health"],
    queryFn: getSystemHealth,
  });

  const {
    data: languageStats,
    isPending: statsLoading,
    isError: statsError,
    error: statsQueryError,
  } = useQuery({
    queryKey: ["admin", "language-stats"],
    queryFn: getLanguageStats,
  });

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitor platform health, usage patterns, and operational signals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {healthLoading ? <LoadingCardSkeleton /> : null}

        {healthError ? (
          <article className="rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <div>
                <p className="font-medium">Failed to load system health.</p>
                <p className="mt-1 text-sm text-red-200/80">
                  {(healthQueryError as Error)?.message ?? "Unexpected error"}
                </p>
              </div>
            </div>
          </article>
        ) : null}

        {!healthLoading && !healthError && health ? <SystemHealthCard health={health} /> : null}

        {statsLoading ? <LoadingCardSkeleton /> : null}

        {statsError ? (
          <article className="rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <div>
                <p className="font-medium">Failed to load language analytics.</p>
                <p className="mt-1 text-sm text-red-200/80">
                  {(statsQueryError as Error)?.message ?? "Unexpected error"}
                </p>
              </div>
            </div>
          </article>
        ) : null}

        {!statsLoading && !statsError ? <LanguageAnalyticsCard stats={languageStats ?? []} /> : null}
      </div>
    </section>
  );
}
