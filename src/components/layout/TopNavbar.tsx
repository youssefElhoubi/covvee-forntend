import { Code2, Play } from "lucide-react";


export function TopNavbar() {


  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-emerald-400 to-cyan-500 p-2 shadow-lg shadow-emerald-500/20">
          <Code2 className="h-5 w-5 text-slate-950" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-slate-100">Covvee</span>
      </div>

      <div className="mx-6 hidden min-w-0 flex-1 items-center gap-1 overflow-hidden md:flex">

      </div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full border border-white/20 bg-slate-800" />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-emerald-400 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
        >
          <Play className="h-3.5 w-3.5" />
          Run
        </button>
      </div>
    </header>
  );
}
