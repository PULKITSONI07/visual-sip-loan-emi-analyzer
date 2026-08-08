import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatINR } from '../../utils/finance';

export default function EMITable({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span>Amortization Schedule</span>
        <span className="flex items-center gap-2 text-slate-500 text-xs">
          {data.length} years
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className="overflow-x-auto animate-slide-up">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Opening Balance</th>
                <th>Principal Paid</th>
                <th>Interest Paid</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.year}>
                  <td className="font-semibold">{row.year}</td>
                  <td className="text-slate-300">{formatINR(row.opening)}</td>
                  <td className="text-violet-400">{formatINR(row.principalPaid)}</td>
                  <td className="text-rose-400">{formatINR(row.interestPaid)}</td>
                  <td className="font-bold text-cyan-300">{formatINR(row.closing)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
