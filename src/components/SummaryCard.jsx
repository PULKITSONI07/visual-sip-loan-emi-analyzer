/**
 * Reusable metric card
 * Props: label, value, sub, accent ('emerald'|'rose'|'cyan'|'amber'|'violet'), Icon
 */
import { ArrowUpRight } from 'lucide-react';

const ACCENT = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-emerald/30' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/20',    glow: 'shadow-rose/30'    },
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-400',    border: 'border-cyan-500/20',    glow: ''                  },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20',   glow: ''                  },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-400',  border: 'border-violet-500/20',  glow: ''                  },
};

export default function SummaryCard({ label, value, sub, accent = 'emerald', Icon, large = false }) {
  const a = ACCENT[accent] || ACCENT.emerald;
  return (
    <div className={`glass-card relative overflow-hidden p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${a.border} border`}>
      {/* Corner glow */}
      <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${a.bg} blur-xl`} />

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
          <p className={`font-black leading-none ${a.text} ${large ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} truncate animate-count-up`}>
            {value}
          </p>
          {sub && <p className="mt-1.5 text-xs text-slate-500">{sub}</p>}
        </div>
        {Icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.bg}`}>
            <Icon size={18} className={a.text} />
          </div>
        )}
      </div>
    </div>
  );
}
