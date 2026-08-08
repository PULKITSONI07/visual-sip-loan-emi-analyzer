import EMIInputPanel from './EMIInputPanel';
import EMISummaryCards from './EMISummaryCards';
import EMIDonutChart from './EMIDonutChart';
import EMIBarChart from './EMIBarChart';
import EMITable from './EMITable';

export default function EMIAnalyzer({ params, update, result }) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Summary cards */}
      <EMISummaryCards result={result} params={params} />

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Inputs + Donut */}
        <div className="space-y-6">
          <div className="glass-card relative overflow-hidden p-5 border border-rose-500/10">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-500/8 blur-2xl" />
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Loan Parameters
            </h2>
            <EMIInputPanel params={params} update={update} />
          </div>

          <div className="glass-card p-5 border border-white/[0.06]">
            <h3 className="mb-3 text-sm font-semibold text-slate-300">Payment Breakdown</h3>
            <EMIDonutChart result={result} />
          </div>
        </div>

        {/* Right: Bar chart */}
        <div className="lg:col-span-2 glass-card p-5 border border-white/[0.06]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">Repayment Analysis</h3>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-400">
              Year-on-Year
            </span>
          </div>
          <EMIBarChart data={result.yearlyData} />
        </div>
      </div>

      {/* Amortization table */}
      <EMITable data={result.yearlyData} />
    </div>
  );
}
