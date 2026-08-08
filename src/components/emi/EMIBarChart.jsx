import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar,
} from 'recharts';
import { formatINRShort, formatINR } from '../../utils/finance';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0c1e]/95 px-4 py-3 shadow-2xl space-y-1.5 min-w-[200px]">
      <p className="text-xs font-semibold text-slate-400 border-b border-white/10 pb-1.5 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="text-xs font-bold" style={{ color: p.color }}>
            {formatINR(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function EMIBarChart({ data }) {
  // Transform for stacked bar chart
  const barData = data.map((d) => ({
    year: d.year,
    'Principal Paid': d.principalPaid,
    'Interest Paid': d.interestPaid,
    'Balance': d.closing,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barSize={12}>
          <defs>
            <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#475569', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
            interval={Math.floor(data.length / 8)}
          />
          <YAxis
            tickFormatter={formatINRShort}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={62}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(val) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{val}</span>}
          />
          <Bar dataKey="Principal Paid" stackId="a" fill="url(#gradPrincipal)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Interest Paid" stackId="a" fill="url(#gradInterest)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Balance" fill="url(#gradBalance)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
