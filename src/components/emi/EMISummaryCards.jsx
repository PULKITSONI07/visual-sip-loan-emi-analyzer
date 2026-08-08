import SummaryCard from '../SummaryCard';
import { formatINR, formatPct } from '../../utils/finance';
import { CreditCard, Landmark, BadgePercent, Clock } from 'lucide-react';

export default function EMISummaryCards({ result, params }) {
  const { emi, principal, totalInterest, totalPayment, interestRatio } = result;
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <SummaryCard
        label="Monthly EMI"
        value={formatINR(emi)}
        sub={`For ${params.tenureYears} years`}
        accent="rose"
        Icon={CreditCard}
        large
      />
      <SummaryCard
        label="Principal Amount"
        value={formatINR(principal)}
        sub="Loan amount"
        accent="cyan"
        Icon={Landmark}
      />
      <SummaryCard
        label="Total Interest"
        value={formatINR(totalInterest)}
        sub={`${formatPct(interestRatio)} of total`}
        accent="amber"
        Icon={BadgePercent}
      />
      <SummaryCard
        label="Total Payment"
        value={formatINR(totalPayment)}
        sub="Principal + Interest"
        accent="violet"
        Icon={Clock}
      />
    </div>
  );
}
