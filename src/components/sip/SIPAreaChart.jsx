import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { formatINRShort, formatINR } from '../../utils/finance';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0c1e]/95 px-4 py-3 shadow-2xl space-y-1.5 min-w-[180px]">
      <p className="text-xs font-semibold text-slate-400 border-b border-white/10 pb-1.5 mb-1">
        {label}
      </p>
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

export default function SIPAreaChart({ data }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCorpus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
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
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(val) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{val}</span>}
          />
          <Area
            type="monotone"
            dataKey="invested"
            name="Invested"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#gradInvested)"
            dot={false}
            activeDot={{ r: 5, fill: '#06b6d4', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="corpus"
            name="Total Corpus"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#gradCorpus)"
            dot={false}
            activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
