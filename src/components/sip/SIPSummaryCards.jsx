import SummaryCard from '../SummaryCard';
import { formatINR, formatPct } from '../../utils/finance';
import { TrendingUp, PiggyBank, Sparkles, Calendar } from 'lucide-react';

export default function SIPSummaryCards({ result, params }) {
  const { totalValue, totalInvested, totalReturns, returnPct } = result;
  // Rough XIRR approximation via simple CAGR
  const cagr = params.years > 0
    ? (Math.pow(totalValue / Math.max(totalInvested, 1), 1 / params.years) - 1) * 100
    : 0;

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <SummaryCard
        label="Total Wealth"
        value={formatINR(totalValue)}
        sub={`After ${params.years} years`}
        accent="emerald"
        Icon={TrendingUp}
        large
      />
      <SummaryCard
        label="Invested Amount"
        value={formatINR(totalInvested)}
        sub={`₹${params.monthlyAmount.toLocaleString('en-IN')}/mo`}
        accent="cyan"
        Icon={PiggyBank}
      />
      <SummaryCard
        label="Est. Returns"
        value={formatINR(totalReturns)}
        sub={`${formatPct(returnPct)} gain`}
        accent="violet"
        Icon={Sparkles}
      />
      <SummaryCard
        label="CAGR"
        value={formatPct(cagr)}
        sub="Compounded annual"
        accent="amber"
        Icon={Calendar}
      />
    </div>
  );
}
