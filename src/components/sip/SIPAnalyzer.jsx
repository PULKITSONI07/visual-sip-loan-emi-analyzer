import SIPInputPanel from './SIPInputPanel';
import SIPSummaryCards from './SIPSummaryCards';
import SIPDonutChart from './SIPDonutChart';
import SIPAreaChart from './SIPAreaChart';
import SIPTable from './SIPTable';

export default function SIPAnalyzer({ params, update, result }) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Summary cards */}
      <SIPSummaryCards result={result} params={params} />

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Inputs + Donut */}
        <div className="space-y-6">
          {/* Input panel */}
          <div className="glass-card relative overflow-hidden p-5 border border-emerald-500/10">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl" />
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Investment Parameters
            </h2>
            <SIPInputPanel params={params} update={update} />
          </div>
          {/* Donut chart */}
          <div className="glass-card p-5 border border-white/[0.06]">
            <h3 className="mb-3 text-sm font-semibold text-slate-300">Portfolio Breakdown</h3>
            <SIPDonutChart result={result} />
          </div>
        </div>

        {/* Right: Area chart (spans 2 cols) */}
        <div className="lg:col-span-2 glass-card p-5 border border-white/[0.06]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">Wealth Growth Projection</h3>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
              Year-on-Year
            </span>
          </div>
          <SIPAreaChart data={result.yearlyData} />
        </div>
      </div>

      {/* Collapsible table */}
      <SIPTable data={result.yearlyData} />
    </div>
  );
}
