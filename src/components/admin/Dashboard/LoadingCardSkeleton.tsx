export default function LoadingCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="h-4 w-32 rounded bg-slate-700" />
      <div className="mt-4 h-7 w-24 rounded bg-slate-800" />
      <div className="mt-5 h-2 w-full rounded bg-slate-800" />
      <div className="mt-3 h-3 w-3/4 rounded bg-slate-800" />
    </div>
  );
}
