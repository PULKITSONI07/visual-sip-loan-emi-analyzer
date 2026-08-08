import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatINR } from '../../utils/finance';

export default function SIPTable({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span>Year-by-Year Breakdown</span>
        <span className="flex items-center gap-2 text-slate-500 text-xs">
          {data.length} rows
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className="overflow-x-auto animate-slide-up">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Invested (Cumulative)</th>
                <th>Returns</th>
                <th>Total Corpus</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const prevCorpus = i > 0 ? data[i - 1].corpus : 0;
                const growth = prevCorpus > 0
                  ? (((row.corpus - prevCorpus) / prevCorpus) * 100).toFixed(1)
                  : '—';
                return (
                  <tr key={row.year}>
                    <td className="font-semibold">{row.year}</td>
                    <td>{formatINR(row.invested)}</td>
                    <td className="text-emerald-400">{formatINR(row.returns)}</td>
                    <td className="font-bold text-emerald-300">{formatINR(row.corpus)}</td>
                    <td className="text-cyan-400">{growth !== '—' ? `${growth}%` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
