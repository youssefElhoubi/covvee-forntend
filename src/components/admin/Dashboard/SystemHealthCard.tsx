import type { SystemHealth } from "../../../types/admin.types";

interface SystemHealthCardProps {
  health: SystemHealth;
}

function bytesToGb(bytes: number): number {
  return bytes / 1024 / 1024 / 1024;
}

function getProgressColor(usedSpacePercentage: number): string {
  if (usedSpacePercentage >= 95) {
    return "bg-red-500";
  }

  if (usedSpacePercentage >= 80) {
    return "bg-yellow-500";
  }

  return "bg-emerald-500";
}

export default function SystemHealthCard({ health }: SystemHealthCardProps) {
  const usedPercent = Math.max(0, Math.min(100, health.usedSpacePercentage));
  const totalGb = bytesToGb(health.totalDiskSpaceBytes);
  const freeGb = bytesToGb(health.freeDiskSpaceBytes);
  const usedGb = Math.max(totalGb - freeGb, 0);

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
      <p className="text-xs uppercase tracking-wide text-slate-400">System Health</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <h3 className="text-2xl font-semibold text-slate-100">{usedPercent.toFixed(1)}%</h3>
        <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">
          {health.status}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getProgressColor(usedPercent)}`}
          style={{ width: `${usedPercent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {usedGb.toFixed(1)} GB used / {totalGb.toFixed(1)} GB total ({freeGb.toFixed(1)} GB free)
      </p>
    </article>
  );
}
