import type { LanguageStat } from "../../types/admin.types";

interface LanguageAnalyticsCardProps {
    stats: LanguageStat[];
}

export default function LanguageAnalyticsCard({ stats }: LanguageAnalyticsCardProps) {
    const maxCount = stats.reduce((max, item) => Math.max(max, item.count), 0);

    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">Language Analytics</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-100">Most Used Languages</h3>

            <div className="mt-4 space-y-3">
                {stats.length === 0 ? (
                    <p className="text-sm text-slate-400">No analytics data available.</p>
                ) : (
                    stats.map((item) => {
                        const width = maxCount === 0 ? 0 : (item.count / maxCount) * 100;

                        return (
                            <div key={item.language}>
                                <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                                    <span>{item.language}</span>
                                    <span>{item.count}</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                    <div
                                        className="h-full rounded-full bg-cyan-500 transition-all duration-300"
                                        style={{ width: `${width}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </article>
    );
}
