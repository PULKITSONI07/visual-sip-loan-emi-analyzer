import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { formatINR, formatPct } from '../../utils/finance';

const COLORS = ['#10b981', '#06b6d4'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0c1e]/95 px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-1">{item.name}</p>
      <p className="text-base font-bold" style={{ color: item.payload.fill }}>
        {formatINR(item.value)}
      </p>
    </div>
  );
};

const CustomLabel = ({ cx, cy, result }) => (
  <>
    <text x={cx} y={cy - 14} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight={500}>
      Returns Ratio
    </text>
    <text x={cx} y={cy + 8} textAnchor="middle" fill="#34d399" fontSize={22} fontWeight={800}>
      {formatPct(result.returnPct, 0)}
    </text>
    <text x={cx} y={cy + 26} textAnchor="middle" fill="#64748b" fontSize={10}>
      of invested
    </text>
  </>
);

export default function SIPDonutChart({ result }) {
  const data = [
    { name: 'Total Returns', value: Math.max(0, result.totalReturns) },
    { name: 'Amount Invested', value: result.totalInvested },
  ];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
            label={false}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i]}
                opacity={i === 0 ? 1 : 0.35}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(val) => (
              <span style={{ color: '#94a3b8', fontSize: 12 }}>{val}</span>
            )}
          />
          {/* Center label via customized label */}
          <Pie
            data={[{ value: 1 }]}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={0}
            dataKey="value"
            labelLine={false}
            label={<CustomLabel result={result} />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
