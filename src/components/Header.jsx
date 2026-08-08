import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-emerald">
          <TrendingUp size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold leading-none text-white sm:text-lg">
            FinVision
          </h1>
          <p className="text-xs text-slate-500 leading-none mt-0.5">
            SIP &amp; Loan EMI Analyzer
          </p>
        </div>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            Live Calc
          </span>
        </div>
      </div>
    </header>
  );
}
