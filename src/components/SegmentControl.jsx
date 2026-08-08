import { BarChart2, TrendingUp } from 'lucide-react';

const tabs = [
  { id: 'sip', label: 'SIP Analyzer', Icon: TrendingUp },
  { id: 'emi', label: 'Loan EMI', Icon: BarChart2 },
];

export default function SegmentControl({ active, onChange }) {
  return (
    <div className="relative flex items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.03] p-1.5 shadow-glass">
      {/* Animated sliding pill */}
      <div
        className={`segment-pill absolute top-1.5 bottom-1.5 rounded-xl ${
          active === 'sip'
            ? 'left-1.5 w-[calc(50%-4px)] bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 shadow-emerald'
            : 'left-[calc(50%+2px)] w-[calc(50%-6px)] bg-gradient-to-r from-rose-600/80 to-rose-500/80 shadow-rose'
        }`}
      />
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          role="tab"
          aria-selected={active === id}
          className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            active === id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{id === 'sip' ? 'SIP' : 'EMI'}</span>
        </button>
      ))}
    </div>
  );
}
